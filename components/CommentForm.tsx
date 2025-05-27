import { useState } from "react";
import { WarehouseStatus } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImagePlus, VideoIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React from 'react';

interface CommentFormProps {
  warehouseId: string;
  onSubmit: (content: string, status: WarehouseStatus, files: File[]) => void;
}

export function CommentForm({ warehouseId, onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<WarehouseStatus>("normal");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      setFiles([...files, ...newFiles]);
      
      // Create previews for images
      newFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
          // For videos, just add a placeholder
          setPreviews(prev => [...prev, 'video']);
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, status, files);
      setContent("");
      setStatus("normal");
      setFiles([]);
      setPreviews([]);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">仓库状态</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as WarehouseStatus)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="选择仓库状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="busy">繁忙</SelectItem>
                  <SelectItem value="overcrowded">爆仓</SelectItem>
                  <SelectItem value="closed">已关闭</SelectItem>
                  <SelectItem value="unknown">未知</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="comment">评论</Label>
              <Textarea 
                id="comment"
                placeholder="分享当前仓库情况..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    {preview === 'video' ? (
                      <div className="aspect-square bg-secondary flex items-center justify-center rounded-md">
                        <VideoIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    ) : (
                      <img 
                        src={preview} 
                        alt={`Preview ${index}`} 
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center text-white"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    <ImagePlus className="mr-1 h-4 w-4" />
                    图片
                  </Button>
                </Label>
              </div>
              
              <div>
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label htmlFor="video-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    <VideoIcon className="mr-1 h-4 w-4" />
                    视频
                  </Button>
                </Label>
              </div>
            </div>
            
            <div>
              <Button type="submit" className="w-full">
                发布评论
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
