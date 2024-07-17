'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./Schema";
import { InputType, ReturnType } from "./Types";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { title, boardId, listId } = data

    let card;

    try {

        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId
                }
            }
        })

        if (!list) {
            return { error: "List Not found" }
        }

        const lastCard = await db.card.findFirst({
            where: { listId },
            orderBy: { order: 'desc' },
            select: { order: true }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title, listId, order: newOrder
            }
        })

    } catch (error) {
        return { error: "Failed to Upadate" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler);