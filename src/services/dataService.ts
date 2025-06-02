
import { supabase } from '@/integrations/supabase/client';

export interface Plant {
  id: string;
  name: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface Part {
  id: string;
  part_id: string;
  name: string;
  description?: string;
  plant_id?: string;
  status: 'initiated' | 'pending' | 'approved' | 'completed' | 'rejected' | 'on_hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  activity_id: string;
  title: string;
  description?: string;
  details?: string;
  part_id?: string;
  department: 'Engineering Department' | 'Quality Department' | 'Manufacturing' | 'Cost Control' | 'Part Engineering' | 'Purchasing';
  assignee: string;
  location?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'initiated' | 'pending' | 'approved' | 'completed' | 'rejected' | 'on_hold';
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  task_id: string;
  title: string;
  description?: string;
  part_id?: string;
  assignee: string;
  department?: 'Engineering Department' | 'Quality Department' | 'Manufacturing' | 'Cost Control' | 'Part Engineering' | 'Purchasing';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface KPIMetric {
  id: string;
  metric_name: string;
  metric_value?: number;
  metric_unit?: string;
  plant_id?: string;
  recorded_at: string;
  created_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  part_id?: string;
  assignee: string;
  scheduled_date: string;
  location?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  file_url?: string;
  part_id?: string;
  document_type: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

// Plants operations
export const getPlants = async (): Promise<Plant[]> => {
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
};

// Parts operations
export const getParts = async (plantId?: string): Promise<Part[]> => {
  let query = supabase.from('parts').select('*');
  
  if (plantId) {
    query = query.eq('plant_id', plantId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createPart = async (part: Omit<Part, 'id' | 'created_at' | 'updated_at'>): Promise<Part> => {
  const { data, error } = await supabase
    .from('parts')
    .insert([part])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePartStatus = async (id: string, status: Part['status']): Promise<Part> => {
  const { data, error } = await supabase
    .from('parts')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Activities operations
export const getActivities = async (plantId?: string): Promise<Activity[]> => {
  let query = supabase.from('activities').select('*');
  
  if (plantId) {
    query = query.eq('plant_id', plantId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createActivity = async (activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>): Promise<Activity> => {
  const { data, error } = await supabase
    .from('activities')
    .insert(activity)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Tasks operations
export const getTasks = async (assignee?: string): Promise<Task[]> => {
  let query = supabase.from('tasks').select('*');
  
  if (assignee) {
    query = query.eq('assignee', assignee);
  }
  
  const { data, error } = await query.order('due_date', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> => {
  const updateData: any = { 
    status, 
    updated_at: new Date().toISOString()
  };
  
  if (status === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// KPI operations
export const getKPIMetrics = async (plantId?: string): Promise<KPIMetric[]> => {
  let query = supabase.from('kpi_metrics').select('*');
  
  if (plantId) {
    query = query.eq('plant_id', plantId);
  }
  
  const { data, error } = await query.order('recorded_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const updateKPIMetric = async (metricName: string, value: number, plantId: string): Promise<KPIMetric> => {
  const { data, error } = await supabase
    .from('kpi_metrics')
    .upsert([{
      metric_name: metricName,
      metric_value: value,
      metric_unit: 'count',
      plant_id: plantId,
      recorded_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Meeting operations
export const createMeeting = async (meeting: {
  title: string;
  description?: string;
  part_id?: string;
  assignee: string;
  scheduled_date: string;
  location?: string;
}): Promise<Meeting> => {
  const { data, error } = await supabase
    .from('meetings')
    .insert({
      ...meeting,
      status: 'scheduled'
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getMeetings = async (partId?: string): Promise<Meeting[]> => {
  let query = supabase.from('meetings').select('*');
  
  if (partId) {
    query = query.eq('part_id', partId);
  }
  
  const { data, error } = await query.order('scheduled_date', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

// Document operations
export const createDocument = async (document: {
  title: string;
  description?: string;
  file_url?: string;
  part_id?: string;
  document_type: string;
  uploaded_by: string;
}): Promise<Document> => {
  const { data, error } = await supabase
    .from('documents')
    .insert(document)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getDocuments = async (partId?: string): Promise<Document[]> => {
  let query = supabase.from('documents').select('*');
  
  if (partId) {
    query = query.eq('part_id', partId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// Contact operations
export const getContacts = async (name?: string): Promise<Contact[]> => {
  let query = supabase.from('contacts').select('*');
  
  if (name) {
    query = query.ilike('name', `%${name}%`);
  }
  
  const { data, error } = await query.order('name');
  
  if (error) throw error;
  return data || [];
};

export const createContact = async (contact: {
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role?: string;
}): Promise<Contact> => {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
