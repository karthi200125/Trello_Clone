import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { Board } from '@prisma/client';
import { DeleteBoard } from './Schema';


export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>