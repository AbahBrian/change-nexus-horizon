
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { convertPartsToTimeline, filterPartChanges } from '@/utils/timelineUtils';
import { SelectedStage } from '@/types/timeline';

// Import refactored components from ./timeline/
import TimelineFilters from './timeline/TimelineFilters';
import PartChangeCard from './timeline/PartChangeCard';
import StageDetails from './timeline/StageDetails';
import NoResultsMessage from './timeline/NoResultsMessage';

interface TimelineTrackerProps {
  selectedPlant: string;
  highlightPartId?: string | null;
}

const TimelineTracker: React.FC<TimelineTrackerProps> = ({ selectedPlant, highlightPartId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState<SelectedStage | null>(null);
  
  const { parts, isLoading } = useSupabaseData(selectedPlant);

  // Clear highlighted part when component unmounts or highlightPartId changes
  useEffect(() => {
    if (highlightPartId) {
      setSearchTerm('');
      setFilterStatus('all');
      setTimeout(() => {
        const element = document.getElementById(`part-${highlightPartId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightPartId]);

  // Convert database parts to timeline format
  const partChanges = useMemo(() => convertPartsToTimeline(parts), [parts]);

  // Real-time filtering using useMemo for performance
  const filteredChanges = useMemo(() => 
    filterPartChanges(partChanges, searchTerm, filterStatus), 
    [partChanges, searchTerm, filterStatus]
  );

  const handleStageClick = (stage: any, partChange: any) => {
    setSelectedStage({
      ...stage,
      partId: partChange.id,
      partName: partChange.partName
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">Loading tracker data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedStage) {
    return <StageDetails selectedStage={selectedStage} onBack={() => setSelectedStage(null)} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Part Change Tracker - {selectedPlant}
          </CardTitle>
          <p className="text-sm text-slate-600">
            Complete 11-Step Flow: TEN PART FROM SEC → Drawing Part → TEN Part List → Price Part → ROHS → PO → BOM → PART DIMENSION MEASUREMENT → EVALUATION REPORT → LINE TRIAL INFORMATION SHEET → PART APPROVAL CONFIRMATION
          </p>
        </CardHeader>
        <CardContent>
          <TimelineFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            clearFilters={clearFilters}
            filteredCount={filteredChanges.length}
            totalCount={partChanges.length}
          />

          {filteredChanges.length === 0 ? (
            <NoResultsMessage
              totalParts={partChanges.length}
              selectedPlant={selectedPlant}
              onClearFilters={clearFilters}
            />
          ) : (
            <div className="space-y-6">
              {filteredChanges.map((change) => (
                <PartChangeCard
                  key={change.id}
                  change={change}
                  highlightPartId={highlightPartId}
                  onStageClick={handleStageClick}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineTracker;
