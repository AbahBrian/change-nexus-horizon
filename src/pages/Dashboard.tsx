
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, AlertTriangle, CheckCircle, Users, Activity, Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TimelineTracker from '@/components/TimelineTracker';
import TaskDashboard from '@/components/TaskDashboard';
import PrioritySimulator from '@/components/PrioritySimulator';
import KPIDashboard from '@/components/KPIDashboard';
import NavigationSidebar from '@/components/NavigationSidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlant, setSelectedPlant] = useState('Plant A');

  const overviewStats = [
    { title: 'Active Changes', value: '47', trend: '+12%', icon: Activity, color: 'text-blue-500' },
    { title: 'Pending Approvals', value: '23', trend: '-5%', icon: Clock, color: 'text-orange-500' },
    { title: 'Critical Priority', value: '8', trend: '+2', icon: AlertTriangle, color: 'text-red-500' },
    { title: 'Completed Today', value: '15', trend: '+8%', icon: CheckCircle, color: 'text-green-500' }
  ];

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
            <TabsTrigger value="priority">Priority Engine</TabsTrigger>
            <TabsTrigger value="kpi">KPI Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Part PCB-2024-A initiated</p>
                        <p className="text-sm text-slate-600">Engineering Department - 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Part MET-2024-15 approved</p>
                        <p className="text-sm text-slate-600">Quality Department - 5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Part MAC-2024-08 pending review</p>
                        <p className="text-sm text-slate-600">Manufacturing - 12 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Engineering</span>
                        <span className="text-sm text-slate-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Quality</span>
                        <span className="text-sm text-slate-600">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Manufacturing</span>
                        <span className="text-sm text-slate-600">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Materials</span>
                        <span className="text-sm text-slate-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracker">
            <TimelineTracker selectedPlant={selectedPlant} />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskDashboard selectedPlant={selectedPlant} />
          </TabsContent>

          <TabsContent value="priority">
            <PrioritySimulator selectedPlant={selectedPlant} />
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
