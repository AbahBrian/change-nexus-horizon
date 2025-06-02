
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Bell, CheckCircle, AlertTriangle, Calendar, User, FileText, Activity, Target, TrendingUp } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface MyTaskPageProps {
  selectedPlant: string;
}

const MyTaskPage: React.FC<MyTaskPageProps> = ({ selectedPlant }) => {
  const [selectedCategory, setSelectedCategory] = useState('pending');
  const { tasks, updateTask, isLoading } = useSupabaseData(selectedPlant);

  console.log('MyTaskPage - Real tasks data:', tasks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (department: string) => {
    switch (department) {
      case 'Engineering Department': return <CheckCircle className="w-4 h-4" />;
      case 'Quality Department': return <Activity className="w-4 h-4" />;
      case 'Manufacturing': return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Filter tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const categoryTasks = selectedCategory === 'pending' ? pendingTasks : 
                       selectedCategory === 'followup' ? inProgressTasks : 
                       completedTasks;

  const handleApproveTask = (taskId: string) => {
    updateTask({ id: taskId, status: 'completed' });
  };

  const handleFollowUpTask = (taskId: string) => {
    updateTask({ id: taskId, status: 'in_progress' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

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
                <p className="text-2xl font-bold text-orange-700">{pendingTasks.length}</p>
                <p className="text-sm text-orange-600">Pending Actions</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{inProgressTasks.length}</p>
                <p className="text-sm text-blue-600">Follow-up Items</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">{completedTasks.length}</p>
                <p className="text-sm text-green-600">Completed Today</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">
                  {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                </p>
                <p className="text-sm text-purple-600">Completion Rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending">Pending Actions ({pendingTasks.length})</TabsTrigger>
              <TabsTrigger value="followup">Follow-up Items ({inProgressTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="space-y-4">
                {categoryTasks.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-slate-500">No tasks in this category</p>
                  </Card>
                ) : (
                  categoryTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(task.department || '')}
                              <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                              <div>
                                <span className="font-medium">Task ID:</span> {task.task_id}
                              </div>
                              <div>
                                <span className="font-medium">Department:</span> {task.department}
                              </div>
                              <div>
                                <span className="font-medium">Assignee:</span> {task.assignee}
                              </div>
                              <div>
                                <span className="font-medium">Created:</span> {new Date(task.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2 ml-4">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge variant="outline">{task.department}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Status: {task.status}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {selectedCategory === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleFollowUpTask(task.id)}
                                >
                                  Start Task
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-green-600 to-green-700"
                                  onClick={() => handleApproveTask(task.id)}
                                >
                                  Complete
                                </Button>
                              </>
                            )}
                            {selectedCategory === 'followup' && (
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600"
                                onClick={() => handleApproveTask(task.id)}
                              >
                                Complete Task
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
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTaskPage;
