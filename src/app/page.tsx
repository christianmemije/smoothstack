import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">TODO Tracker</h1>
      <br />

      <TodoForm />
      <TodoList />
      <TodoStats />
    </>
  );
}
