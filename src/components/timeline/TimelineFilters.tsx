
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface TimelineFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  clearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  clearFilters,
  filteredCount,
  totalCount
}) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg mb-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">Real-time Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by part name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>

        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          Clear Filters
        </Button>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Showing {filteredCount} of {totalCount} parts
        </span>
        {(searchTerm || filterStatus !== 'all') && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Filters Active
          </Badge>
        )}
      </div>
    </div>
  );
};

export default TimelineFilters;
