import { useState, useEffect } from "react";
import MaintenanceSection from "@/components/dashboard/MaintenanceSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  getMaintenanceRequests,
  addMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  getProperties,
} from "@/lib/queries";
import { MaintenanceRequest, Property } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const Maintenance = () => {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [requestsData, propertiesData] = await Promise.all([
        getMaintenanceRequests(),
        getProperties(),
      ]);
      setRequests(requestsData);
      setProperties(propertiesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await addMaintenanceRequest({
        title: data.title,
        description: data.description,
        property_id: data.property,
        priority: data.priority,
        status: "new",
      });
      toast({
        title: "Success",
        description: "Maintenance request added successfully",
      });
      setOpen(false);
      reset();
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add maintenance request",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id: string, data: any) => {
    try {
      await updateMaintenanceRequest(id, {
        title: data.title,
        description: data.description,
        property_id: data.property,
        priority: data.priority,
      });
      toast({
        title: "Success",
        description: "Maintenance request updated successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update maintenance request",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMaintenanceRequest(id);
      toast({
        title: "Success",
        description: "Maintenance request deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete maintenance request",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateMaintenanceRequest(id, { status });
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const maintenanceData = {
    requests: requests.map((r) => ({
      id: r.id,
      title: r.title,
      property:
        properties.find((p) => p.id === r.property_id)?.name ||
        "Unknown Property",
      priority: r.priority,
      status: r.status,
      date: new Date(r.created_at).toLocaleDateString(),
      description: r.description,
    })),
    properties: properties.map((p) => ({
      id: p.id,
      name: p.name,
    })),
    onEdit: handleEdit,
    onDelete: handleDelete,
    onStatusChange: handleStatusChange,
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Maintenance Requests
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Leaking Faucet"
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select
                    onValueChange={(value) =>
                      register("property").onChange({ target: { value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    onValueChange={(value) =>
                      register("priority").onChange({ target: { value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the maintenance issue..."
                    {...register("description", { required: true })}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create Request</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <MaintenanceSection {...maintenanceData} />
    </div>
  );
};

export default Maintenance;
