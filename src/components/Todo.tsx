import { ITodo } from '@/app/state';
import { ReadonlyTodo } from './ReadonlyTodo';
import { useState } from 'react';
import { EditTodoForm } from './EditTodoForm';

export const Todo = ({ todo }: { todo: ITodo }) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const handleOnEdit = () => {
    setIsInEditMode(true);
  };

  const handleOnClose = () => {
    setIsInEditMode(false);
  };

  return isInEditMode ? (
    <EditTodoForm todo={todo} onClose={() => handleOnClose()} />
  ) : (
    <ReadonlyTodo todo={todo} onEdit={() => handleOnEdit()} />
  );
};
