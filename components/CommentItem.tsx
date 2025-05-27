
import { Comment, Media } from "../src";
import { StatusBadge } from "./StatusBadge";
import { Avatar } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from './figma/ImageWithFallback';
import React from 'react';

interface CommentItemProps {
  comment: Comment;
  media: Media[];
}

export function CommentItem({ comment, media }: CommentItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <div className="flex h-full items-center justify-center">
              {comment.userName.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">{comment.userName}</p>
              <div className="text-sm text-muted-foreground">
                {formatDate(comment.timestamp)}
              </div>
            </div>
            <div className="mb-2">
              <StatusBadge status={comment.status} />
            </div>
            <p className="mb-4">{comment.content}</p>
            
            {media.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {media.map((item) => (
                  <div key={item.id} className="relative aspect-square overflow-hidden rounded-md">
                    {item.type === "image" ? (
                      <ImageWithFallback 
                        src={item.url} 
                        alt={`Media by ${comment.userName}`} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <video 
                        controls 
                        className="object-cover w-full h-full"
                        src={item.url}
                      >
                        您的浏览器不支持视频标签
                      </video>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
