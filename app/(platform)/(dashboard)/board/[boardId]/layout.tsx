import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/BoardNavbar";

const BoardIdLayout = async ({ children, params }: { children: React.ReactNode; params: { boardId: string } }) => {

    const { orgId } = auth()
    if (!orgId) return redirect('/selectorg')

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    if (!board) notFound();

    return (
        <div style={{ backgroundImage: `url(${board.imageFullUrl})` }} className="relative h-full bg-no-repeat bg-cover bg-center">
            <BoardNavbar data={board} />
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout