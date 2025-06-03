
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TimelineStage from './TimelineStage';
import { PartChange } from '@/types/timeline';

interface PartChangeCardProps {
  change: PartChange;
  highlightPartId?: string | null;
  onStageClick: (stage: any, partChange: PartChange) => void;
}

const PartChangeCard: React.FC<PartChangeCardProps> = ({ 
  change, 
  highlightPartId, 
  onStageClick 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      id={`part-${change.id}`}
      className={`bg-slate-50 border-l-4 border-l-blue-500 ${
        highlightPartId === change.id ? 'ring-4 ring-blue-200 shadow-lg' : ''
      }`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{change.partName}</h3>
            <p className="text-sm text-slate-600">ID: {change.id}</p>
            <p className="text-sm text-slate-600">Initiated by: {change.initiatedBy}</p>
            {highlightPartId === change.id && (
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                Selected from Recent Activity
              </Badge>
            )}
          </div>
          <div className="text-right">
            <Badge className={getPriorityColor(change.priority)}>{change.priority}</Badge>
            <p className="text-sm text-slate-600 mt-1">Progress: {change.progress}%</p>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {change.timeline.map((stage, index) => (
              <TimelineStage
                key={index}
                stage={stage}
                index={index}
                onClick={() => onStageClick(stage, change)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-slate-600">Current Stage: {change.currentStage}</span>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartChangeCard;
