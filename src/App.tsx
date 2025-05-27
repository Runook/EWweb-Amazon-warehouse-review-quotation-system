import React from 'react';
import { useState } from "react";
import { Comment, Media, Price, Warehouse, WarehouseStatus } from "../types";
import { WarehouseDetail } from "../components/WarehouseDetail";
import { WarehouseList } from "../components/WarehouseList";
import { currentUser, getCommentsByWarehouseId, getMediaByCommentId, getPricesByWarehouseId, mockWarehouses } from "../data/mockData";

export default function App() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [warehouses] = useState<Warehouse[]>(mockWarehouses);
  const [comments, setComments] = useState<Comment[]>([]);
  const [media, setMedia] = useState<Record<string, Media[]>>({});
  const [prices, setPrices] = useState<Price[]>([]);

  const handleSelectWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    const warehouseComments = getCommentsByWarehouseId(warehouse.id);
    setComments(warehouseComments);
    
    // Get media for all comments
    const mediaByCommentId: Record<string, Media[]> = {};
    warehouseComments.forEach(comment => {
      mediaByCommentId[comment.id] = getMediaByCommentId(comment.id);
    });
    setMedia(mediaByCommentId);
    
    // Get prices
    setPrices(getPricesByWarehouseId(warehouse.id));
  };

  const handleAddComment = (content: string, status: WarehouseStatus, files: File[]) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      warehouseId: selectedWarehouse!.id,
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      status,
      timestamp: new Date()
    };
    
    setComments([newComment, ...comments]);
    
    // Mock media upload
    if (files.length > 0) {
      const newMedia: Media[] = files.map((file, index) => ({
        id: `media-${Date.now()}-${index}`,
        commentId: newComment.id,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        // Create fake URLs for demo
        url: file.type.startsWith('image/') 
          ? `https://images.unsplash.com/photo-${1580000000000 + Math.floor(Math.random() * 10000000)}` 
          : `https://example.com/video-${Date.now()}.mp4`,
        thumbnail: file.type.startsWith('image/') 
          ? `https://images.unsplash.com/photo-${1580000000000 + Math.floor(Math.random() * 10000000)}?w=200` 
          : undefined
      }));
      
      setMedia({
        ...media,
        [newComment.id]: newMedia
      });
    }
  };

  const handleAddPrice = (amount: number, details: string) => {
    const newPrice: Price = {
      id: `price-${Date.now()}`,
      warehouseId: selectedWarehouse!.id,
      userId: currentUser.id,
      userName: currentUser.name,
      amount,
      currency: "USD",
      details,
      timestamp: new Date()
    };
    
    setPrices([newPrice, ...prices]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-primary-foreground">司机仓库信息共享平台</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {selectedWarehouse ? (
          <WarehouseDetail
            warehouse={selectedWarehouse}
            comments={comments}
            media={media}
            prices={prices}
            onBack={() => setSelectedWarehouse(null)}
            onAddComment={handleAddComment}
            onAddPrice={handleAddPrice}
          />
        ) : (
          <WarehouseList
            warehouses={warehouses}
            onSelectWarehouse={handleSelectWarehouse}
          />
        )}
      </main>
    </div>
  );
}
