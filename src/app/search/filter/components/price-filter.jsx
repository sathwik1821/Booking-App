import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { PRICE_FILTERS } from '@/config/app.config';
import React from 'react';

const PriceFilter = ({ form }) => {
  return (
    <div className="p-3 border-t border-border">
      <div className="mb-3">
        <h4 className="text-sm font-semibold">Price per night</h4>
      </div>
      <FormField
        control={form.control}
        name="priceRange"
        render={({ field }) => (
          <FormItem>
            {PRICE_FILTERS.map((price) => (
              <FormItem
                key={price.id}
                className="flex items-center gap-2 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    className="w-5 h-5"
                    checked={(field.value || []).includes(price.value)} // Fallback to empty array
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || []; // Fallback to empty array
                      const newValue = checked
                        ? [...currentValue, price.value]
                        : currentValue.filter((value) => value !== price.value);
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal text-foreground">
                  {price.label}
                </FormLabel>
              </FormItem>
            ))}
          </FormItem>
        )}
      />
    </div>
  );
};

export default React.memo(PriceFilter);