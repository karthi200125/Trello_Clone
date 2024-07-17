import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { List } from '@prisma/client';
import { CreateList } from './Schema';

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>