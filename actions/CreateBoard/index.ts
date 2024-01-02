'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./Types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createsafeaction";
import { CreateBoard } from "./Schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();
    if (!userId) {
        return {
            error: "unauthorized"
        }
    }

    const { title } = data;
    let board;

    try {
        board = await db.board.create({
            data: {
                title,
            }
        })
    } catch (error) {
        return {
            error: "failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`)
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)


