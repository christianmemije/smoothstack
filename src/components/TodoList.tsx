'use client';

import { ITodo, stateManager } from '@/app/state';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TodoFilters } from './TodoFilters';
import { useObservableState } from 'observable-hooks';
import { Todo } from './Todo';

export const TodoList = () => {
  const filteredTodos = useObservableState<ITodo[]>(stateManager.filteredTodos$, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>TODOs</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoFilters />
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </CardContent>
    </Card>
  );
};
