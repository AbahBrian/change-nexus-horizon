
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Bell, CheckCircle, AlertTriangle, Calendar, User, FileText, Activity, Target, TrendingUp } from 'lucide-react';

interface MyTaskPageProps {
  selectedPlant: string;
}

const MyTaskPage: React.FC<MyTaskPageProps> = ({ selectedPlant }) => {
  const [selectedCategory, setSelectedCategory] = useState('pending');

  // John Manager's personal tasks during 4M Change activities
  const myTasks = {
    pending: [
      {
        id: 'JM-001',
        title: 'Approve Design Changes for PCB-2024-A',
        priority: 'High',
        dueDate: '2024-01-16 14:00',
        status: 'Pending Approval',
        category: 'Management Approval',
        estimatedTime: '30 minutes',
        description: 'Review and approve circuit board design modifications submitted by engineering team',
        partId: 'PCB-2024-A',
        department: 'Engineering',
        submittedBy: 'John Smith',
        impact: 'Production Line 1 & 2'
      },
      {
        id: 'JM-002',
        title: 'Resource Allocation Review for MAC-2024-08',
        priority: 'Critical',
        dueDate: '2024-01-16 16:00',
        status: 'Action Required',
        category: 'Resource Management',
        estimatedTime: '45 minutes',
        description: 'Allocate additional engineering resources for urgent machinery component review',
        partId: 'MAC-2024-08',
        department: 'Manufacturing',
        submittedBy: 'Mike Davis',
        impact: 'Critical Production Impact'
      },
      {
        id: 'JM-003',
        title: 'Budget Approval for Supplier Change',
        priority: 'Medium',
        dueDate: '2024-01-17 10:00',
        status: 'Pending Review',
        category: 'Financial Approval',
        estimatedTime: '20 minutes',
        description: 'Approve budget increase for new supplier qualification process',
        partId: 'CON-2024-44',
        department: 'Purchasing',
        submittedBy: 'Anna Brown',
        impact: 'Cost Impact: +$15,000'
      }
    ],
    followup: [
      {
        id: 'JM-004',
        title: 'Follow-up on Line Trial Results',
        priority: 'High',
        dueDate: '2024-01-17 09:00',
        status: 'Follow-up Required',
        category: 'Process Monitoring',
        estimatedTime: '60 minutes',
        description: 'Review line trial results and coordinate next steps with production team',
        partId: 'MOT-2024-19',
        department: 'Part Engineering',
        submittedBy: 'David Kim',
        impact: 'Production Readiness'
      },
      {
        id: 'JM-005',
        title: 'Team Coordination Meeting',
        priority: 'Medium',
        dueDate: '2024-01-17 15:00',
        status: 'Scheduled',
        category: 'Team Management',
        estimatedTime: '90 minutes',
        description: 'Coordinate cross-functional team activities for multiple part changes',
        partId: 'Multiple',
        department: 'Cross-functional',
        submittedBy: 'System',
        impact: 'Team Efficiency'
      }
    ],
    completed: [
      {
        id: 'JM-006',
        title: 'ROHS Compliance Sign-off',
        priority: 'High',
        dueDate: '2024-01-15 12:00',
        status: 'Completed',
        category: 'Compliance Approval',
        estimatedTime: '15 minutes',
        description: 'Signed off on ROHS compliance verification for sensor component',
        partId: 'SEN-2024-11',
        department: 'Part Engineering',
        submittedBy: 'Tom Wilson',
        impact: 'Regulatory Compliance'
      },
      {
        id: 'JM-007',
        title: 'Cost Analysis Approval',
        priority: 'Medium',
        dueDate: '2024-01-15 16:00',
        status: 'Completed',
        category: 'Financial Approval',
        estimatedTime: '25 minutes',
        description: 'Approved cost reduction proposal and supplier negotiations',
        partId: 'PLT-2024-33',
        department: 'Cost Control',
        submittedBy: 'Lisa Chen',
        impact: 'Cost Savings: $12,000'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-orange-100 text-orange-800';
      case 'Action Required': return 'bg-red-100 text-red-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Follow-up Required': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Management Approval': return <CheckCircle className="w-4 h-4" />;
      case 'Resource Management': return <User className="w-4 h-4" />;
      case 'Financial Approval': return <TrendingUp className="w-4 h-4" />;
      case 'Process Monitoring': return <Activity className="w-4 h-4" />;
      case 'Team Management': return <Target className="w-4 h-4" />;
      case 'Compliance Approval': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const categoryTasks = myTasks[selectedCategory as keyof typeof myTasks] || [];
  const pendingCount = myTasks.pending.length;
  const followupCount = myTasks.followup.length;
  const completedCount = myTasks.completed.length;
  const totalTasks = pendingCount + followupCount + completedCount;

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            My Tasks - John Manager ({selectedPlant})
          </CardTitle>
          <p className="text-sm text-slate-600">
            Personal task management for 4M Part Change activities and follow-up responsibilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Bell className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-700">{pendingCount}</p>
                <p className="text-sm text-orange-600">Pending Actions</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{followupCount}</p>
                <p className="text-sm text-blue-600">Follow-up Items</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">{completedCount}</p>
                <p className="text-sm text-green-600">Completed Today</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{Math.round((completedCount / totalTasks) * 100)}%</p>
                <p className="text-sm text-purple-600">Completion Rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending">Pending Actions</TabsTrigger>
              <TabsTrigger value="followup">Follow-up Items</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="space-y-4">
                {categoryTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(task.category)}
                            <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">Part ID:</span> {task.partId}
                            </div>
                            <div>
                              <span className="font-medium">Department:</span> {task.department}
                            </div>
                            <div>
                              <span className="font-medium">Submitted by:</span> {task.submittedBy}
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span> {task.impact}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2 ml-4">
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {task.dueDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Est: {task.estimatedTime}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {selectedCategory === 'pending' && (
                            <>
                              <Button size="sm" variant="outline">
                                Delegate
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700">
                                Approve
                              </Button>
                            </>
                          )}
                          {selectedCategory === 'followup' && (
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                              Follow Up
                            </Button>
                          )}
                          {selectedCategory === 'completed' && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTaskPage;
