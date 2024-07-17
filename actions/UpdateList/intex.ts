'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpadteList } from "./Schema";
import { InputType, ReturnType } from "./Types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { title, id, boardId } = data

    let list;

    try {
        list = await db.list.update({
            where: {
                id, boardId, board: {
                    orgId
                }
            }, data: {
                title
            }
        })
    } catch (error) {
        return { error: "Failed to Upadate" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const upadteList = createSafeAction(UpadteList, handler);