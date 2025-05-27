
import { Price } from "../src";
import { Avatar } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import React from 'react';

interface PriceItemProps {
  price: Price;
}

export function PriceItem({ price }: PriceItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <div className="flex h-full items-center justify-center">
              {price.userName.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">{price.userName}</p>
              <div className="text-sm text-muted-foreground">
                {formatDate(price.timestamp)}
              </div>
            </div>
            <div className="mb-2 text-xl font-semibold">
              {formatCurrency(price.amount, price.currency)}
            </div>
            <p className="text-muted-foreground">{price.details}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
