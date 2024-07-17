import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { List } from '@prisma/client';
import { UpadteList } from './Schema';

export type InputType = z.infer<typeof UpadteList>;
export type ReturnType = ActionState<InputType, List>