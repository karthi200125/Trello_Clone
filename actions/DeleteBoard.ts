'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
    await db.board.delete({
        where: { id }
    })
    revalidatePath("/organization/org_2aGRXCO3ZsOOxSLhXQBW3ZB0xBo")
}