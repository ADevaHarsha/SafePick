
"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Package, Clock, ShieldCheck, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const mockOrders = [
  { id: "SP-A82F92", name: "Sarah Miller", phone: "555-0123", rack: "R-102", date: "2023-10-24", time: "09:30 AM", status: "Stored" },
  { id: "SP-B91X01", name: "David Chen", phone: "555-4422", rack: "R-205", date: "2023-10-23", time: "11:15 AM", status: "Stored" },
  { id: "SP-X33L90", name: "John Smith", phone: "555-9988", rack: "A-401", date: "2023-10-15", time: "02:45 PM", status: "Overdue" },
  { id: "SP-K12V88", name: "Maria Garcia", phone: "555-3311", rack: "C-005", date: "2023-10-24", time: "10:05 AM", status: "Collected" },
  { id: "SP-Z44P12", name: "Robert Wilson", phone: "555-2233", rack: "R-112", date: "2023-10-24", time: "12:20 PM", status: "Stored" },
  { id: "SP-M09T33", name: "Emma Thompson", phone: "555-6677", rack: "B-201", date: "2023-10-12", time: "08:15 AM", status: "Overdue" },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Stored":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20"><Package className="mr-1 h-3 w-3" /> Stored</Badge>;
      case "Collected":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"><ShieldCheck className="mr-1 h-3 w-3" /> Collected</Badge>;
      case "Overdue":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"><AlertTriangle className="mr-1 h-3 w-3" /> Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stored Orders Inventory</h1>
          <p className="text-muted-foreground">Manage and track all order statuses in the system.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search ID or Name..." 
              className="bg-white/5 pl-10 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-white/10 bg-white/5 gap-2"><Filter className="h-4 w-4" /> Filter</Button>
        </div>
      </div>

      <div className="glass-card border-white/5 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Receiver Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Rack No.</TableHead>
              <TableHead>Date Stored</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="font-mono font-bold text-primary">{order.id}</TableCell>
                <TableCell className="font-medium">{order.name}</TableCell>
                <TableCell className="text-muted-foreground">{order.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/40" />
                    {order.rack}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{order.date}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-2 w-2" /> {order.time}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-white/10">
                      <DropdownMenuItem className="focus:bg-white/10">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/10">Send SMS Reminder</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/10 text-destructive">Mark Manual Release</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
