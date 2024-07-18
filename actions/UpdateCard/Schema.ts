import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string(),
    description: z.optional(
        z.string({
            required_error: "Description id required",
            invalid_type_error: "descript is required",
        }).min(3, { message: "description is too short" })),
    title: z.optional(z.string({
        required_error: "Tilte is Required",
        invalid_type_error: "Tilte is Required"
    }).min(3, {
        message: "Title is too short"
    })),
    id: z.string()
})