
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, CheckCircle, AlertTriangle, Play, Pause, Activity } from 'lucide-react';

interface TimelineTrackerProps {
  selectedPlant: string;
}

const TimelineTracker: React.FC<TimelineTrackerProps> = ({ selectedPlant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-15 09:00' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'active', timestamp: '2024-01-15 14:30' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null }
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
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-14 08:00' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-14 15:00' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-15 09:30' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'active', timestamp: '2024-01-16 10:00' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null }
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
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'delayed', timestamp: '2024-01-13 10:00' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null }
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
        { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-16 08:30' },
        { stage: 'Drawing Part', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-16 16:00' },
        { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-17 10:00' },
        { stage: 'Price Part', department: 'COST CONTROL', status: 'completed', timestamp: '2024-01-17 14:30' },
        { stage: 'ROHS', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-18 09:00' },
        { stage: 'PO', department: 'PURCHASING', status: 'completed', timestamp: '2024-01-18 15:30' },
        { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'completed', timestamp: '2024-01-19 11:00' },
        { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-19 16:30' },
        { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'completed', timestamp: '2024-01-20 10:30' },
        { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-20 14:00' },
        { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'completed', timestamp: '2024-01-21 09:30' }
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
              <Card key={change.id} className="bg-slate-50 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{change.partName}</h3>
                      <p className="text-sm text-slate-600">ID: {change.id}</p>
                      <p className="text-sm text-slate-600">Initiated by: {change.initiatedBy}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(change.priority)}>{change.priority}</Badge>
                      <p className="text-sm text-slate-600 mt-1">Progress: {change.progress}%</p>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {change.timeline.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg border relative">
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
