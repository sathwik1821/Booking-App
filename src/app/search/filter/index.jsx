import React from 'react';
import StarFilter from './components/star-filter';
import PriceFilter from './components/price-filter';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useFilterForm from './hooks/use-filter-form';

const Filter = () => {

  const {form} = useFilterForm();

  return (
    <aside className="border border-border max-h-max rounded-md w-[260px]">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-base font-bold">Filter By:</h3>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs underline-offset-1"
        >
          Clear All
        </Button>
      </div>

      <Form {...form}>
        <form>
          <StarFilter form={form} />
          <PriceFilter form={form} />
        </form>
      </Form>
    </aside>
  );
};

export default Filter;