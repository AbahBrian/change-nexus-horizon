import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, CheckCircle, AlertTriangle, Play, Pause, Activity, ArrowLeft, User, Calendar, FileText } from 'lucide-react';

interface TimelineTrackerProps {
  selectedPlant: string;
  highlightPartId?: string | null;
}

const TimelineTracker: React.FC<TimelineTrackerProps> = ({ selectedPlant, highlightPartId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState<any>(null);

  // Clear highlighted part when component unmounts or highlightPartId changes
  useEffect(() => {
    if (highlightPartId) {
      // Clear any existing search/filters to show the highlighted part
      setSearchTerm('');
      setFilterStatus('all');
      
      // Scroll to the highlighted part after a short delay
      setTimeout(() => {
        const element = document.getElementById(`part-${highlightPartId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightPartId]);

  const partChanges = [
    {
      id: 'PCB-2024-A',
      partName: 'Circuit Board Module',
      initiatedBy: 'Engineering',
      priority: 'High',
      status: 'In Progress',
      currentStage: 'Drawing Part',
      progress: 13,
      timeline: [
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-15 09:00', assignee: 'John Smith', notes: 'Initial part request submitted and approved', estimatedDuration: '2 hours' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'active', timestamp: '2024-01-15 14:30', assignee: 'Sarah Johnson', notes: 'Technical drawings in progress', estimatedDuration: '8 hours' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Mike Davis', notes: 'Waiting for drawing completion', estimatedDuration: '4 hours' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null, assignee: 'Lisa Chen', notes: 'Cost analysis pending', estimatedDuration: '6 hours' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Tom Wilson', notes: 'Environmental compliance check', estimatedDuration: '3 hours' },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null, assignee: 'Anna Brown', notes: 'Purchase order creation', estimatedDuration: '2 hours' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null, assignee: 'System Auto', notes: 'Bill of materials generation', estimatedDuration: '1 hour' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Robert Lee', notes: 'Physical measurements and validation', estimatedDuration: '4 hours' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Emily White', notes: 'Quality evaluation report', estimatedDuration: '6 hours' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'David Kim', notes: 'Production line trial documentation', estimatedDuration: '3 hours' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Jennifer Taylor', notes: 'Final approval and sign-off', estimatedDuration: '2 hours' }
      ]
    },
    {
      id: 'MET-2024-15',
      partName: 'Metal Housing Component',
      initiatedBy: 'Materials',
      priority: 'Medium',
      status: 'In Progress',
      currentStage: 'Price Part',
      progress: 27,
      timeline: [
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-14 08:00', assignee: 'John Smith', notes: 'Part request approved quickly', estimatedDuration: '2 hours' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-14 15:00', assignee: 'Sarah Johnson', notes: 'CAD drawings completed', estimatedDuration: '8 hours' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-15 09:30', assignee: 'Mike Davis', notes: 'Part list generated successfully', estimatedDuration: '4 hours' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'active', timestamp: '2024-01-16 10:00', assignee: 'Lisa Chen', notes: 'Cost analysis in progress', estimatedDuration: '6 hours' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Tom Wilson', notes: 'Awaiting cost approval', estimatedDuration: '3 hours' },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null, assignee: 'Anna Brown', notes: 'Purchase order ready', estimatedDuration: '2 hours' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null, assignee: 'System Auto', notes: 'System processing', estimatedDuration: '1 hour' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Robert Lee', notes: 'Measurement protocols ready', estimatedDuration: '4 hours' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Emily White', notes: 'Evaluation criteria defined', estimatedDuration: '6 hours' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'David Kim', notes: 'Trial setup prepared', estimatedDuration: '3 hours' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Jennifer Taylor', notes: 'Approval workflow ready', estimatedDuration: '2 hours' }
      ]
    },
    {
      id: 'MAC-2024-08',
      partName: 'Machinery Component',
      initiatedBy: 'Manufacturing',
      priority: 'Critical',
      status: 'Delayed',
      currentStage: 'TEN PART FROM SEC',
      progress: 9,
      timeline: [
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'delayed', timestamp: '2024-01-13 10:00', assignee: 'John Smith', notes: 'Delayed due to specification issues', estimatedDuration: '2 hours' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Sarah Johnson', notes: 'Waiting for specification clarification', estimatedDuration: '8 hours' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Mike Davis', notes: 'On hold', estimatedDuration: '4 hours' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null, assignee: 'Lisa Chen', notes: 'Cost estimation blocked', estimatedDuration: '6 hours' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Tom Wilson', notes: 'Compliance check queued', estimatedDuration: '3 hours' },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null, assignee: 'Anna Brown', notes: 'Purchase order waiting', estimatedDuration: '2 hours' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null, assignee: 'System Auto', notes: 'System on standby', estimatedDuration: '1 hour' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Robert Lee', notes: 'Measurement planning pending', estimatedDuration: '4 hours' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Emily White', notes: 'Evaluation on hold', estimatedDuration: '6 hours' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'David Kim', notes: 'Trial planning delayed', estimatedDuration: '3 hours' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Jennifer Taylor', notes: 'Approval process queued', estimatedDuration: '2 hours' }
      ]
    },
    {
      id: 'ELC-2024-22',
      partName: 'Electronic Control Unit',
      initiatedBy: 'Engineering',
      priority: 'High',
      status: 'Completed',
      currentStage: 'PART APPROVAL CONFIRMATION',
      progress: 100,
      timeline: [
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-16 08:30', assignee: 'John Smith', notes: 'Request processed efficiently', estimatedDuration: '2 hours' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-16 16:00', assignee: 'Sarah Johnson', notes: 'Detailed CAD models created', estimatedDuration: '8 hours' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-17 10:00', assignee: 'Mike Davis', notes: 'Comprehensive part list finalized', estimatedDuration: '4 hours' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'completed', timestamp: '2024-01-17 14:30', assignee: 'Lisa Chen', notes: 'Cost analysis completed under budget', estimatedDuration: '6 hours' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-18 09:00', assignee: 'Tom Wilson', notes: 'Environmental compliance verified', estimatedDuration: '3 hours' },
        { stage: 'PO', department: 'PURCHASING', status: 'completed', timestamp: '2024-01-18 15:30', assignee: 'Anna Brown', notes: 'Purchase order approved and sent', estimatedDuration: '2 hours' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'completed', timestamp: '2024-01-19 11:00', assignee: 'System Auto', notes: 'BOM generated automatically', estimatedDuration: '1 hour' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-19 16:30', assignee: 'Robert Lee', notes: 'All measurements within tolerance', estimatedDuration: '4 hours' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-20 10:30', assignee: 'Emily White', notes: 'Quality evaluation passed', estimatedDuration: '6 hours' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-20 14:00', assignee: 'David Kim', notes: 'Trial documentation complete', estimatedDuration: '3 hours' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-21 09:30', assignee: 'Jennifer Taylor', notes: 'Final approval confirmed', estimatedDuration: '2 hours' }
      ]
    }
  ];

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

  const filteredChanges = partChanges.filter(change => {
    const matchesSearch = change.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         change.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || change.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStageClick = (stage: any, partChange: any) => {
    setSelectedStage({
      ...stage,
      partId: partChange.id,
      partName: partChange.partName
    });
  };

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
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Contact Assignee
                  </Button>
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
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search by part name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>

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
                              <p className="text-xs text-slate-500 mt-1">{stage.timestamp}</p>
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
