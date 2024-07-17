import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Card } from '@prisma/client';
import { UpdateCard } from './Schema';

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>