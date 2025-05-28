
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Bell, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

interface TaskDashboardProps {
  selectedPlant: string;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({ selectedPlant }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('Engineering');

  const departments = ['Engineering', 'Quality', 'Manufacturing', 'Materials'];

  const tasks = {
    Engineering: [
      {
        id: 'ENG-001',
        title: 'Design Review for PCB-2024-A',
        priority: 'High',
        dueDate: '2024-01-16 15:00',
        status: 'In Progress',
        assignee: 'John Smith',
        estimatedTime: '4 hours',
        description: 'Complete technical review of circuit board modifications'
      },
      {
        id: 'ENG-002',
        title: 'CAD Model Update for MET-2024-20',
        priority: 'Medium',
        dueDate: '2024-01-17 12:00',
        status: 'Pending',
        assignee: 'Sarah Johnson',
        estimatedTime: '2 hours',
        description: 'Update 3D models to reflect latest design changes'
      },
      {
        id: 'ENG-003',
        title: 'Technical Specification Review',
        priority: 'Critical',
        dueDate: '2024-01-16 10:00',
        status: 'Overdue',
        assignee: 'Mike Wilson',
        estimatedTime: '6 hours',
        description: 'Review and approve technical specifications for MAC-2024-08'
      }
    ],
    Quality: [
      {
        id: 'QUA-001',
        title: 'Quality Inspection for PCB-2024-A',
        priority: 'High',
        dueDate: '2024-01-17 09:00',
        status: 'Pending',
        assignee: 'Lisa Chen',
        estimatedTime: '3 hours',
        description: 'Conduct quality inspection of new circuit board design'
      },
      {
        id: 'QUA-002',
        title: 'Test Protocol Development',
        priority: 'Medium',
        dueDate: '2024-01-18 14:00',
        status: 'In Progress',
        assignee: 'David Park',
        estimatedTime: '5 hours',
        description: 'Develop testing procedures for new components'
      }
    ],
    Manufacturing: [
      {
        id: 'MAN-001',
        title: 'Production Line Assessment',
        priority: 'Critical',
        dueDate: '2024-01-16 16:00',
        status: 'In Progress',
        assignee: 'Robert Brown',
        estimatedTime: '8 hours',
        description: 'Assess production line capability for new part implementation'
      },
      {
        id: 'MAN-002',
        title: 'Tooling Requirements Review',
        priority: 'High',
        dueDate: '2024-01-17 11:00',
        status: 'Pending',
        assignee: 'Emma Davis',
        estimatedTime: '4 hours',
        description: 'Review tooling requirements for MAC-2024-08'
      }
    ],
    Materials: [
      {
        id: 'MAT-001',
        title: 'Supplier Qualification',
        priority: 'Medium',
        dueDate: '2024-01-18 15:00',
        status: 'Pending',
        assignee: 'Tom Garcia',
        estimatedTime: '6 hours',
        description: 'Qualify new suppliers for updated material specifications'
      },
      {
        id: 'MAT-002',
        title: 'Inventory Impact Analysis',
        priority: 'High',
        dueDate: '2024-01-17 13:00',
        status: 'In Progress',
        assignee: 'Anna Martinez',
        estimatedTime: '3 hours',
        description: 'Analyze inventory impact of part changes'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
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

  const departmentTasks = tasks[selectedDepartment as keyof typeof tasks] || [];
  const overdueCount = departmentTasks.filter(task => task.status === 'Overdue').length;
  const inProgressCount = departmentTasks.filter(task => task.status === 'In Progress').length;
  const pendingCount = departmentTasks.filter(task => task.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Task Dashboard - {selectedPlant}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {departments.map((dept) => (
                <TabsTrigger key={dept} value={dept}>{dept}</TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-700">{overdueCount}</p>
                  <p className="text-sm text-red-600">Overdue Tasks</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-700">{inProgressCount}</p>
                  <p className="text-sm text-blue-600">In Progress</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <Bell className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
                  <p className="text-sm text-yellow-600">Pending</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-700">85%</p>
                  <p className="text-sm text-green-600">Completion Rate</p>
                </CardContent>
              </Card>
            </div>

            {departments.map((dept) => (
              <TabsContent key={dept} value={dept}>
                <div className="space-y-4">
                  {departmentTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{task.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>Assignee: {task.assignee}</span>
                              <span>Est. Time: {task.estimatedTime}</span>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            Due: {task.dueDate}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDashboard;
