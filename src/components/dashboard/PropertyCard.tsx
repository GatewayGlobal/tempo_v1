import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Home,
  AlertCircle,
  DollarSign,
  Edit,
  Mail,
  Wrench,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PropertyCardProps {
  id: string;
  propertyName?: string;
  address?: string;
  occupancyStatus?: "occupied" | "vacant" | "maintenance";
  rentStatus?: "paid" | "pending" | "overdue";
  maintenanceAlerts?: number;
  imageUrl?: string;
  rentAmount?: number;
  onEdit?: (id: string, data: any) => void;
  onDelete?: (id: string) => void;
}

const PropertyCard = ({
  id,
  propertyName = "123 Main Street, Apt 4B",
  address = "San Francisco, CA 94105",
  occupancyStatus = "occupied",
  rentStatus = "paid",
  maintenanceAlerts = 2,
  imageUrl = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=350&h=175",
  rentAmount = 2500,
  onEdit,
  onDelete,
}: PropertyCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: propertyName,
      address: address,
      status: occupancyStatus,
      rent: rentAmount,
    },
  });

  const getOccupancyBadge = () => {
    const styles = {
      occupied: "bg-green-100 text-green-800",
      vacant: "bg-yellow-100 text-yellow-800",
      maintenance: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={styles[occupancyStatus]}>
        {occupancyStatus.charAt(0).toUpperCase() + occupancyStatus.slice(1)}
      </Badge>
    );
  };

  const getRentBadge = () => {
    const styles = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={styles[rentStatus]}>
        Rent: {rentStatus.charAt(0).toUpperCase() + rentStatus.slice(1)}
      </Badge>
    );
  };

  const handleEdit = (data: any) => {
    onEdit?.(id, data);
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="w-[350px] bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="relative h-[175px] w-full">
            <img
              src={imageUrl}
              alt={propertyName}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {getOccupancyBadge()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{propertyName}</h3>
                <p className="text-sm text-gray-500">{address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {getRentBadge()}
              {maintenanceAlerts > 0 && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {maintenanceAlerts} Alerts
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Property</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contact Tenant</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Wrench className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Maintenance Request</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Property</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  placeholder="123 Main Street, Apt 4B"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="San Francisco, CA 94105"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    register("status").onChange({ target: { value } })
                  }
                  defaultValue={occupancyStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rent">Monthly Rent</Label>
                <Input
                  id="rent"
                  type="number"
                  placeholder="2500"
                  {...register("rent", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and remove all associated data.
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

export default PropertyCard;
