import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { List } from '@prisma/client';
import { UpdateListOrder } from './Schema';

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>