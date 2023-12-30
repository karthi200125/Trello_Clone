'use client'

import { db } from "@/lib/db"

const OragazationIdPage = () => {
  async function create(formData: FormData) {
    ' use server'
    const title = formData.get('title')
    await db.board.create({
      data: {
        title,
      }
    })
  }

  return (
    <div>
      <form action={create}>
        <input id="title" name="title" required placeholder="Enter Board Title" className="border-black border p-1" />
      </form>
    </div>
  )
}

export default OragazationIdPage