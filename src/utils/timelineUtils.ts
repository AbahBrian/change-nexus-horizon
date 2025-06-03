
import { Part } from '@/services/dataService';
import { PartChange, TimelineStage } from '@/types/timeline';

export const convertPartsToTimeline = (parts: Part[]): PartChange[] => {
  return parts.map((part) => {
    // Define the 11-step workflow
    const timelineStages: TimelineStage[] = [
      { stage: 'TEN PART FROM SEC', department: 'PART ENGINEERING', status: 'completed', timestamp: part.created_at, assignee: 'John Smith', notes: 'Initial part request submitted and approved', estimatedDuration: '2 hours' },
      { stage: 'Drawing Part', department: 'PART ENGINEERING', status: part.status === 'initiated' ? 'active' : 'completed', timestamp: null, assignee: 'Sarah Johnson', notes: 'Technical drawings in progress', estimatedDuration: '8 hours' },
      { stage: 'TEN Part List', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Mike Davis', notes: 'Waiting for drawing completion', estimatedDuration: '4 hours' },
      { stage: 'Price Part', department: 'COST CONTROL', status: 'pending', timestamp: null, assignee: 'Lisa Chen', notes: 'Cost analysis pending', estimatedDuration: '6 hours' },
      { stage: 'ROHS', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Tom Wilson', notes: 'Environmental compliance check', estimatedDuration: '3 hours' },
      { stage: 'PO', department: 'PURCHASING', status: 'pending', timestamp: null, assignee: 'Anna Brown', notes: 'Purchase order creation', estimatedDuration: '2 hours' },
      { stage: 'BOM', department: 'GNS+ SYSTEM', status: 'pending', timestamp: null, assignee: 'System Auto', notes: 'Bill of materials generation', estimatedDuration: '1 hour' },
      { stage: 'PART DIMENSION MEASUREMENT', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Robert Lee', notes: 'Physical measurements and validation', estimatedDuration: '4 hours' },
      { stage: 'EVALUATION REPORT', department: 'PRODUCT ENGINEERING', status: 'pending', timestamp: null, assignee: 'Emily White', notes: 'Quality evaluation report', estimatedDuration: '6 hours' },
      { stage: 'LINE TRIAL INFORMATION SHEET', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'David Kim', notes: 'Production line trial documentation', estimatedDuration: '3 hours' },
      { stage: 'PART APPROVAL CONFIRMATION', department: 'PART ENGINEERING', status: 'pending', timestamp: null, assignee: 'Jennifer Taylor', notes: 'Final approval and sign-off', estimatedDuration: '2 hours' }
    ];

    // Calculate progress and current stage based on status
    let progress = 9; // Default to first stage
    let currentStage = 'TEN PART FROM SEC';
    
    switch (part.status) {
      case 'initiated':
        progress = 13;
        currentStage = 'Drawing Part';
        timelineStages[1].status = 'active';
        break;
      case 'pending':
        progress = 27;
        currentStage = 'Price Part';
        timelineStages[1].status = 'completed';
        timelineStages[2].status = 'completed';
        timelineStages[3].status = 'active';
        break;
      case 'approved':
        progress = 100;
        currentStage = 'PART APPROVAL CONFIRMATION';
        timelineStages.forEach((stage, index) => {
          if (index < timelineStages.length) {
            stage.status = 'completed';
            stage.timestamp = new Date().toISOString();
          }
        });
        break;
      case 'rejected':
        progress = 9;
        currentStage = 'TEN PART FROM SEC';
        timelineStages[0].status = 'delayed';
        break;
    }

    return {
      id: part.part_id,
      partName: part.name,
      initiatedBy: 'Engineering',
      priority: part.priority,
      status: part.status === 'approved' ? 'Completed' : part.status === 'rejected' ? 'Delayed' : 'In Progress',
      currentStage,
      progress,
      timeline: timelineStages
    };
  });
};

export const filterPartChanges = (
  partChanges: PartChange[], 
  searchTerm: string, 
  filterStatus: string
): PartChange[] => {
  return partChanges.filter(change => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      change.partName.toLowerCase().includes(searchLower) ||
      change.id.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === 'all' || 
      change.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
};
