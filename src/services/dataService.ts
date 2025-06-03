
import { supabase } from '@/integrations/supabase/client';

// Define types for your data
export interface Plant {
  id: string;
  created_at: string;
  name: string;
  location: string;
}

export interface Part {
  id: string;
  created_at: string;
  part_id: string;
  name: string;
  description: string;
  priority: string;
  plant_id: string;
  status: string;
}

export interface Activity {
  id: string;
  created_at: string;
  activity_id: string;
  title: string;
  description: string;
  priority: string;
  assignee: string;
  location: string;
  status: string;
  department: string;
}

export interface Task {
  id: string;
  created_at: string;
  task_id: string;
  title: string;
  description: string;
  priority: string;
  assignee: string;
  due_date: string;
  status: string;
  department: string;
}

export interface KPIMetric {
  id: string;
  created_at: string;
  plant_id: string;
  metric_name: string;
  metric_value: number;
  target_value: number;
  trend: string;
}

export interface Meeting {
  id: string;
  created_at: string;
  title: string;
  description: string;
  scheduled_date: string;
  attendees: string[];
}

export interface Document {
  id: string;
  created_at: string;
  title: string;
  description: string;
  file_url: string;
  category: string;
  document_type: string;
  uploaded_by: string;
}

export interface Contact {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
}

// Plants
export const getPlants = async (): Promise<Plant[]> => {
  console.log('Fetching plants...');
  
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching plants:', error);
    return [];
  }

  return data || [];
};

// Parts
export const getParts = async (plantId: string | undefined): Promise<Part[]> => {
  if (!plantId) {
    console.warn('Plant ID is undefined, skipping parts fetch.');
    return [];
  }

  console.log(`Fetching parts for plant ID: ${plantId}`);

  const { data, error } = await supabase
    .from('parts')
    .select('*')
    .eq('plant_id', plantId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching parts for plant ID ${plantId}:`, error);
    return [];
  }

  return data || [];
};

export const createPart = async (partData: any) => {
  console.log('Creating part:', partData);
  
  const { data, error } = await supabase
    .from('parts')
    .insert([partData])
    .select()
    .single();

  if (error) {
    console.error('Error creating part:', error);
    throw error;
  }

  return data;
};

export const updatePartStatus = async (partId: string, status: string) => {
  console.log(`Updating part ${partId} status to: ${status}`);

  const { data, error } = await supabase
    .from('parts')
    .update({ status })
    .eq('id', partId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating part ${partId} status:`, error);
    throw error;
  }

  return data;
};

// Activities
export const getActivities = async (plantId: string | undefined): Promise<Activity[]> => {
  if (!plantId) {
    console.warn('Plant ID is undefined, skipping activities fetch.');
    return [];
  }

  console.log(`Fetching activities for plant ID: ${plantId}`);

  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('part_id', plantId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching activities for plant ID ${plantId}:`, error);
    return [];
  }

  return data || [];
};

export const createActivity = async (activityData: any) => {
  console.log('Creating activity:', activityData);
  
  const { data, error } = await supabase
    .from('activities')
    .insert([activityData])
    .select()
    .single();

  if (error) {
    console.error('Error creating activity:', error);
    throw error;
  }

  return data;
};

// Tasks
export const getTasks = async (assignee: string): Promise<Task[]> => {
  console.log(`Fetching tasks for assignee: ${assignee}`);

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('assignee', assignee)
    .order('due_date', { ascending: true });

  if (error) {
    console.error(`Error fetching tasks for assignee ${assignee}:`, error);
    return [];
  }

  return data || [];
};

export const createTask = async (taskData: any) => {
  console.log('Creating task:', taskData);
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw error;
  }

  return data;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  console.log(`Updating task ${taskId} status to: ${status}`);

  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating task ${taskId} status:`, error);
    throw error;
  }

  return data;
};

// KPI Metrics
export const getKPIMetrics = async (plantId: string | undefined): Promise<KPIMetric[]> => {
  if (!plantId) {
    console.warn('Plant ID is undefined, skipping KPI metrics fetch.');
    return [];
  }

  console.log(`Fetching KPI metrics for plant ID: ${plantId}`);

  const { data, error } = await supabase
    .from('kpi_metrics')
    .select('*')
    .eq('plant_id', plantId)
    .order('metric_name', { ascending: true });

  if (error) {
    console.error(`Error fetching KPI metrics for plant ID ${plantId}:`, error);
    return [];
  }

  return data || [];
};

export const createMeeting = async (meetingData: any) => {
  console.log('Creating meeting:', meetingData);
  
  const { data, error } = await supabase
    .from('meetings')
    .insert([meetingData])
    .select()
    .single();

  if (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }

  return data;
};

export const getMeetings = async (): Promise<Meeting[]> => {
  console.log('Fetching meetings...');
  
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .order('scheduled_date', { ascending: true });

  if (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }

  return data || [];
};

export const createDocument = async (documentData: any) => {
  console.log('Creating document:', documentData);
  
  const { data, error } = await supabase
    .from('documents')
    .insert([documentData])
    .select()
    .single();

  if (error) {
    console.error('Error creating document:', error);
    throw error;
  }

  return data;
};

export const getDocuments = async (): Promise<Document[]> => {
  console.log('Fetching documents...');
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }

  return data || [];
};

export const getContacts = async (): Promise<Contact[]> => {
  console.log('Fetching contacts...');
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }

  return data || [];
};

export const getContactById = async (id: string): Promise<Contact | null> => {
  console.log('Fetching contact by ID:', id);
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching contact:', error);
    return null;
  }

  return data;
};
