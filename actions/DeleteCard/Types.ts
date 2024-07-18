import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Card } from '@prisma/client';
import { DeleteCard } from './Schema';


export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>