
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Clock, Target, AlertTriangle, CheckCircle, Users } from 'lucide-react';

interface KPIDashboardProps {
  selectedPlant: string;
}

const KPIDashboard: React.FC<KPIDashboardProps> = ({ selectedPlant }) => {
  const [timeRange, setTimeRange] = useState('7d');

  const departmentData = [
    {
      department: 'Engineering',
      responseTime: 4.2,
      completionRate: 92,
      overdueTasks: 3,
      totalTasks: 24,
      avgCompletionTime: 18.5,
      trend: 'up'
    },
    {
      department: 'Quality',
      responseTime: 3.8,
      completionRate: 88,
      overdueTasks: 5,
      totalTasks: 28,
      avgCompletionTime: 16.2,
      trend: 'down'
    },
    {
      department: 'Manufacturing',
      responseTime: 5.1,
      completionRate: 94,
      overdueTasks: 2,
      totalTasks: 32,
      avgCompletionTime: 22.3,
      trend: 'up'
    },
    {
      department: 'Materials',
      responseTime: 6.2,
      completionRate: 85,
      overdueTasks: 7,
      totalTasks: 26,
      avgCompletionTime: 28.1,
      trend: 'down'
    }
  ];

  const weeklyTrends = [
    { day: 'Mon', completed: 12, initiated: 15, overdue: 2 },
    { day: 'Tue', completed: 18, initiated: 14, overdue: 1 },
    { day: 'Wed', completed: 15, initiated: 19, overdue: 3 },
    { day: 'Thu', completed: 22, initiated: 16, overdue: 2 },
    { day: 'Fri', completed: 19, initiated: 21, overdue: 4 },
    { day: 'Sat', completed: 8, initiated: 7, overdue: 1 },
    { day: 'Sun', completed: 5, initiated: 4, overdue: 0 }
  ];

  const priorityDistribution = [
    { name: 'Critical', value: 15, color: '#ef4444' },
    { name: 'High', value: 28, color: '#f97316' },
    { name: 'Medium', value: 35, color: '#eab308' },
    { name: 'Low', value: 22, color: '#22c55e' }
  ];

  const responseTimeData = [
    { time: '08:00', engineering: 3.2, quality: 2.8, manufacturing: 4.1, materials: 5.2 },
    { time: '10:00', engineering: 4.1, quality: 3.5, manufacturing: 4.8, materials: 6.1 },
    { time: '12:00', engineering: 4.8, quality: 4.2, manufacturing: 5.2, materials: 6.8 },
    { time: '14:00', engineering: 4.2, quality: 3.8, manufacturing: 5.1, materials: 6.2 },
    { time: '16:00', engineering: 3.9, quality: 3.4, manufacturing: 4.7, materials: 5.9 },
    { time: '18:00', engineering: 3.5, quality: 3.1, manufacturing: 4.2, materials: 5.5 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              KPI Dashboard - {selectedPlant}
            </CardTitle>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Avg Response Time</p>
                        <p className="text-2xl font-bold text-blue-900">4.8h</p>
                        <p className="text-sm text-blue-600">-0.3h from last week</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Overall Completion Rate</p>
                        <p className="text-2xl font-bold text-green-900">89.8%</p>
                        <p className="text-sm text-green-600">+2.1% from last week</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-700">Overdue Tasks</p>
                        <p className="text-2xl font-bold text-orange-900">17</p>
                        <p className="text-sm text-orange-600">-3 from yesterday</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Target Achievement</p>
                        <p className="text-2xl font-bold text-purple-900">92.5%</p>
                        <p className="text-sm text-purple-600">+1.8% from target</p>
                      </div>
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#22c55e" />
                        <Bar dataKey="initiated" fill="#3b82f6" />
                        <Bar dataKey="overdue" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Priority Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={priorityDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {priorityDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {departmentData.map((dept) => (
                  <Card key={dept.department} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {dept.department}
                        {getTrendIcon(dept.trend)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Response Time</p>
                          <p className="text-xl font-bold text-slate-800">{dept.responseTime}h</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Completion Rate</p>
                          <p className={`text-xl font-bold ${getPerformanceColor(dept.completionRate)}`}>
                            {dept.completionRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Overdue Tasks</p>
                          <p className="text-xl font-bold text-red-600">{dept.overdueTasks}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Total Tasks</p>
                          <p className="text-xl font-bold text-slate-800">{dept.totalTasks}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-slate-600">Avg Completion Time</p>
                        <p className="text-lg font-semibold text-slate-800">{dept.avgCompletionTime}h</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Department Performance Overview
                  </CardTitle>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-green-800 mb-2">Top Performer</h3>
                    <p className="text-2xl font-bold text-green-900">Manufacturing</p>
                    <p className="text-sm text-green-700">94% completion rate</p>
                    <p className="text-sm text-green-700">2 overdue tasks</p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">Needs Attention</h3>
                    <p className="text-2xl font-bold text-yellow-900">Materials</p>
                    <p className="text-sm text-yellow-700">85% completion rate</p>
                    <p className="text-sm text-yellow-700">7 overdue tasks</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Fastest Response</h3>
                    <p className="text-2xl font-bold text-blue-900">Quality</p>
                    <p className="text-sm text-blue-700">3.8h average response</p>
                    <p className="text-sm text-blue-700">16.2h completion time</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trends by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engineering" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="quality" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="manufacturing" stroke="#f97316" strokeWidth={2} />
                      <Line type="monotone" dataKey="materials" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Efficiency Score</h3>
                    <p className="text-3xl font-bold text-blue-900">87.3</p>
                    <p className="text-sm text-blue-700">+5.2 from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-purple-800 mb-2">Quality Index</h3>
                    <p className="text-3xl font-bold text-purple-900">94.7</p>
                    <p className="text-sm text-purple-700">+2.1 from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-teal-50 to-cyan-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-teal-800 mb-2">Process Speed</h3>
                    <p className="text-3xl font-bold text-teal-900">91.2</p>
                    <p className="text-sm text-teal-700">+3.8 from last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIDashboard;
