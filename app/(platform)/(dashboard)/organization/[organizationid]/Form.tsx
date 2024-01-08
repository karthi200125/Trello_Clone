'use client'

import { FromButton } from "./FromButton"
import { createBoard } from "@/actions/CreateBoard"
import { FormInput } from "@/components/form/formInput"
import { useAction } from "@/hooks/useActions"

const Form = () => {

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data, "Success")
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        execute({ title })
    }

    return (
        <div>
            <form action={onSubmit}>
                <div className="flex flex-col space-y-2">
                    <FormInput errors={fieldErrors} id="title" />
                </div>
                <FromButton />
            </form>
        </div>
    )
}

export default Form