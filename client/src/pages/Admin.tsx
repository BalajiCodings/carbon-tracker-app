import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getStoredUser } from "@/lib/auth";
import { getStoredResources, setStoredResources, type AwarenessResource } from "@/lib/mockData";
import { Plus, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const user = getStoredUser();
  const [resources, setResources] = useState<AwarenessResource[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    type: "article" as "video" | "article" | "document",
    url: "#",
    category: "",
    description: ""
  });

  useEffect(() => {
    setResources(getStoredResources());
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResource: AwarenessResource = {
      id: Date.now().toString(),
      ...formData
    };

    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    setStoredResources(updatedResources);
    
    setFormData({
      title: "",
      type: "article",
      url: "#",
      category: "",
      description: ""
    });
    
    setIsOpen(false);
    toast({
      title: "Resource Added",
      description: `${newResource.title} has been added to the library.`
    });
  };

  const handleDelete = (id: string) => {
    const updatedResources = resources.filter(r => r.id !== id);
    setResources(updatedResources);
    setStoredResources(updatedResources);
    toast({
      title: "Resource Removed",
      description: "Resource has been removed from the library."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <p className="text-muted-foreground">Manage awareness resources</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Resource title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Energy Efficiency"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://..."
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the resource"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">Add Resource</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span className="capitalize">{resource.type}</span>
                      <span>•</span>
                      <span>{resource.category}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {resources.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">No resources added yet</p>
              <Button onClick={() => setIsOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Resource
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Admin;
