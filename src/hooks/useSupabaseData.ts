
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPlants, 
  getParts, 
  getActivities, 
  getTasks, 
  getKPIMetrics,
  updatePartStatus,
  updateTaskStatus,
  createPart,
  createTask,
  createActivity,
  createMeeting,
  getMeetings,
  createDocument,
  getDocuments,
  getContacts
} from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseData = (selectedPlant: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const plantsQuery = useQuery({
    queryKey: ['plants'],
    queryFn: getPlants,
  });

  const partsQuery = useQuery({
    queryKey: ['parts', selectedPlant],
    queryFn: () => {
      const plant = plantsQuery.data?.find(p => p.name === selectedPlant);
      return getParts(plant?.id);
    },
    enabled: !!plantsQuery.data && !!selectedPlant,
  });

  const activitiesQuery = useQuery({
    queryKey: ['activities', selectedPlant],
    queryFn: () => {
      const plant = plantsQuery.data?.find(p => p.name === selectedPlant);
      return getActivities(plant?.id);
    },
    enabled: !!plantsQuery.data && !!selectedPlant,
  });

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks('John Manager'),
  });

  const kpiQuery = useQuery({
    queryKey: ['kpi', selectedPlant],
    queryFn: () => {
      const plant = plantsQuery.data?.find(p => p.name === selectedPlant);
      return getKPIMetrics(plant?.id);
    },
    enabled: !!plantsQuery.data && !!selectedPlant,
  });

  const meetingsQuery = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getMeetings(),
  });

  const documentsQuery = useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(),
  });

  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: () => getContacts(),
  });

  // Mutations
  const updatePartMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) => updatePartStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Success",
        description: "Part status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update part status",
        variant: "destructive",
      });
      console.error('Part update error:', error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) => updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
      console.error('Task update error:', error);
    },
  });

  const createPartMutation = useMutation({
    mutationFn: createPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      toast({
        title: "Success",
        description: "New part created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create part",
        variant: "destructive",
      });
      console.error('Part creation error:', error);
    },
  });

  const createMeetingMutation = useMutation({
    mutationFn: createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      toast({
        title: "Success",
        description: "Meeting scheduled successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to schedule meeting",
        variant: "destructive",
      });
      console.error('Meeting creation error:', error);
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
      console.error('Document creation error:', error);
    },
  });

  return {
    // Data
    plants: plantsQuery.data || [],
    parts: partsQuery.data || [],
    activities: activitiesQuery.data || [],
    tasks: tasksQuery.data || [],
    kpiMetrics: kpiQuery.data || [],
    meetings: meetingsQuery.data || [],
    documents: documentsQuery.data || [],
    contacts: contactsQuery.data || [],
    
    // Loading states
    isLoading: plantsQuery.isLoading || partsQuery.isLoading || activitiesQuery.isLoading || tasksQuery.isLoading || kpiQuery.isLoading,
    
    // Mutations
    updatePart: updatePartMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    createPart: createPartMutation.mutate,
    createMeeting: createMeetingMutation.mutate,
    createDocument: createDocumentMutation.mutate,
    
    // Refetch functions
    refetchAll: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['kpi'] });
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  };
};
