
export interface TimelineStage {
  stage: string;
  department: string;
  status: 'completed' | 'active' | 'delayed' | 'pending';
  timestamp: string | null;
  assignee: string;
  notes: string;
  estimatedDuration: string;
}

export interface PartChange {
  id: string;
  partName: string;
  initiatedBy: string;
  priority: string;
  status: string;
  currentStage: string;
  progress: number;
  timeline: TimelineStage[];
}

export interface SelectedStage extends TimelineStage {
  partId: string;
  partName: string;
}
