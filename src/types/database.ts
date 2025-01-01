export interface Property {
  id: string;
  name: string;
  address: string;
  status: "occupied" | "vacant" | "maintenance";
  rent_amount: number;
  created_at: string;
  image_url?: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  lease_start: string;
  lease_end: string;
  rent_amount: number;
  payment_status: "paid" | "pending" | "overdue";
  property_id: string;
  avatar_url?: string;
  created_at: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  property_id: string;
  priority: "high" | "medium" | "low";
  status: "new" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}
