
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Activity, User, Calendar, FileText } from 'lucide-react';
import ScheduleMeetingSheet from '@/components/ScheduleMeetingSheet';
import ViewDocumentsSheet from '@/components/ViewDocumentsSheet';
import ContactAssigneeSheet from '@/components/ContactAssigneeSheet';
import { SelectedStage } from '@/types/timeline';

interface StageDetailsProps {
  selectedStage: SelectedStage;
  onBack: () => void;
}

const StageDetails: React.FC<StageDetailsProps> = ({ selectedStage, onBack }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tracker
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Stage Details - {selectedStage.stage}
              </CardTitle>
              <p className="text-sm text-slate-600">
                Part: {selectedStage.partName} ({selectedStage.partId})
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Stage Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Department:</span>
                    <Badge variant="secondary">{selectedStage.department}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <Badge className={`${getStatusColor(selectedStage.status)} text-white`}>
                      {selectedStage.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estimated Duration:</span>
                    <span className="font-medium">{selectedStage.estimatedDuration}</span>
                  </div>
                  {selectedStage.timestamp && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Completed:</span>
                      <span className="font-medium">{selectedStage.timestamp}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Assignment & Notes</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-600">Assigned to:</p>
                      <p className="font-medium">{selectedStage.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600">Notes:</p>
                      <p className="text-slate-800">{selectedStage.notes}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="flex gap-4">
                <ScheduleMeetingSheet
                  assignee={selectedStage.assignee}
                  partId={selectedStage.partId}
                  partName={selectedStage.partName}
                  stage={selectedStage.stage}
                >
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </ScheduleMeetingSheet>

                <ViewDocumentsSheet
                  partId={selectedStage.partId}
                  partName={selectedStage.partName}
                  stage={selectedStage.stage}
                >
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                </ViewDocumentsSheet>

                <ContactAssigneeSheet
                  assignee={selectedStage.assignee}
                  partName={selectedStage.partName}
                  stage={selectedStage.stage}
                >
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Contact Assignee
                  </Button>
                </ContactAssigneeSheet>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageDetails;
