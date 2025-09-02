import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { STAR_FILTERS } from '@/config/app.config';
import React from 'react'

const StarFilter = ({form}) => {
  return (
    <div className="p-3 border-t border-border">
      <div className="mb-3">
        <h4 className="text-sm font-semibold">Star Category</h4>
      </div>
      <FormField
        control={form.control}
        name="starCategory"
        render={({ field }) => (
          <FormItem>
            {STAR_FILTERS.map((star) => (
              <FormItem key={star.id} className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    className="w-5 h-5 accent-blue-500"
                    checked={field.value?.includes(star.value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...field.value, star.value]
                        : field.value?.filter((value) => value !== star.value);
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal text-foreground">
                  {star.label}
                </FormLabel>
              </FormItem>
            ))}
          </FormItem>
        )}
      />
    </div>
  );
}

export default StarFilter