'use server';

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./Schema";
import { InputType, ReturnType } from "./Types";
import { createAuditLog } from "@/lib/CreateAuditLof";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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

        await createAuditLog({
            entityTitle: card?.title,
            entityId: card?.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE
        })
    } catch (error) {
        return { error: "Failed to Delete" };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
}

export const deleteCard = createSafeAction(DeleteCard, handler);
