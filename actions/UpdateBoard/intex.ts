'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpadteBoard } from "./Schema";
import { InputType, ReturnType } from "./Types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { title, id } = data

    let board;

    try {
        board = await db.board.update({
            where: {
                id, orgId
            }, data: {
                title
            }
        })
    } catch (error) {
        return { error: "Failed to Upadate" }
    }

    revalidatePath(`/board/${id}`)
    return { data: board }
}

export const upadteBoard = createSafeAction(UpadteBoard, handler);