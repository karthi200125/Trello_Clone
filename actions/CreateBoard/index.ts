'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./Types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createsafeaction";
import { CreateBoard } from "./Schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "unauthorized"
        }
    }

    const { title, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|")

    console.log({ imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName })

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields . Failed to create"
        }
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML
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


