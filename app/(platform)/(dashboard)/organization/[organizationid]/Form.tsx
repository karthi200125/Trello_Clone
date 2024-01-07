'use client'

import { useAction } from "@/hooks/useActions"
import FromButton from "./FromButton"
import FormInput from "./FromInput"
import { createBoard } from "@/actions/CreateBoard"

const Form = () => {

    const { execute, fieldErrors } = useAction(createBoard)

    const onSubmit = (formData: FormData) => {
        const ttile = formData.get('title') as string
        execute({ ttile })
    }

    return (
        <div>
            <form action={onSubmit}>
                <div className="flex flex-col space-y-2">
                    <FormInput errors={fieldErrors} />
                </div>
                <FromButton />
            </form>
        </div>
    )
}

export default Form