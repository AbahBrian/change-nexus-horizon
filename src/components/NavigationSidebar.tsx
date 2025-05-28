
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Activity, 
  Clock, 
  BarChart3, 
  Zap, 
  Layout, 
  Settings, 
  Users,
  LogOut
} from 'lucide-react';

interface NavigationSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'tracker', label: 'Real-time Tracker', icon: Activity },
    { id: 'tasks', label: 'Task Dashboard', icon: Clock },
    { id: 'priority', label: 'Priority Engine', icon: Zap },
    { id: 'kpi', label: 'KPI Dashboard', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 p-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">4M Platform</h2>
            <p className="text-xs text-slate-600">Change Management</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 mb-8">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="text-center">
          <h3 className="font-semibold text-slate-800 mb-2">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uptime</span>
              <span className="text-green-600 font-medium">99.9%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Response</span>
              <span className="text-green-600 font-medium">&lt;50ms</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg mb-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-slate-800">John Manager</p>
            <p className="text-xs text-slate-600">Plant Supervisor</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default NavigationSidebar;
