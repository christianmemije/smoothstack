'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ITodo, EPriority, stateManager } from '@/app/state';
import { SaveIcon, XIcon } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'You are missing the most important part').trim(),
  priority: z.enum([EPriority.low, EPriority.medium, EPriority.high]),
});

interface EditTodoFormProps {
  todo: ITodo;
  onClose: () => void;
}

export const EditTodoForm = ({ todo, onClose }: EditTodoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      priority: todo.priority as EPriority,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    stateManager.updateTodo(todo.id, {
      title: values.title,
      priority: values.priority,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="flex gap-2 items-start py-2 border-b">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-start flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter TODO..."
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      field.onChange(e.target.value.trim());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm">
            <SaveIcon className="w-4 h-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
            <XIcon className="w-4 h-4" />
          </Button>
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="shrink-0">
                <FormControl>
                  <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} variant="outline">
                    <ToggleGroupItem value={EPriority.high}>P1</ToggleGroupItem>
                    <ToggleGroupItem value={EPriority.medium}>P2</ToggleGroupItem>
                    <ToggleGroupItem value={EPriority.low}>P3</ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
