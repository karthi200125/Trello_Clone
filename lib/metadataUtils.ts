import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function generateMetaData(boardId: string) {
    const { orgId } = auth();

    if (!orgId) return { title: "Board" };

    const board = await db.board.findUnique({
        where: {
            id: boardId,
            orgId
        }
    });

    return { title: board?.title || "Board" };
}
