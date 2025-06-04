import { ITodo, EPriority, stateManager } from '@/app/state';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EditIcon, TrashIcon } from 'lucide-react';

interface ReadonlyTodoProps {
  todo: ITodo;
  onEdit: () => void;
}

export const ReadonlyTodo = ({ todo, onEdit }: ReadonlyTodoProps) => {
  const handleEditClick = () => {
    onEdit();
  };

  const handleToggleComplete = () => {
    stateManager.toggleTodo(todo.id);
  };

  const handleDelete = () => {
    stateManager.deleteTodo(todo.id);
  };

  const handlePriorityChange = (value: string) => {
    if (value && Object.values(EPriority).includes(value as EPriority)) {
      stateManager.updateTodoPriority(todo.id, value as keyof typeof EPriority);
    }
  };

  return (
    <div className="flex gap-2 items-center py-2 border-b">
      <Checkbox checked={todo.completed} onCheckedChange={handleToggleComplete} className="shrink-0" />

      <div className="flex-1 min-w-0">
        <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleEditClick}>
        <EditIcon className="w-4 h-4" />
      </Button>

      <div className="shrink-0">
        <ToggleGroup type="single" value={todo.priority} variant="outline" onValueChange={handlePriorityChange}>
          <ToggleGroupItem value={EPriority.high}>P1</ToggleGroupItem>
          <ToggleGroupItem value={EPriority.medium}>P2</ToggleGroupItem>
          <ToggleGroupItem value={EPriority.low}>P3</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
