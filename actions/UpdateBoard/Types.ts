import { z } from 'zod'
import { ActionState } from '@/lib/createsafeaction';
import { board } from '@prisma/client';
import { UpadteBoard } from './Schema';

export type InputType = z.infer<typeof UpadteBoard>;
export type ReturnType = ActionState<InputType, board>