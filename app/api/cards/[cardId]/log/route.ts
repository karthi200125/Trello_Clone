import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
    try {
        const { orgId, userId } = auth()

        if (!orgId || !userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        const auditlog = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        })
        return NextResponse.json(auditlog)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}