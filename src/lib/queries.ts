import { supabase } from "./supabase";
import { Property, Tenant, MaintenanceRequest } from "@/types/database";

// Properties
export const getProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Property[];
};

export const addProperty = async (
  property: Omit<Property, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("properties")
    .insert([property])
    .select()
    .single();

  if (error) throw error;
  return data as Property;
};

export const updateProperty = async (
  id: string,
  property: Partial<Property>,
) => {
  const { data, error } = await supabase
    .from("properties")
    .update(property)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Property;
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) throw error;
};

// Tenants
export const getTenants = async () => {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Tenant[];
};

export const addTenant = async (tenant: Omit<Tenant, "id" | "created_at">) => {
  const { data, error } = await supabase
    .from("tenants")
    .insert([tenant])
    .select()
    .single();

  if (error) throw error;
  return data as Tenant;
};

export const updateTenant = async (id: string, tenant: Partial<Tenant>) => {
  const { data, error } = await supabase
    .from("tenants")
    .update(tenant)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Tenant;
};

export const deleteTenant = async (id: string) => {
  const { error } = await supabase.from("tenants").delete().eq("id", id);

  if (error) throw error;
};

// Maintenance Requests
export const getMaintenanceRequests = async () => {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select("*, properties(name)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as (MaintenanceRequest & { properties: { name: string } })[];
};

export const addMaintenanceRequest = async (
  request: Omit<MaintenanceRequest, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .insert([request])
    .select()
    .single();

  if (error) throw error;
  return data as MaintenanceRequest;
};

export const updateMaintenanceRequest = async (
  id: string,
  request: Partial<MaintenanceRequest>,
) => {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .update(request)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as MaintenanceRequest;
};

export const deleteMaintenanceRequest = async (id: string) => {
  const { error } = await supabase
    .from("maintenance_requests")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
