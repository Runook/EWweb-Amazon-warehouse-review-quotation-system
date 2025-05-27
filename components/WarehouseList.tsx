import { useState } from "react";
import { Warehouse } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search } from "lucide-react";
import React from 'react';

interface WarehouseListProps {
  warehouses: Warehouse[];
  onSelectWarehouse: (warehouse: Warehouse) => void;
}

export function WarehouseList({ warehouses, onSelectWarehouse }: WarehouseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = searchTerm === "" ||
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === null || warehouse.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(warehouses.map(warehouse => warehouse.location))];

  return (
    <Card>
      <CardHeader>
        <CardTitle>仓库列表</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索仓库代码或地址..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setLocationFilter(null)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              locationFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            全部
          </button>
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setLocationFilter(location)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                locationFilter === location
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>位置</TableHead>
                <TableHead>代码</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>地址</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWarehouses.map((warehouse) => (
                <TableRow 
                  key={warehouse.id}
                  onClick={() => onSelectWarehouse(warehouse)}
                  className="cursor-pointer hover:bg-accent"
                >
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>{warehouse.code}</TableCell>
                  <TableCell>{warehouse.type || "-"}</TableCell>
                  <TableCell className="max-w-sm truncate">{warehouse.address}</TableCell>
                </TableRow>
              ))}
              {filteredWarehouses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    没有找到匹配的仓库
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
