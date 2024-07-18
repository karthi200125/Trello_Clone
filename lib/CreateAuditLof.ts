import { ENTITY_TYPE, ACTION } from '@prisma/client'
import { auth, currentUser } from '@clerk/nextjs'
import { db } from './db';

interface Props {
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    action: ACTION;
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = auth()
        const user = await currentUser()

        if (!user || !orgId) {
            throw new Error("user not found")
        }

        const { entityId, entityTitle, entityType, action } = props

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityTitle,
                entityType,
                action,
                userId: user?.id,
                userImage: user?.imageUrl,
                userName: user?.firstName + " " + user?.lastName,                
            }
        })

    } catch (error) {

    }
}