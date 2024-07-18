import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Card } from '@prisma/client';
import { CopyCard } from './Schema';


export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>