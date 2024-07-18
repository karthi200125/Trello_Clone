'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateCard } from "./Schema";
import { InputType, ReturnType } from "./Types";
import { createAuditLog } from "@/lib/CreateAuditLof";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { id, boardId, ...values } = data

    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            }, data: {
                ...values
            }
        })
        await createAuditLog({
            entityTitle: card?.title,
            entityId: card?.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE
        })
    } catch (error) {
        return { error: "Failed to Upadate" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler);