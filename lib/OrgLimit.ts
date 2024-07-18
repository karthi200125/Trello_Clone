import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MaxFreeBoards } from "@/constants/boards";

export const incrementAvailableCount = async () => {
    const { orgId } = auth();

    if (!orgId) {
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findFirst({
        where: { orgId }
    });

    if (orgLimit) {
        await db.orgLimit.update({
            where: { id: orgLimit.id },
            data: { count: orgLimit.count + 1 }
        });
    } else {
        await db.orgLimit.create({
            data: { orgId, count: 1 }
        });
    }
};

export const decrementAvailableCount = async () => {
    const { orgId } = auth();

    if (!orgId) {
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findFirst({
        where: { orgId }
    });

    if (orgLimit) {
        await db.orgLimit.update({
            where: { id: orgLimit.id },
            data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 }
        });
    } else {
        await db.orgLimit.create({
            data: { orgId, count: 0 }
        });
    }
};

export const hasAvailableCount = async () => {
    const { orgId } = auth();

    if (!orgId) {
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findFirst({
        where: { orgId }
    });

    return !orgLimit || orgLimit.count < MaxFreeBoards;
};

export const getAvailableCount = async () => {
    const { orgId } = auth();

    if (!orgId) {
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findFirst({
        where: { orgId }
    });

    return orgLimit ? orgLimit.count : 0;
};
