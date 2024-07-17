import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Card } from '@prisma/client';
import { CreateCard } from './Schema';

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>