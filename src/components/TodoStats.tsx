'use client';

import { useObservableState } from 'observable-hooks';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ITodo, stateManager } from '@/app/state';
import { Todo } from './Todo';

export const TodoStats = () => {
  const todos = useObservableState<ITodo[]>(stateManager.todos$, []);

  const totalCount = todos.length;
  const totalActiveCount = todos.filter((todo) => !todo.completed).length;
  const totalCompletedCount = todos.filter((todo) => todo.completed).length;
  const highestPriorityTodo = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => {
      const priorityValues = { low: 1, medium: 2, high: 3 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    })[0];

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="mr-2">
            Total: {totalCount}
          </Badge>
          <Badge variant="default" className="mr-2">
            TODO: {totalActiveCount}
          </Badge>
          <Badge variant="secondary">DONE: {totalCompletedCount}</Badge>

          <br />
          <br />
          <p className="text-sm leading-none font-medium">Highest Priority TODO:</p>
          {highestPriorityTodo ? <Todo todo={highestPriorityTodo} /> : <p>None</p>}
        </CardContent>
      </Card>
    </>
  );
};
