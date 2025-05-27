
import { WarehouseStatus } from "../src";
import { Badge } from "./ui/badge";
import React from 'react';

interface StatusBadgeProps {
  status: WarehouseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: WarehouseStatus) => {
    switch (status) {
      case "normal":
        return "bg-green-500 hover:bg-green-600";
      case "busy":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "overcrowded":
        return "bg-red-500 hover:bg-red-600";
      case "closed":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getStatusText = (status: WarehouseStatus) => {
    switch (status) {
      case "normal":
        return "正常";
      case "busy":
        return "繁忙";
      case "overcrowded":
        return "爆仓";
      case "closed":
        return "已关闭";
      default:
        return "未知";
    }
  };

  return (
    <Badge className={`${getStatusColor(status)}`}>
      {getStatusText(status)}
    </Badge>
  );
}
