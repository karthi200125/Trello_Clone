'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./Schema";
import { InputType, ReturnType } from "./Types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { id, boardId } = data

    let list;

    try {
        list = await db.list.delete({
            where: {
                id, boardId,
                board: {
                    orgId
                }
            }
        })
    } catch (error) {
        return { error: "Failed to Delete" }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler);