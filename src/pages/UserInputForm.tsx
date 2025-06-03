
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';

interface UserInputFormData {
  actionType: 'new_part' | 'update_status';
  partId?: string;
  modelCode: string;
  partName: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  department: 'Part Engineering' | 'Product Engineering' | 'Cost Control' | 'Purchasing';
  plantId: string;
  reasonForChange: string;
  expectedImpact: string;
  timeline: string;
  requestedBy: string;
  approver: string;
  costEstimate: string;
  supplierInfo: string;
  technicalSpecs: string;
  qualityRequirements: string;
  complianceNotes: string;
  attachments: string;
}

const UserInputForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { plants, parts, createPart } = useSupabaseData('');
  
  const form = useForm<UserInputFormData>({
    defaultValues: {
      actionType: 'new_part',
      priority: 'Medium',
      department: 'Part Engineering',
      requestedBy: 'John Manager',
      approver: 'Sarah Johnson',
    }
  });

  const actionType = form.watch('actionType');

  const onSubmit = async (data: UserInputFormData) => {
    try {
      if (data.actionType === 'new_part') {
        const selectedPlant = plants.find(p => p.id === data.plantId);
        
        await createPart({
          part_id: data.modelCode,
          name: data.partName,
          description: data.description,
          priority: data.priority,
          plant_id: data.plantId,
          status: 'initiated'
        });

        toast({
          title: "Success",
          description: "New part change request has been created successfully!",
        });
      }

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">User Input Form</h1>
            <p className="text-slate-600">Initiate part change or update status follow-up</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Action Type</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="actionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What would you like to do?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new_part">Initiate New Part Change</SelectItem>
                          <SelectItem value="update_status">Update Status Follow-Up</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {actionType === 'update_status' && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Existing Part</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="partId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Existing Part</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select existing part" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {parts.map((part) => (
                              <SelectItem key={part.id} value={part.id}>
                                {part.part_id} - {part.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="modelCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PCB-2024-C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="partName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Part Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Advanced PCB Component" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Part Engineering">Part Engineering</SelectItem>
                          <SelectItem value="Product Engineering">Product Engineering</SelectItem>
                          <SelectItem value="Cost Control">Cost Control</SelectItem>
                          <SelectItem value="Purchasing">Purchasing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plant *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plants.map((plant) => (
                            <SelectItem key={plant.id} value={plant.id}>
                              {plant.name} - {plant.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requested By *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide detailed description of the part or change request..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reasonForChange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Change</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explain the business justification for this change..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedImpact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Impact</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the expected impact on operations, quality, cost, etc..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical & Business Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Timeline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4-6 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costEstimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Estimate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $15,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="approver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approver</FormLabel>
                      <FormControl>
                        <Input placeholder="Manager or supervisor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplierInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Information</FormLabel>
                      <FormControl>
                        <Input placeholder="Supplier name or details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="technicalSpecs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Specifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Technical specifications, dimensions, materials, etc..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualityRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Quality standards, testing requirements, certifications..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complianceNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compliance Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Regulatory compliance, safety requirements, standards..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachments/References</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="File URLs, document references, drawing numbers..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInputForm;
