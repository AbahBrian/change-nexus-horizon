
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, CheckCircle, AlertTriangle, Play, Pause } from 'lucide-react';

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
      currentStage: 'Quality Review',
      progress: 65,
      timeline: [
        { stage: 'Initiated', department: 'Engineering', status: 'completed', timestamp: '2024-01-15 09:00' },
        { stage: 'Design Review', department: 'Engineering', status: 'completed', timestamp: '2024-01-15 14:30' },
        { stage: 'Quality Review', department: 'Quality', status: 'active', timestamp: '2024-01-16 10:00' },
        { stage: 'Manufacturing Approval', department: 'Manufacturing', status: 'pending', timestamp: null },
        { stage: 'Implementation', department: 'Materials', status: 'pending', timestamp: null }
      ]
    },
    {
      id: 'MET-2024-15',
      partName: 'Metal Housing Component',
      initiatedBy: 'Materials',
      priority: 'Medium',
      status: 'Completed',
      currentStage: 'Implementation',
      progress: 100,
      timeline: [
        { stage: 'Initiated', department: 'Materials', status: 'completed', timestamp: '2024-01-14 08:00' },
        { stage: 'Design Review', department: 'Engineering', status: 'completed', timestamp: '2024-01-14 15:00' },
        { stage: 'Quality Review', department: 'Quality', status: 'completed', timestamp: '2024-01-15 09:30' },
        { stage: 'Manufacturing Approval', department: 'Manufacturing', status: 'completed', timestamp: '2024-01-15 16:00' },
        { stage: 'Implementation', department: 'Materials', status: 'completed', timestamp: '2024-01-16 12:00' }
      ]
    },
    {
      id: 'MAC-2024-08',
      partName: 'Machinery Component',
      initiatedBy: 'Manufacturing',
      priority: 'Critical',
      status: 'Delayed',
      currentStage: 'Design Review',
      progress: 25,
      timeline: [
        { stage: 'Initiated', department: 'Manufacturing', status: 'completed', timestamp: '2024-01-13 10:00' },
        { stage: 'Design Review', department: 'Engineering', status: 'delayed', timestamp: '2024-01-14 09:00' },
        { stage: 'Quality Review', department: 'Quality', status: 'pending', timestamp: null },
        { stage: 'Manufacturing Approval', department: 'Manufacturing', status: 'pending', timestamp: null },
        { stage: 'Implementation', department: 'Materials', status: 'pending', timestamp: null }
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

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      {change.timeline.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center relative z-10">
                          <div className={`w-8 h-8 rounded-full ${getStatusColor(stage.status)} flex items-center justify-center mb-2`}>
                            {stage.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                            {stage.status === 'active' && <Play className="w-4 h-4 text-white" />}
                            {stage.status === 'delayed' && <AlertTriangle className="w-4 h-4 text-white" />}
                            {stage.status === 'pending' && <Pause className="w-4 h-4 text-white" />}
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium text-slate-800">{stage.stage}</p>
                            <p className="text-xs text-slate-600">{stage.department}</p>
                            {stage.timestamp && (
                              <p className="text-xs text-slate-500 mt-1">{stage.timestamp}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-300 -z-0">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${change.progress}%` }}
                      />
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
