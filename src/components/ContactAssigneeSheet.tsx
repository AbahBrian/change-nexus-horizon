
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { getContacts, Contact } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface ContactAssigneeSheetProps {
  assignee: string;
  partName?: string;
  stage?: string;
  children: React.ReactNode;
}

const ContactAssigneeSheet: React.FC<ContactAssigneeSheetProps> = ({
  assignee,
  partName,
  stage,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadContacts();
      setMessage(`Hi ${assignee},\n\nI wanted to discuss the ${stage || 'current stage'} for ${partName || 'the part'} we're working on.\n\nCould we schedule some time to review the progress?\n\nBest regards`);
    }
  }, [isOpen, assignee, partName, stage]);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const allContacts = await getContacts();
      setContacts(allContacts);

      // Try to find exact match first
      const exactMatch = allContacts.find(contact =>
        contact.name.toLowerCase() === assignee.toLowerCase()
      );

      if (exactMatch) {
        setSelectedContact(exactMatch);
      } else if (allContacts.length > 0) {
        setSelectedContact(allContacts[0]);
      } else {
        // Fallback: create contact if list is empty
        setSelectedContact({
          id: 'temp',
          name: assignee,
          email: `${assignee.toLowerCase().replace(/\s+/g, '.')}@company.com`,
          phone: 'Not available',
          department: 'Unknown',
          role: 'Team Member',
          created_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      // Fallback: create contact on error
      setSelectedContact({
        id: 'temp',
        name: assignee,
        email: `${assignee.toLowerCase().replace(/\s+/g, '.')}@company.com`,
        phone: 'Not available',
        department: 'Unknown',
        role: 'Team Member',
        created_at: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedContact) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send an email or create a notification
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedContact.name}`,
    });

    setMessage('');
    setIsOpen(false);
  };

  const handleCall = () => {
    if (selectedContact?.phone && selectedContact.phone !== 'Not available') {
      window.open(`tel:${selectedContact.phone}`);
    } else {
      toast({
        title: "Phone not available",
        description: "No phone number available for this contact",
        variant: "destructive",
      });
    }
  };

  const handleEmail = () => {
    if (selectedContact?.email) {
      const subject = encodeURIComponent(`Regarding ${partName || 'Part'} - ${stage || 'Stage'}`);
      const body = encodeURIComponent(message);
      window.open(`mailto:${selectedContact.email}?subject=${subject}&body=${body}`);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:w-[550px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Assignee
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {isLoading ? (
            <p className="text-center text-slate-500 py-4">Loading contact information...</p>
          ) : selectedContact ? (
            <>
              {/* Contact Information */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium text-slate-800 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="font-medium">{selectedContact.name}</p>
                      {selectedContact.role && (
                        <p className="text-sm text-slate-600">{selectedContact.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-600" />
                    <p className="text-sm">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <p className="text-sm">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.department && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedContact.department}</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={handleCall}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={!selectedContact.phone || selectedContact.phone === 'Not available'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  onClick={handleEmail}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>

              {/* Context Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Discussion Context</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  {partName && <p><span className="font-medium">Part:</span> {partName}</p>}
                  {stage && <p><span className="font-medium">Stage:</span> {stage}</p>}
                  <p><span className="font-medium">Assignee:</span> {assignee}</p>
                </div>
              </div>

              {/* Message Composer */}
              <div className="space-y-3">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Send Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-500 py-8">
              <User className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Contact not found</p>
              <p className="text-sm">Unable to load contact information for {assignee}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactAssigneeSheet;

// ... end of file
