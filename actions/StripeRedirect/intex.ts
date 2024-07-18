'use server';

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteURl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { StripeRedirect } from "./Schema";
import { InputType, ReturnType } from "./Types";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    const user = await currentUser();

    if (!userId || !orgId || !user) {
        return { error: "Unauthorized" };
    }

    const settingURL = absoluteURl(`/organization/${orgId}`);
    let url = "";

    try {
        const orgSubscription = await db.orgSubscription.findUnique({
            where: { orgId }
        });

        if (orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingURL,
            });
            url = stripeSession.url;
        } else {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingURL,
                cancel_url: settingURL,
                payment_method_types: ['card'],
                mode: 'subscription',
                billing_address_collection: 'auto',
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: "BirdBoard Pro",
                                description: "Unlimited Boards for your organization"
                            },
                            unit_amount: 2000,
                            recurring: {
                                interval: 'month'
                            }
                        },
                        quantity: 1
                    }
                ],
                metadata: { orgId }
            });
            url = stripeSession.url || "";
        }
        
    } catch (error) {
        console.error("Error processing webhook:", error);        
        return { error: "Something went wrong" };
    }

    revalidatePath(`/organization/${orgId}`);
    return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
