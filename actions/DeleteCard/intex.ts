'use server';

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./Schema";
import { InputType, ReturnType } from "./Types";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" };
    }

    const { id, boardId } = data;

    let card;

    try {

        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            }
        })
    } catch (error) {
        return { error: "Failed to Delete" };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
}

export const deleteCard = createSafeAction(DeleteCard, handler);
