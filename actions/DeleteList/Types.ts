import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { List } from '@prisma/client';
import { DeleteList } from './Schema';


export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>