import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, AlertTriangle, CheckCircle, Users, Activity, Bell, User, FileText, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TimelineTracker from '@/components/TimelineTracker';
import TaskDashboard from '@/components/TaskDashboard';
import MyTaskPage from '@/components/MyTaskPage';
import KPIDashboard from '@/components/KPIDashboard';
import NavigationSidebar from '@/components/NavigationSidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlant, setSelectedPlant] = useState('Plant A');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const overviewStats = [
    { title: 'Active Changes', value: '47', trend: '+12%', icon: Activity, color: 'text-blue-500' },
    { title: 'Pending Approvals', value: '23', trend: '-5%', icon: Clock, color: 'text-orange-500' },
    { title: 'Critical Priority', value: '8', trend: '+2', icon: AlertTriangle, color: 'text-red-500' },
    { title: 'Completed Today', value: '15', trend: '+8%', icon: CheckCircle, color: 'text-green-500' }
  ];

  const recentActivities = [
    {
      id: 'ACT-001',
      title: 'Part PCB-2024-A initiated',
      description: 'New circuit board module request submitted for approval',
      department: 'Engineering Department',
      time: '2 minutes ago',
      type: 'initiated',
      priority: 'High',
      assignee: 'John Smith',
      location: 'Plant A - Building 2',
      details: 'Circuit board specifications have been updated to meet new performance requirements',
      partId: 'PCB-2024-A'
    },
    {
      id: 'ACT-002',
      title: 'Part MET-2024-15 approved',
      description: 'Metal housing component has passed quality assessment',
      department: 'Quality Department',
      time: '5 minutes ago',
      type: 'approved',
      priority: 'Medium',
      assignee: 'Sarah Johnson',
      location: 'Plant A - Quality Lab',
      details: 'All dimensional measurements are within specified tolerances',
      partId: 'MET-2024-15'
    },
    {
      id: 'ACT-003',
      title: 'Part MAC-2024-08 pending review',
      description: 'Machinery component awaiting technical review',
      department: 'Manufacturing',
      time: '12 minutes ago',
      type: 'pending',
      priority: 'Critical',
      assignee: 'Mike Davis',
      location: 'Plant A - Production Floor',
      details: 'Manufacturing team requires clarification on material specifications',
      partId: 'MAC-2024-08'
    },
    {
      id: 'ACT-004',
      title: 'BOM Generation Completed',
      description: 'Bill of Materials generated for ELC-2024-22',
      department: 'GNS+ System',
      time: '18 minutes ago',
      type: 'completed',
      priority: 'High',
      assignee: 'System Auto',
      location: 'Automated System',
      details: 'BOM includes 127 components with cost breakdown analysis',
      partId: 'ELC-2024-22'
    },
    {
      id: 'ACT-005',
      title: 'Price Analysis Updated',
      description: 'Cost control review completed for PLT-2024-33',
      department: 'Cost Control',
      time: '25 minutes ago',
      type: 'updated',
      priority: 'Medium',
      assignee: 'Lisa Chen',
      location: 'Plant A - Finance Wing',
      details: 'Total cost reduced by 8% through supplier negotiations',
      partId: 'PLT-2024-33'
    },
    {
      id: 'ACT-006',
      title: 'ROHS Compliance Verified',
      description: 'Environmental compliance check passed for SEN-2024-11',
      department: 'Part Engineering',
      time: '32 minutes ago',
      type: 'verified',
      priority: 'High',
      assignee: 'Tom Wilson',
      location: 'Plant A - Compliance Office',
      details: 'All materials meet EU ROHS directive requirements',
      partId: 'SEN-2024-11'
    },
    {
      id: 'ACT-007',
      title: 'Purchase Order Issued',
      description: 'PO-24567 sent to supplier for CON-2024-44',
      department: 'Purchasing',
      time: '45 minutes ago',
      type: 'issued',
      priority: 'Medium',
      assignee: 'Anna Brown',
      location: 'Plant A - Procurement',
      details: 'Expected delivery within 2 weeks, tracking number provided',
      partId: 'CON-2024-44'
    },
    {
      id: 'ACT-008',
      title: 'Line Trial Scheduled',
      description: 'Production trial scheduled for MOT-2024-19',
      department: 'Part Engineering',
      time: '1 hour ago',
      type: 'scheduled',
      priority: 'High',
      assignee: 'David Kim',
      location: 'Plant A - Test Line 3',
      details: 'Trial planned for next Tuesday with full quality monitoring',
      partId: 'MOT-2024-19'
    }
  ];

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'initiated': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'approved': return 'bg-green-50 border-green-200 text-green-800';
      case 'pending': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'completed': return 'bg-green-50 border-green-200 text-green-800';
      case 'updated': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'verified': return 'bg-teal-50 border-teal-200 text-teal-800';
      case 'issued': return 'bg-indigo-50 border-indigo-200 text-indigo-800';
      case 'scheduled': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'initiated': return <FileText className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'updated': return <TrendingUp className="w-4 h-4" />;
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'issued': return <FileText className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const handleActivityClick = (activity: any) => {
    setSelectedPartId(activity.partId);
    setActiveTab('tracker');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <NavigationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-6">
        {/* User Profile Header */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">John Manager</h2>
                <p className="text-slate-600">Plant Supervisor • Engineering Department</p>
                <Badge variant="secondary" className="mt-1">
                  Level 4 - Senior Manager
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPlant} 
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Plant A">Plant A - Main Facility</option>
                <option value="Plant B">Plant B - Secondary</option>
                <option value="Plant C">Plant C - International</option>
              </select>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">4M Part Change Management</h1>
              <p className="text-slate-600">Real-time tracking and management platform</p>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="bg-white shadow-sm border-0 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.trend}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tracker">Real-time Tracker</TabsTrigger>
            <TabsTrigger value="tasks">Task Dashboard</TabsTrigger>
            <TabsTrigger value="mytasks">My Tasks</TabsTrigger>
            <TabsTrigger value="kpi">KPI Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity - Live Updates
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Real-time activity feed showing all part change operations across {selectedPlant}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <Card 
                      key={activity.id} 
                      className={`border-2 ${getActivityTypeColor(activity.type)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      onClick={() => handleActivityClick(activity)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full ${getActivityTypeColor(activity.type)} flex items-center justify-center`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-slate-800">{activity.title}</h4>
                                <p className="text-sm text-slate-600">{activity.description}</p>
                                <p className="text-xs text-slate-500 mt-1">{activity.details}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={`text-xs ${activity.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                                  activity.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {activity.priority}
                                </Badge>
                                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-500" />
                                <span className="text-slate-600">{activity.department}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-500" />
                                <span className="text-slate-600">{activity.assignee}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                <span className="text-slate-600">{activity.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Load More Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker">
            <TimelineTracker selectedPlant={selectedPlant} highlightPartId={selectedPartId} />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskDashboard selectedPlant={selectedPlant} />
          </TabsContent>

          <TabsContent value="mytasks">
            <MyTaskPage selectedPlant={selectedPlant} />
          </TabsContent>

          <TabsContent value="kpi">
            <KPIDashboard selectedPlant={selectedPlant} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
