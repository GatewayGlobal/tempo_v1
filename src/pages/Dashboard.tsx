import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceSection from "@/components/dashboard/MaintenanceSection";
import { Building2, Users, Home } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getProperties,
  getTenants,
  getMaintenanceRequests,
} from "@/lib/queries";
import { useToast } from "@/components/ui/use-toast";
import { Property, MaintenanceRequest } from "@/types/database";

const Dashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [propertiesData, tenantsData, maintenanceData] = await Promise.all([
        getProperties(),
        getTenants(),
        getMaintenanceRequests(),
      ]);
      setProperties(propertiesData);
      setTenants(tenantsData);
      setMaintenanceRequests(maintenanceData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    }
  };

  const occupiedProperties = properties.filter(
    (p) => p.status === "occupied",
  ).length;
  const occupancyRate =
    properties.length > 0
      ? Math.round((occupiedProperties / properties.length) * 100)
      : 0;

  // Mock data for rent collection chart
  const rentCollectionData = [
    { month: "Jan", collected: 45000, target: 50000 },
    { month: "Feb", collected: 48000, target: 50000 },
    { month: "Mar", collected: 50000, target: 50000 },
    { month: "Apr", collected: 47000, target: 50000 },
    { month: "May", collected: 49000, target: 50000 },
    { month: "Jun", collected: 50000, target: 50000 },
  ];

  const StatCard = ({ title, value, icon: Icon, description }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );

  const maintenanceData = {
    requests: maintenanceRequests.map((r) => ({
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
  };

  return (
    <div className="p-8">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Properties"
            value={properties.length}
            icon={Building2}
          />
          <StatCard title="Total Tenants" value={tenants.length} icon={Users} />
          <StatCard
            title="Property Occupancy"
            value={`${occupancyRate}%`}
            icon={Home}
            description={`${occupiedProperties} out of ${properties.length} properties occupied`}
          />
        </div>

        {/* Rent Collection Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Rent Collection Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rentCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="collected" fill="#0ea5e9" name="Collected" />
                  <Bar dataKey="target" fill="#e2e8f0" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Section */}
        <MaintenanceSection {...maintenanceData} />
      </div>
    </div>
  );
};

export default Dashboard;
