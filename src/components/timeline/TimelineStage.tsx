
import React from 'react';
import { CheckCircle, AlertTriangle, Play, Pause } from 'lucide-react';
import { TimelineStage as TimelineStageType } from '@/types/timeline';

interface TimelineStageProps {
  stage: TimelineStageType;
  index: number;
  onClick: () => void;
}

const TimelineStage: React.FC<TimelineStageProps> = ({ stage, index, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const renderStatusIcon = () => {
    switch (stage.status) {
      case 'completed': return <CheckCircle className="w-3 h-3 text-white" />;
      case 'active': return <Play className="w-3 h-3 text-white" />;
      case 'delayed': return <AlertTriangle className="w-3 h-3 text-white" />;
      default: return <Pause className="w-3 h-3 text-white" />;
    }
  };

  return (
    <div 
      className="flex flex-col items-center p-3 bg-white rounded-lg border relative cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-slate-50"
      onClick={onClick}
    >
      <div className={`w-8 h-8 rounded-full ${getStatusColor(stage.status)} flex items-center justify-center mb-2 text-xs font-bold text-white`}>
        {index + 1}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-slate-800 leading-tight mb-1">{stage.stage}</p>
        <p className="text-xs text-blue-600 font-medium">{stage.department}</p>
        {stage.timestamp && (
          <p className="text-xs text-slate-500 mt-1">{new Date(stage.timestamp).toLocaleDateString()}</p>
        )}
      </div>
      <div className={`absolute top-2 right-2 w-4 h-4 ${getStatusColor(stage.status)} rounded-full flex items-center justify-center`}>
        {renderStatusIcon()}
      </div>
    </div>
  );
};

export default TimelineStage;
