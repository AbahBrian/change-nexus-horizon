
import React, { useState } from 'react';
import NavigationSidebar from '@/components/NavigationSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, TrendingUp, Users, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import TimelineTracker from '@/components/TimelineTracker';
import TaskDashboard from '@/components/TaskDashboard';
import MyTaskPage from '@/components/MyTaskPage';
import KPIDashboard from '@/components/KPIDashboard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlant, setSelectedPlant] = useState('Plant A');
  
  const { plants, parts, activities, tasks, kpiMetrics, isLoading, updatePart } = useSupabaseData(selectedPlant);

  console.log('Dashboard data:', { plants, parts, activities, tasks, kpiMetrics });

  const handlePlantChange = (plantName: string) => {
    setSelectedPlant(plantName);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'initiated': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const handleApprove = (partId: string) => {
    updatePart({ id: partId, status: 'approved' });
  };

  const handleReject = (partId: string) => {
    updatePart({ id: partId, status: 'rejected' });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header with Plant Selector and User Input Button */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plant Selection</span>
            <div className="flex items-center gap-4">
              <Select value={selectedPlant} onValueChange={handlePlantChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select a plant" />
                </SelectTrigger>
                <SelectContent>
                  {plants.map((plant) => (
                    <SelectItem key={plant.id} value={plant.name}>
                      {plant.name} - {plant.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                User Input
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active Changes</p>
                <p className="text-3xl font-bold">{parts.length}</p>
                <p className="text-blue-100 text-xs">Real-time data</p>
              </div>
              <Activity className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Approved Today</p>
                <p className="text-3xl font-bold">{parts.filter(p => p.status === 'approved').length}</p>
                <p className="text-green-100 text-xs">+12% from yesterday</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Actions</p>
                <p className="text-3xl font-bold">{parts.filter(p => p.status === 'pending').length}</p>
                <p className="text-orange-100 text-xs">Needs attention</p>
              </div>
              <Clock className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Team Members</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-purple-100 text-xs">Active users</p>
              </div>
              <Users className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activities - {selectedPlant}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading activities...</p>
          ) : activities.length === 0 ? (
            <p>No activities found for {selectedPlant}</p>
          ) : (
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{activity.title}</h4>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>ID: {activity.activity_id}</span>
                      <span>Assignee: {activity.assignee}</span>
                      <span>Location: {activity.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(activity.priority)}>{activity.priority}</Badge>
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Parts Overview */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Active Parts - {selectedPlant}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading parts...</p>
          ) : parts.length === 0 ? (
            <p>No parts found for {selectedPlant}</p>
          ) : (
            <div className="space-y-4">
              {parts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{part.name}</h4>
                    <p className="text-sm text-slate-600">{part.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>Part ID: {part.part_id}</span>
                      <span>Created: {new Date(part.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(part.priority)}>{part.priority}</Badge>
                    <Badge className={getStatusColor(part.status)}>{part.status}</Badge>
                    {part.status === 'pending' && (
                      <div className="flex gap-1 ml-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleReject(part.id)}
                        >
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(part.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'tracker':
        return <TimelineTracker selectedPlant={selectedPlant} />;
      case 'tasks':
        return <TaskDashboard selectedPlant={selectedPlant} />;
      case 'mytasks':
        return <MyTaskPage selectedPlant={selectedPlant} />;
      case 'kpi':
        return <KPIDashboard selectedPlant={selectedPlant} />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <NavigationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              4M Change Management Platform
            </h1>
            <p className="text-slate-600">
              Real-time monitoring and management of change activities
            </p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
