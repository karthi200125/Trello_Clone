import { z } from "zod";

export const CreateList = z.object({
    title: z.string({
        required_error: "Tilte is Required",
        invalid_type_error: "Tilte is Required"
    }).min(3, {
        message: "Title is too short"
    }),
    boardId: z.string()
})