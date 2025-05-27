
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import React from 'react';

interface PriceFormProps {
  warehouseId: string;
  onSubmit: (amount: number, details: string) => void;
}

export function PriceForm({ warehouseId, onSubmit }: PriceFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && details.trim()) {
      onSubmit(numAmount, details);
      setAmount("");
      setDetails("");
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">价格 (CNY)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="输入价格"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <Label htmlFor="details">详情</Label>
              <Textarea
                id="details"
                placeholder="输入运输细节，如距离、货物类型等"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div>
              <Button type="submit" className="w-full">
                提交报价
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
