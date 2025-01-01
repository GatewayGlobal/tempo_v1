import { useState, useEffect } from "react";
import TenantSection from "@/components/dashboard/TenantSection";
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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  getTenants,
  addTenant,
  updateTenant,
  deleteTenant,
} from "@/lib/queries";
import { Tenant } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const Tenants = () => {
  const [open, setOpen] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tenants",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await addTenant({
        name: data.name,
        email: data.email,
        phone: data.phone,
        lease_start: data.leaseStart,
        lease_end: data.leaseEnd,
        rent_amount: parseInt(data.rent),
        payment_status: "pending",
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name.replace(/ /g, "")}`,
      });
      toast({
        title: "Success",
        description: "Tenant added successfully",
      });
      setOpen(false);
      reset();
      loadTenants();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tenant",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id: string, data: any) => {
    try {
      await updateTenant(id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        lease_start: data.leaseStart,
        lease_end: data.leaseEnd,
        rent_amount: parseInt(data.rent),
      });
      toast({
        title: "Success",
        description: "Tenant updated successfully",
      });
      loadTenants();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tenant",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTenant(id);
      toast({
        title: "Success",
        description: "Tenant deleted successfully",
      });
      loadTenants();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tenant",
        variant: "destructive",
      });
    }
  };

  const tenantData = {
    tenants: tenants.map((t) => ({
      id: t.id,
      name: t.name,
      email: t.email,
      phone: t.phone,
      leaseStart: t.lease_start,
      leaseEnd: t.lease_end,
      rentAmount: t.rent_amount,
      paymentStatus: t.payment_status,
      avatarUrl: t.avatar_url,
    })),
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaseStart">Lease Start Date</Label>
                  <Input
                    id="leaseStart"
                    type="date"
                    {...register("leaseStart", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaseEnd">Lease End Date</Label>
                  <Input
                    id="leaseEnd"
                    type="date"
                    {...register("leaseEnd", { required: true })}
                  />
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
              <div className="flex justify-end">
                <Button type="submit">Add Tenant</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <TenantSection {...tenantData} />
    </div>
  );
};

export default Tenants;
