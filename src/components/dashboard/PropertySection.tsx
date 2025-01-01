import React from "react";
import PropertyCard from "./PropertyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Property {
  id: string;
  propertyName: string;
  address: string;
  occupancyStatus: "occupied" | "vacant" | "maintenance";
  rentStatus: "paid" | "pending" | "overdue";
  maintenanceAlerts: number;
  imageUrl: string;
}

interface PropertySectionProps {
  properties?: Property[];
  totalProperties?: number;
  occupiedCount?: number;
  vacantCount?: number;
  maintenanceCount?: number;
}

const PropertySection = ({
  properties = [
    {
      id: "1",
      propertyName: "123 Main Street, Apt 4B",
      address: "San Francisco, CA 94105",
      occupancyStatus: "occupied",
      rentStatus: "paid",
      maintenanceAlerts: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=350&h=175",
    },
    {
      id: "2",
      propertyName: "456 Oak Avenue, Unit 2A",
      address: "San Francisco, CA 94103",
      occupancyStatus: "vacant",
      rentStatus: "pending",
      maintenanceAlerts: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=350&h=175",
    },
    {
      id: "3",
      propertyName: "789 Pine Street, Suite 3C",
      address: "San Francisco, CA 94102",
      occupancyStatus: "maintenance",
      rentStatus: "overdue",
      maintenanceAlerts: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=350&h=175",
    },
  ],
  totalProperties = 3,
  occupiedCount = 1,
  vacantCount = 1,
  maintenanceCount = 1,
}: PropertySectionProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {occupiedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {vacantCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Under Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {maintenanceCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            propertyName={property.propertyName}
            address={property.address}
            occupancyStatus={property.occupancyStatus}
            rentStatus={property.rentStatus}
            maintenanceAlerts={property.maintenanceAlerts}
            imageUrl={property.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertySection;
