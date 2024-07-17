import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Card } from '@prisma/client';
import { UpdateCardOrder } from './Schema';

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>