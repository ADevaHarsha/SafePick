
"use client";

import { useState } from "react";
import Image from "next/image";
import { PackagePlus, CheckCircle2, QrCode, ClipboardList, MapPin, Hash, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function OrderInPage() {
  const [formData, setFormData] = useState({
    receiverName: "",
    phoneNumber: "",
    description: "",
    location: "",
    rackNumber: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "SP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = new Date();
    setOrderId(id);
    setTimestamp(now.toLocaleString());
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-500">
        <Card className="glass border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5 text-center py-8">
            <div className="mx-auto h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-primary animate-bounce" />
            </div>
            <CardTitle className="text-3xl font-bold">Order Secured</CardTitle>
            <p className="text-muted-foreground">Notification sent to receiver via SMS</p>
          </CardHeader>
          <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Order ID</Label>
                  <p className="text-2xl font-mono font-bold text-primary">{orderId}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Storage Timestamp</Label>
                  <p className="text-lg font-medium">{timestamp}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Rack Location</Label>
                  <p className="text-lg font-medium">Zone {formData.rackNumber.charAt(0)} - Rack {formData.rackNumber}</p>
                </div>
              </div>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                Register New Order
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 glow-orange">
              <div className="relative h-48 w-48 bg-white p-2 rounded-xl mb-4">
                <Image 
                  src="https://picsum.photos/seed/qr123/400/400" 
                  alt="QR Code" 
                  width={400} 
                  height={400} 
                  className="rounded-lg"
                  data-ai-hint="qr code"
                />
              </div>
              <p className="text-sm font-bold text-center">Scan to verify pickup</p>
              <p className="text-xs text-muted-foreground">Unique identifier for this parcel</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Storage Module</h1>
        <p className="text-muted-foreground">Fill in the order details to securely store and notify the receiver.</p>
      </div>

      <Card className="glass border-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <PackagePlus className="h-5 w-5 text-primary" />
            Storage Intake Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Receiver Name
                </Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="bg-white/5 border-white/10"
                  value={formData.receiverName}
                  onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> Phone Number
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  required 
                  className="bg-white/5 border-white/10"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="desc" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary" /> Order Description
                </Label>
                <Input 
                  id="desc" 
                  placeholder="Large Brown Box / Amazon Package" 
                  required 
                  className="bg-white/5 border-white/10"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Hostel / Department
                </Label>
                <Input 
                  id="loc" 
                  placeholder="Main Hostel - Block A" 
                  required 
                  className="bg-white/5 border-white/10"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rack" className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" /> Rack Number
                </Label>
                <Input 
                  id="rack" 
                  placeholder="R-102" 
                  required 
                  className="bg-white/5 border-white/10"
                  value={formData.rackNumber}
                  onChange={(e) => setFormData({...formData, rackNumber: e.target.value})}
                />
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-primary hover:bg-orange-600 font-bold px-10 shadow-lg glow-orange"
              >
                SECURE ORDER & SEND SMS
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
