
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface NoResultsMessageProps {
  totalParts: number;
  selectedPlant: string;
  onClearFilters: () => void;
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  totalParts,
  selectedPlant,
  onClearFilters
}) => {
  return (
    <Card className="bg-slate-50 border-dashed border-2 border-slate-300">
      <CardContent className="p-8 text-center">
        <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 mb-2">No parts found</h3>
        <p className="text-slate-500 mb-4">
          {totalParts === 0 
            ? `No parts have been created for ${selectedPlant} yet. Use the User Input form to create new parts.`
            : "No parts match your current search criteria. Try adjusting your filters."
          }
        </p>
        <Button variant="outline" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoResultsMessage;
