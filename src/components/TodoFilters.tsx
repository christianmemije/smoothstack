'use client';

import { EFilter, EPriorityFilter, ESortBy, stateManager } from '@/app/state';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useObservableState } from 'observable-hooks';

export const TodoFilters = () => {
  const filter = useObservableState<EFilter>(stateManager.filter$, EFilter.all);
  const priorityFilter = useObservableState<EPriorityFilter>(stateManager.priorityFilter$, EPriorityFilter.all);
  const sortBy = useObservableState<ESortBy>(stateManager.sortBy$, ESortBy.createdAt);

  return (
    <div className="flex flex-row items-center justify-between flex-wrap gap-2 mb-4">
      <div>
        <label className="text-sm font-medium">Status</label>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => value && stateManager.setFilter(value as EFilter)}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value={EFilter.all}>All</ToggleGroupItem>
          <ToggleGroupItem value={EFilter.active}>TODO</ToggleGroupItem>
          <ToggleGroupItem value={EFilter.completed}>DONE</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <label className="text-sm font-medium">Priority</label>
        <ToggleGroup
          type="single"
          value={priorityFilter}
          onValueChange={(value) => value && stateManager.setPriorityFilter(value as EPriorityFilter)}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value={EPriorityFilter.all}>All</ToggleGroupItem>
          <ToggleGroupItem value={EPriorityFilter.high}>P1</ToggleGroupItem>
          <ToggleGroupItem value={EPriorityFilter.medium}>P2</ToggleGroupItem>
          <ToggleGroupItem value={EPriorityFilter.low}>P3</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <label className="text-sm font-medium">Sort By</label>
        <ToggleGroup
          type="single"
          value={sortBy}
          onValueChange={(value) => value && stateManager.setSortBy(value as ESortBy)}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value={ESortBy.createdAt}>↑ 📅</ToggleGroupItem>
          <ToggleGroupItem value={ESortBy.priority}>↑ P</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
