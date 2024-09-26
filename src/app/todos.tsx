import prisma from "@/helpers/db"
import { MarkAsDoneButton } from "./mark-as-done";


export async function Todos() {

    const todos = await prisma.todo.findMany();



    return (
        <div className='flex flex-col gap-2'>
            {
                todos.map(todo => (
                    <div key={todo.id} className='border flex p-5 justify-between rounded-md'>
                        <h2>{todo.title}</h2>
                        <p> {todo.done ? "Done" : "Pending"}</p>
                        <MarkAsDoneButton id={todo.id} />
                    </div>
                ))
            }
        </div>
    )
}

