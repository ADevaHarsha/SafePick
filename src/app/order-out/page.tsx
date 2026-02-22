
"use client";

import { useState } from "react";
import { 
  Scan, 
  Search, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Package, 
  Clock, 
  MapPin, 
  User,
  CheckCircle,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function OrderOutPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Search/Scan, 2: Details, 3: OTP, 4: Success
  const [orderId, setOrderId] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Mock data for display
  const mockOrder = {
    name: "Alex Johnson",
    phone: "******4521",
    id: "SP-8F923XA",
    rack: "R-105",
    timestamp: "Oct 24, 2023, 10:45 AM",
    description: "Medium Electronics Parcel"
  };

  const handleSearch = () => {
    if (!orderId) {
      toast({ variant: "destructive", title: "Order ID Required", description: "Please enter a valid Order ID." });
      return;
    }
    setStep(2);
  };

  const handleSendOtp = () => {
    toast({ title: "OTP Sent", description: "Verification code has been sent to the registered mobile number." });
    setStep(3);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") { // Mock verification
      setIsOtpVerified(true);
      toast({ title: "OTP Verified", description: "Identity confirmed. Order release enabled." });
    } else {
      toast({ variant: "destructive", title: "Invalid OTP", description: "The verification code is incorrect." });
    }
  };

  const handleCollected = () => {
    setStep(4);
    toast({ title: "Order Released", description: "Collection recorded successfully." });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Release Module</h1>
        <p className="text-muted-foreground">Scan or enter ID to begin the secure verification process.</p>
      </div>

      {step === 1 && (
        <div className="grid gap-6 animate-in slide-in-from-bottom-10 duration-500">
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardHeader className="text-center bg-accent/5">
              <div className="mx-auto h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-2">
                <Scan className="h-8 w-8 text-accent animate-pulse" />
              </div>
              <CardTitle>QR Scanner</CardTitle>
              <CardDescription>Point scanner to receiver's mobile screen</CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center border-y border-white/5">
              <div className="relative w-40 h-40 border-2 border-accent/30 rounded-lg flex items-center justify-center">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
                <span className="text-[10px] text-accent animate-pulse">SEARCHING...</span>
                <div className="absolute w-full h-[2px] bg-accent/50 animate-[scan_2s_infinite]" />
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">OR MANUAL INPUT</span></div>
          </div>

          <Card className="glass border-white/10">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter Order ID (e.g. SP-8F923XA)" 
                    className="bg-white/5 pl-10 border-white/10"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} className="bg-accent hover:bg-purple-600 px-8">VERIFY ID</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <Card className="glass-card animate-in zoom-in-95 duration-500">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <div>
              <CardTitle>Order Identity Details</CardTitle>
              <CardDescription>Verified order found in system</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">STORED</Badge>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground"><User className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground uppercase">Receiver</p><p className="font-semibold">{mockOrder.name}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground"><Smartphone className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground uppercase">Phone</p><p className="font-semibold">{mockOrder.phone}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground"><Package className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground uppercase">Order ID</p><p className="font-semibold text-primary">{mockOrder.id}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground"><MapPin className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground uppercase">Rack Number</p><p className="font-semibold">{mockOrder.rack}</p></div>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground"><Clock className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground uppercase">Stored At</p><p className="font-semibold">{mockOrder.timestamp}</p></div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={() => setStep(1)} variant="ghost" className="flex-1">CANCEL</Button>
              <Button onClick={handleSendOtp} className="flex-1 bg-accent hover:bg-purple-600 gap-2"><Send className="h-4 w-4" /> SEND OTP</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="glass border-accent/20 animate-in fade-in duration-500">
          <CardHeader className="text-center pb-2">
            <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-4" />
            <CardTitle>Identity Verification</CardTitle>
            <CardDescription>Enter the 4-digit code sent to {mockOrder.phone}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center gap-4">
              <Input 
                maxLength={4} 
                className="w-32 text-center text-2xl font-bold tracking-[1em] h-16 bg-white/5 border-white/20 focus:border-accent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="0000"
              />
            </div>
            <div className="flex flex-col gap-4">
              {!isOtpVerified ? (
                <Button onClick={handleVerifyOtp} className="w-full bg-accent hover:bg-purple-600">VERIFY OTP</Button>
              ) : (
                <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 text-green-500 rounded-lg border border-green-500/20">
                  <CheckCircle className="h-4 w-4" /> Verified Successfully
                </div>
              )}
              
              <Button 
                onClick={handleCollected} 
                disabled={!isOtpVerified} 
                className={`w-full font-bold h-14 ${isOtpVerified ? 'bg-primary glow-orange' : 'bg-muted opacity-50'}`}
              >
                MARK AS COLLECTED
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="glass-card text-center p-12 animate-in zoom-in duration-700 glow-orange">
          <div className="mx-auto h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Success!</h2>
          <p className="text-xl text-muted-foreground mb-8">Order has been released and collection timestamp recorded.</p>
          <div className="bg-white/5 p-6 rounded-2xl mb-8 text-left border border-white/5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <span className="text-muted-foreground">Collection ID:</span><span className="font-mono">REL-4820X-92</span>
              <span className="text-muted-foreground">Released At:</span><span>{new Date().toLocaleString()}</span>
              <span className="text-muted-foreground">Security Personnel:</span><span>Admin Portal</span>
            </div>
          </div>
          <Button onClick={() => {setStep(1); setIsOtpVerified(false); setOtp(""); setOrderId("");}} size="lg" className="bg-primary px-12 font-bold">NEXT OPERATION</Button>
        </Card>
      )}
    </div>
  );
}
