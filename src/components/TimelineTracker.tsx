import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, CheckCircle, AlertTriangle, Play, Pause, Activity, ArrowLeft, User, Calendar, FileText, Search, Filter } from 'lucide-react';
import ScheduleMeetingSheet from '@/components/ScheduleMeetingSheet';
import ViewDocumentsSheet from '@/components/ViewDocumentsSheet';
import ContactAssigneeSheet from '@/components/ContactAssigneeSheet';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface TimelineTrackerProps {
  selectedPlant: string;
  highlightPartId?: string | null;
}

interface TimelineStage {
  stage: string;
  department: string;
  status: 'completed' | 'active' | 'delayed' | 'pending';
  timestamp: string | null;
  assignee: string;
  notes: string;
  estimatedDuration: string;
}

interface PartChange {
  id: string;
  partName: string;
  initiatedBy: string;
  priority: string;
  status: string;
  currentStage: string;
  progress: number;
  timeline: TimelineStage[];
}

const TimelineTracker: React.FC<TimelineTrackerProps> = ({ selectedPlant, highlightPartId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState<any>(null);
  
  const { plants, parts, activities, isLoading } = useSupabaseData(selectedPlant);

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
  const partChanges: PartChange[] = useMemo(() => {
    return parts.map((part) => {
      // Define the 11-step workflow
      const timelineStages: TimelineStage[] = [
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: part.created_at, assignee: 'John Smith', notes: 'Initial part request submitted and approved', estimatedDuration: '2 hours' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: part.status === 'initiated' ? 'active' : 'completed', timestamp: null, assignee: 'Sarah Johnson', notes: 'Technical drawings in progress', estimatedDuration: '8 hours' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Mike Davis', notes: 'Waiting for drawing completion', estimatedDuration: '4 hours' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null, assignee: 'Lisa Chen', notes: 'Cost analysis pending', estimatedDuration: '6 hours' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Tom Wilson', notes: 'Environmental compliance check', estimatedDuration: '3 hours' },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null, assignee: 'Anna Brown', notes: 'Purchase order creation', estimatedDuration: '2 hours' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null, assignee: 'System Auto', notes: 'Bill of materials generation', estimatedDuration: '1 hour' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Robert Lee', notes: 'Physical measurements and validation', estimatedDuration: '4 hours' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Emily White', notes: 'Quality evaluation report', estimatedDuration: '6 hours' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'David Kim', notes: 'Production line trial documentation', estimatedDuration: '3 hours' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Jennifer Taylor', notes: 'Final approval and sign-off', estimatedDuration: '2 hours' }
      ];

      // Calculate progress and current stage based on status
      let progress = 9; // Default to first stage
      let currentStage = 'TEN PART FROM SEC';
      
      switch (part.status) {
        case 'initiated':
          progress = 13;
          currentStage = 'Drawing Part';
          timelineStages[1].status = 'active';
          break;
        case 'pending':
          progress = 27;
          currentStage = 'Price Part';
          timelineStages[1].status = 'completed';
          timelineStages[2].status = 'completed';
          timelineStages[3].status = 'active';
          break;
        case 'approved':
          progress = 100;
          currentStage = 'PART APPROVAL CONFIRMATION';
          timelineStages.forEach((stage, index) => {
            if (index < timelineStages.length) {
              stage.status = 'completed';
              stage.timestamp = new Date().toISOString();
            }
          });
          break;
        case 'rejected':
          progress = 9;
          currentStage = 'TEN PART FROM SEC';
          timelineStages[0].status = 'delayed';
          break;
      }

      return {
        id: part.part_id,
        partName: part.name,
        initiatedBy: 'Engineering',
        priority: part.priority,
        status: part.status === 'approved' ? 'Completed' : part.status === 'rejected' ? 'Delayed' : 'In Progress',
        currentStage,
        progress,
        timeline: timelineStages
      };
    });
  }, [parts]);

  // Real-time filtering using useMemo for performance
  const filteredChanges = useMemo(() => {
    return partChanges.filter(change => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        change.partName.toLowerCase().includes(searchLower) ||
        change.id.toLowerCase().includes(searchLower);
      
      const matchesStatus = filterStatus === 'all' || 
        change.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [partChanges, searchTerm, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    return (
      <div className="space-y-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedStage(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tracker
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Stage Details - {selectedStage.stage}
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Part: {selectedStage.partName} ({selectedStage.partId})
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Stage Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Department:</span>
                      <Badge variant="secondary">{selectedStage.department}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge className={`${getStatusColor(selectedStage.status)} text-white`}>
                        {selectedStage.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estimated Duration:</span>
                      <span className="font-medium">{selectedStage.estimatedDuration}</span>
                    </div>
                    {selectedStage.timestamp && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Completed:</span>
                        <span className="font-medium">{selectedStage.timestamp}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Assignment & Notes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-slate-600" />
                      <div>
                        <p className="text-sm text-slate-600">Assigned to:</p>
                        <p className="font-medium">{selectedStage.assignee}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-slate-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600">Notes:</p>
                        <p className="text-slate-800">{selectedStage.notes}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="flex gap-4">
                  <ScheduleMeetingSheet
                    assignee={selectedStage.assignee}
                    partId={selectedStage.partId}
                    partName={selectedStage.partName}
                    stage={selectedStage.stage}
                  >
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </ScheduleMeetingSheet>

                  <ViewDocumentsSheet
                    partId={selectedStage.partId}
                    partName={selectedStage.partName}
                    stage={selectedStage.stage}
                  >
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Documents
                    </Button>
                  </ViewDocumentsSheet>

                  <ContactAssigneeSheet
                    assignee={selectedStage.assignee}
                    partName={selectedStage.partName}
                    stage={selectedStage.stage}
                  >
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Contact Assignee
                    </Button>
                  </ContactAssigneeSheet>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
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
          {/* Enhanced Filter Section */}
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
                Showing {filteredChanges.length} of {partChanges.length} parts
              </span>
              {(searchTerm || filterStatus !== 'all') && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Filters Active
                </Badge>
              )}
            </div>
          </div>

          {/* No Results Message */}
          {filteredChanges.length === 0 && (
            <Card className="bg-slate-50 border-dashed border-2 border-slate-300">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No parts found</h3>
                <p className="text-slate-500 mb-4">
                  {partChanges.length === 0 
                    ? `No parts have been created for ${selectedPlant} yet. Use the User Input form to create new parts.`
                    : "No parts match your current search criteria. Try adjusting your filters."
                  }
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Filtered Results */}
          <div className="space-y-6">
            {filteredChanges.map((change) => (
              <Card 
                key={change.id} 
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
                        <div 
                          key={index} 
                          className="flex flex-col items-center p-3 bg-white rounded-lg border relative cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-slate-50"
                          onClick={() => handleStageClick(stage, change)}
                        >
                          <div className={`w-8 h-8 rounded-full ${getStatusColor(stage.status)} flex items-center justify-center mb-2 text-xs font-bold text-white`}>
                            {index + 1}
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium text-slate-800 leading-tight mb-1">{stage.stage}</p>
                            <p className="text-xs text-blue-600 font-medium">{stage.department}</p>
                            {stage.timestamp && (
                              <p className="text-xs text-slate-500 mt-1">{new Date(stage.timestamp).toLocaleDateString()}</p>
                            )}
                          </div>
                          <div className={`absolute top-2 right-2 w-4 h-4 ${getStatusColor(stage.status)} rounded-full flex items-center justify-center`}>
                            {stage.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                            {stage.status === 'active' && <Play className="w-3 h-3 text-white" />}
                            {stage.status === 'delayed' && <AlertTriangle className="w-3 h-3 text-white" />}
                            {stage.status === 'pending' && <Pause className="w-3 h-3 text-white" />}
                          </div>
                        </div>
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineTracker;
