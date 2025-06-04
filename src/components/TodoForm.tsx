'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EPriority, stateManager } from '@/app/state';
import { SendIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  title: z.string().min(1, 'You are missing the most important part').trim(),
  priority: z.enum([EPriority.low, EPriority.medium, EPriority.high]),
});

export const TodoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      priority: EPriority.medium,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    stateManager.addTodo({
      title: values.title,
      priority: values.priority,
    });

    form.reset();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>New</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-2 items-start">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>TODO</FormLabel>
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
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
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
              <Button type="submit" className="mt-5">
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
