'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateList } from "./Schema";
import { InputType, ReturnType } from "./Types";
import { createAuditLog } from "@/lib/CreateAuditLof";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { title, boardId } = data

    let list;

    try {

        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        })

        if (!board) {
            return {
                error: "Board not found"
            }
        }

        const lastList = await db.list.findFirst({
            where: {
                boardId: boardId
            },
            orderBy: {
                order: 'desc'
            },
            select: {
                order: true
            }
        })

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        })

        await createAuditLog({
            entityTitle: list?.title,
            entityId: list?.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE
        })

    } catch (error) {
        return { error: "Failed to Upadate" }
    }


    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const createList = createSafeAction(CreateList, handler);