'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteBoard } from "./Schema";
import { InputType, ReturnType } from "./Types";
import { createAuditLog } from "@/lib/CreateAuditLof";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/OrgLimit";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { id } = data

    let board;

    try {
        board = await db.board.delete({
            where: {
                id, orgId
            }
        })

        await decrementAvailableCount()

        await createAuditLog({
            entityTitle: board?.title,
            entityId: board?.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE
        })

    } catch (error) {
        return { error: "Failed to Delete" }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler);