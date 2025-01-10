import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function TodoList({ userId }: { userId: string }) {
  const todos = await prisma.todoItem.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center space-x-4 bg-white shadow rounded-lg p-4">
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
