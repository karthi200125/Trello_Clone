"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from 'zod';

export type State = {
    errors?: {
        title?: string[];
    };
    message?: string;
};

const createBoard = z.object({
    title: z.string().min(3, {
        message: 'Minimum length of 3 letters is required',
    }),
});

export async function create(prevState: State, formData: { get: (key: string) => string }) {
    const validatedFields = createBoard.safeParse({
        title: formData.get('title'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields",
        };
    }

    const { title } = validatedFields.data;

    try {
        await db.board.create({
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            errors: { title: ["Database Error"] },
            message: "Database Error",
        };
    }

    revalidatePath("/organization/org_2aGRXCO3ZsOOxSLhXQBW3ZB0xBo");
    redirect("/organization/org_2aGRXCO3ZsOOxSLhXQBW3ZB0xBo");

    return { message: "Board created successfully" };
}
