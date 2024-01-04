import { db } from "@/lib/db"
import Board from "./Board"
import Form from "./Form"

const OragazationIdPage = async () => {
  const board = await db.board.findMany()
  
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {board.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  )
}

export default OragazationIdPage