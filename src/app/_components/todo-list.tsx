import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function TodoList({ userId }: { userId: string }) {
  const todos = await prisma.todoItem.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center space-x-4 bg-white shadow rounded-lg px-4 py-2">
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="h-4 w-4 text-primary focus:ring-primary border rounded"
          />
          <div>
            <h3 className="text-sm   font-semibold">{todo.title}</h3>
            <p className="text-muted-foreground text-xs">{todo.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
