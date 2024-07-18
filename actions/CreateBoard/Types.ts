import { z } from 'zod'
import { CreateBoard } from './Schema';
import { ActionState } from '@/lib/createsafeaction';
import { Board } from '@prisma/client';


export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>