
import { deleteBoard } from "@/actions/DeleteBoard"
import FromDeleteButton from "./FromDeleteButton"

interface BoardProps {
    title: string,
    id: string
}

const Board = ({ title, id }: BoardProps) => {
    const boardDeleteWithId = deleteBoard.bind(null, id)
    return (
        <form className="flex items-center gap-x-2 flex-row" action={boardDeleteWithId}>
            <p>Board Title : {title}</p>
            <FromDeleteButton />
        </form>
    )
}

export default Board