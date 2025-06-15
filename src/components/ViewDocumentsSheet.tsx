import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Eye } from 'lucide-react';
import { getDocuments, createDocument, Document } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface ViewDocumentsSheetProps {
  partId?: string;
  partName?: string;
  stage?: string;
  children: React.ReactNode;
}

const ViewDocumentsSheet: React.FC<ViewDocumentsSheetProps> = ({
  partId,
  partName,
  stage,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: stage || 'General',
    file_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadDocuments();
    }
  }, [isOpen]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a document title",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await createDocument({
        title: formData.title,
        description: formData.description,
        file_url: formData.file_url,
        part_id: partId,
        document_type: formData.document_type,
        uploaded_by: 'Current User', // In real app, get from auth context
      });

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      setFormData({
        title: '',
        description: '',
        document_type: stage || 'General',
        file_url: '',
      });
      setShowUploadForm(false);
      await loadDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'drawing': return 'bg-blue-100 text-blue-800';
      case 'specification': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-orange-100 text-orange-800';
      case 'approval': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documents
          </SheetTitle>
          {partName && (
            <p className="text-sm text-slate-600">
              Part: {partName} {stage && `- ${stage}`}
            </p>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Document Library</h3>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              size="sm"
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {showUploadForm && (
            <form onSubmit={handleUpload} className="bg-slate-50 p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-title">Document Title *</Label>
                <Input
                  id="doc-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter document title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-description">Description</Label>
                <Textarea
                  id="doc-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Document description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Input
                  id="doc-type"
                  value={formData.document_type}
                  onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                  placeholder="e.g., Drawing, Specification, Report"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-url">File URL</Label>
                <Input
                  id="file-url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="Document file URL or path"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadForm(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} size="sm">
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {isLoading && documents.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Loading documents...</p>
            ) : documents.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No documents found</p>
                <p className="text-sm">Upload your first document to get started</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-slate-800">{doc.title}</h4>
                        <Badge className={getDocumentTypeColor(doc.document_type)}>
                          {doc.document_type}
                        </Badge>
                      </div>
                      {doc.description && (
                        <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                      )}
                      <div className="text-xs text-slate-500">
                        Uploaded by {doc.uploaded_by} on {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      {doc.file_url && (
                        <>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewDocumentsSheet;
