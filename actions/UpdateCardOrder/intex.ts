'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateCardOrder } from "./Schema";
import { InputType, ReturnType } from "./Types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { items, boardId } = data;

    let UpdatedCards;

    try {
        const transaction = items.map((card) =>
            db.card.update({
                where: {
                    id: card.id, list: {
                        board: {
                            orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        )

        UpdatedCards = await db.$transaction(transaction)
    } catch (error) {
        return { error: "Failed to reorder" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: UpdatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);