import { ActionState } from '@/lib/createsafeaction';
import { z } from 'zod';
import { StripeRedirect } from './Schema';


export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputType, string>