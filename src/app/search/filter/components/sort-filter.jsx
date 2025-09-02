import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select';
  import { SEARCH_FILTER_LABEL_KEY, SEARCH_FILTERS } from '@/config/app.config';
  import React from 'react'
  
  const SortFilter = () => {
    return (
      <div>
        <Select>
          <SelectTrigger className="gap-2 rounded-full border border-border">
            <SelectValue placeholder="Select sort filter">
              <span>{SEARCH_FILTER_LABEL_KEY[0]}</span>
            </SelectValue>
          </SelectTrigger>
  
          <SelectContent>
            {SEARCH_FILTERS.map((filter, index) => (
              <SelectItem key={index}>{filter.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
  
  export default SortFilter