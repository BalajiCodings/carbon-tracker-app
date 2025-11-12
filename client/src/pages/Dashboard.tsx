import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredUser } from "@/lib/auth";
import { getStoredDevices } from "@/lib/mockData";
import { Zap, TrendingDown, Users, Leaf } from "lucide-react";

const Dashboard = () => {
  const user = getStoredUser();
  const [devices, setDevices] = useState(getStoredDevices());

  useEffect(() => {
    setDevices(getStoredDevices());
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const totalEnergyUsage = devices.reduce((sum, device) => {
    return sum + (device.wattage * device.activityTime / 1000);
  }, 0);

  const totalEmissions = devices.reduce((sum, device) => {
    const dailyKwh = device.wattage * device.activityTime / 1000;
    return sum + (dailyKwh * device.emissionFactor);
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Here's your energy overview</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
              <p className="text-xs text-muted-foreground">Active devices tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Energy</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEnergyUsage.toFixed(2)} kWh</div>
              <p className="text-xs text-muted-foreground">Estimated daily usage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Emissions</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmissions.toFixed(2)} kg</div>
              <p className="text-xs text-muted-foreground">Daily carbon footprint</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Household</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.householdMembers}</div>
              <p className="text-xs text-muted-foreground">Family members</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Devices</CardTitle>
          </CardHeader>
          <CardContent>
            {devices.length === 0 ? (
              <p className="text-muted-foreground">No devices added yet. Add your first device to start tracking!</p>
            ) : (
              <div className="space-y-4">
                {devices.slice(0, 3).map((device) => (
                  <div key={device.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{device.deviceName}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.wattage}W • {device.activityTime}h/day
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {(device.wattage * device.activityTime / 1000).toFixed(2)} kWh
                      </p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
