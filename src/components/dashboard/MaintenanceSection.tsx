import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  priority: "high" | "medium" | "low";
  status: "new" | "in_progress" | "completed";
  date: string;
  description?: string;
}

interface MaintenanceSectionProps {
  requests?: MaintenanceRequest[];
  properties?: { id: string; name: string }[];
  onEdit?: (id: string, data: any) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const MaintenanceSection = ({
  requests = [],
  properties = [],
  onEdit,
  onDelete,
  onStatusChange,
}: MaintenanceSectionProps) => {
  const [editingRequest, setEditingRequest] =
    useState<MaintenanceRequest | null>(null);
  const [deletingRequest, setDeletingRequest] =
    useState<MaintenanceRequest | null>(null);
  const { register, handleSubmit } = useForm();

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={styles[priority as keyof typeof styles]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleEdit = (data: any) => {
    if (editingRequest) {
      onEdit?.(editingRequest.id, data);
      setEditingRequest(null);
    }
  };

  const handleDelete = () => {
    if (deletingRequest) {
      onDelete?.(deletingRequest.id);
      setDeletingRequest(null);
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    onStatusChange?.(id, status);
  };

  return (
    <>
      <Card className="w-full bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Maintenance Requests</CardTitle>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] w-full rounded-md border">
            <div className="p-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="mb-4 flex items-center justify-between rounded-lg border p-4 last:mb-0"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(request.status)}
                    <div>
                      <h4 className="font-semibold">{request.title}</h4>
                      <p className="text-sm text-gray-500">
                        {request.property}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getPriorityBadge(request.priority)}
                    <Select
                      defaultValue={request.status}
                      onValueChange={(value) =>
                        handleStatusChange(request.id, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingRequest(request)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setDeletingRequest(request)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog
        open={!!editingRequest}
        onOpenChange={() => setEditingRequest(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Maintenance Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue={editingRequest?.title}
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
                  defaultValue={editingRequest?.priority}
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
                  defaultValue={editingRequest?.description}
                  {...register("description", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingRequest(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingRequest}
        onOpenChange={() => setDeletingRequest(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              maintenance request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MaintenanceSection;
