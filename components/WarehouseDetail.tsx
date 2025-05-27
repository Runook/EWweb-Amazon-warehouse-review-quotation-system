import { useState } from "react";
import { Comment, Media, Price, Warehouse, WarehouseStatus } from "../types";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { PriceForm } from "./PriceForm";
import { PriceItem } from "./PriceItem";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { currentUser } from "../data/mockData";
import { ChevronLeft } from "lucide-react";
import React from 'react';

interface WarehouseDetailProps {
  warehouse: Warehouse;
  comments: Comment[];
  media: Record<string, Media[]>;
  prices: Price[];
  onBack: () => void;
  onAddComment: (content: string, status: WarehouseStatus, files: File[]) => void;
  onAddPrice: (amount: number, details: string) => void;
}

export function WarehouseDetail({
  warehouse,
  comments,
  media,
  prices,
  onBack,
  onAddComment,
  onAddPrice
}: WarehouseDetailProps) {
  const [activeTab, setActiveTab] = useState<string>("comments");

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{warehouse.code} - {warehouse.location}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <span className="font-medium">类型:</span> {warehouse.type || "未指定"}
          </div>
          <div>
            <span className="font-medium">地址:</span> {warehouse.address}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comments" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comments">
            状态与评论 ({comments.length})
          </TabsTrigger>
          <TabsTrigger value="prices">
            报价系统 ({prices.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comments" className="mt-4">
          <CommentForm 
            warehouseId={warehouse.id} 
            onSubmit={onAddComment} 
          />
          
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  media={media[comment.id] || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              暂无评论信息，成为第一个分享仓库状态的人吧！
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="prices" className="mt-4">
          <PriceForm 
            warehouseId={warehouse.id} 
            onSubmit={onAddPrice} 
          />
          
          {prices.length > 0 ? (
            <div className="space-y-4">
              {prices.map((price) => (
                <PriceItem key={price.id} price={price} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              暂无报价信息，成为第一个提供报价的人吧！
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
