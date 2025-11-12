import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getStoredUser } from "@/lib/auth";
import { getStoredDevices, setStoredDevices, type Device } from "@/lib/mockData";
import { Plus, Trash2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Devices = () => {
  const user = getStoredUser();
  const [devices, setDevices] = useState<Device[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    deviceName: "",
    wattage: "",
    activityTime: "",
    emissionFactor: "0.5"
  });

  useEffect(() => {
    setDevices(getStoredDevices());
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDevice: Device = {
      id: Date.now().toString(),
      deviceName: formData.deviceName,
      wattage: parseFloat(formData.wattage),
      activityTime: parseFloat(formData.activityTime),
      emissionFactor: parseFloat(formData.emissionFactor),
      createdAt: new Date()
    };

    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    setStoredDevices(updatedDevices);
    
    setFormData({
      deviceName: "",
      wattage: "",
      activityTime: "",
      emissionFactor: "0.5"
    });
    
    setIsOpen(false);
    toast({
      title: "Device Added",
      description: `${newDevice.deviceName} has been added to your devices.`
    });
  };

  const handleDelete = (id: string) => {
    const updatedDevices = devices.filter(d => d.id !== id);
    setDevices(updatedDevices);
    setStoredDevices(updatedDevices);
    toast({
      title: "Device Removed",
      description: "Device has been removed from your list."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Devices</h1>
            <p className="text-muted-foreground">Manage your household devices and track their energy usage</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">Device Name</Label>
                  <Input
                    id="deviceName"
                    placeholder="e.g., Refrigerator"
                    value={formData.deviceName}
                    onChange={(e) => setFormData({...formData, deviceName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wattage">Power (Watts)</Label>
                  <Input
                    id="wattage"
                    type="number"
                    min="1"
                    placeholder="150"
                    value={formData.wattage}
                    onChange={(e) => setFormData({...formData, wattage: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityTime">Daily Usage (Hours)</Label>
                  <Input
                    id="activityTime"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="24"
                    value={formData.activityTime}
                    onChange={(e) => setFormData({...formData, activityTime: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emissionFactor">Emission Factor (kg CO₂/kWh)</Label>
                  <Input
                    id="emissionFactor"
                    type="number"
                    step="0.01"
                    placeholder="0.5"
                    value={formData.emissionFactor}
                    onChange={(e) => setFormData({...formData, emissionFactor: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Add Device</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {devices.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No devices added yet</p>
              <Button onClick={() => setIsOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Device
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => {
              const dailyKwh = device.wattage * device.activityTime / 1000;
              const dailyEmissions = dailyKwh * device.emissionFactor;
              
              return (
                <Card key={device.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{device.deviceName}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(device.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Power:</span>
                      <span className="font-medium">{device.wattage}W</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Daily Usage:</span>
                      <span className="font-medium">{device.activityTime}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Energy/Day:</span>
                      <span className="font-medium text-primary">{dailyKwh.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CO₂/Day:</span>
                      <span className="font-medium text-accent">{dailyEmissions.toFixed(2)} kg</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Devices;
