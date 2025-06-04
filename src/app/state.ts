import { BehaviorSubject } from 'rxjs';
import { combineLatest, map } from 'rxjs';

export enum EFilter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export enum EPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum EPriorityFilter {
  all = 'all',
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum ESortBy {
  createdAt = 'createdAt',
  priority = 'priority',
}

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  priority: keyof typeof EPriority;
  createdAt: string;
}
export const initialTodos: ITodo[] = [
  {
    id: 1,
    title: 'Learn React Hooks',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Complete practice project',
    completed: true,
    priority: 'medium',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

class StateManager {
  private todos = new BehaviorSubject<ITodo[]>([]);
  private filter = new BehaviorSubject<EFilter>(EFilter.all);
  private priorityFilter = new BehaviorSubject<EPriorityFilter>(EPriorityFilter.all);
  private sortBy = new BehaviorSubject<ESortBy>(ESortBy.createdAt);
  public todos$ = this.todos.asObservable();
  public filter$ = this.filter.asObservable();
  public priorityFilter$ = this.priorityFilter.asObservable();
  public sortBy$ = this.sortBy.asObservable();
  public filteredTodos$ = combineLatest([this.todos$, this.filter$, this.priorityFilter$, this.sortBy$]).pipe(
    map(([todos, filter, priorityFilter, sortBy]) => {
      return todos
        .filter((todo) => {
          if (filter === EFilter.active) {
            return !todo.completed;
          }
          if (filter === EFilter.completed) {
            return todo.completed;
          }
          return true;
        })
        .filter((todo) => {
          if (priorityFilter !== EPriorityFilter.all) {
            return todo.priority === priorityFilter;
          }
          return true;
        })
        .sort((a, b) => {
          if (sortBy === ESortBy.priority) {
            const priorityValues: Record<EPriority, number> = { low: 1, medium: 2, high: 3 };
            return priorityValues[b.priority] - priorityValues[a.priority];
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }),
  );

  constructor() {
    this.init();
  }

  init() {
    try {
      if (typeof window !== 'undefined') {
        const todos = localStorage.getItem('todos');
        const parsedTodos = todos ? JSON.parse(todos) : initialTodos;
        this.updateTodos(parsedTodos);
      } else {
        this.updateTodos(initialTodos);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      this.updateTodos(initialTodos);
    }
  }

  updateTodos(todos: ITodo[]) {
    this.todos.next(todos);
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  addTodo(todo: Omit<ITodo, 'id' | 'completed' | 'createdAt'>) {
    const currentTodos = this.todos.value;
    const newTodo: ITodo = {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.updateTodos([...currentTodos, newTodo]);
  }

  toggleTodo(id: number) {
    const currentTodos = this.todos.value;
    const updatedTodos = currentTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    this.updateTodos(updatedTodos);
  }

  deleteTodo(id: number) {
    const currentTodos = this.todos.value;
    const filteredTodos = currentTodos.filter((todo) => todo.id !== id);
    this.updateTodos(filteredTodos);
  }

  updateTodoPriority(id: number, priority: keyof typeof EPriority) {
    const currentTodos = this.todos.value;
    const updatedTodos = currentTodos.map((todo) => (todo.id === id ? { ...todo, priority } : todo));
    this.updateTodos(updatedTodos);
  }

  updateTodo(id: number, updates: Partial<Pick<ITodo, 'title' | 'priority'>>) {
    const currentTodos = this.todos.value;
    const updatedTodos = currentTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo));
    this.updateTodos(updatedTodos);
  }

  setFilter(filter: EFilter) {
    this.filter.next(filter);
  }

  setPriorityFilter(priorityFilter: EPriorityFilter) {
    this.priorityFilter.next(priorityFilter);
  }

  setSortBy(sortBy: ESortBy) {
    this.sortBy.next(sortBy);
  }
}

export const stateManager = new StateManager();
