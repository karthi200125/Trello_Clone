'use server'

import { createSafeAction } from "@/lib/createsafeaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateListOrder } from "./Schema";
import { InputType, ReturnType } from "./Types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "UnAutherized", }
    }

    const { items, boardId } = data;

    let lists;

    try {
        const transaction = items.map((list) =>
            db.list.update({
                where: {
                    id: list.id,
                    board: {
                        orgId,
                    },
                },
                data: {
                    order: list.order
                }
            })
        )

        lists = await db.$transaction(transaction)
    } catch (error) {
        return { error: "Failed to reorder" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler);