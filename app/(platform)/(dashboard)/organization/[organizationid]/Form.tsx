'use client'
import { useFormState } from "react-dom"
import FromButton from "./FromButton"
import FormInput from "./FromInput"
import { create } from "@/actions/CreateBoard"



const Form = () => {
    const initialState = { message: null, errors: {} }    
    const [state, dispatch] = useFormState(create, initialState)
    return (
        <div>
            <form action={dispatch}>
                <div className="flex flex-col space-y-2">
                    <FormInput errors={state?.errors} />
                </div>
                <FromButton />
            </form>
        </div>
    )
}

export default Form