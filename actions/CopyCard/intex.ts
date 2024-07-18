'use server';

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./Schema";
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
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
            },
            include: {
                list: {
                    include: {
                        board: true
                    }
                }
            }
        });

        if (!cardToCopy || cardToCopy.list.board.orgId !== orgId) {
            return { error: 'Card Not Found' };
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId
            },
            orderBy: { order: 'desc' },
            select: { order: true }
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - copy`,
                description: `${cardToCopy.description} - copy`,
                order: newOrder,
                listId: cardToCopy.listId,
            },
        });

        await createAuditLog({
            entityTitle: card?.title,
            entityId: card?.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE
        })

    } catch (error) {
        return { error: "Failed to copy" };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
}

export const copyCard = createSafeAction(CopyCard, handler);
