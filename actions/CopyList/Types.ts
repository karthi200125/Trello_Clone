import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { List } from '@prisma/client';
import { CopyList } from './Schema';


export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>