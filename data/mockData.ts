
import { Warehouse, Comment, Media, Price, User } from "../src";

export const currentUser: User = {
  id: "user-1",
  name: "王师傅",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
};

export const mockWarehouses: Warehouse[] = [
  {
    id: "warehouse-1",
    location: "Alabama",
    code: "BHMI",
    type: "FC",
    address: "975 Powder Plant Rd, Bessemer, AL 35022, United States"
  },
  {
    id: "warehouse-2",
    location: "Alabama",
    code: "DPX7",
    type: "",
    address: "3405 S. McQueen Rd, Chandler, AZ"
  },
  {
    id: "warehouse-3",
    location: "Alabama",
    code: "MOB5",
    type: "DC",
    address: "6735 Trippol Rd, Theodore, AL 36582, United States"
  },
  {
    id: "warehouse-4",
    location: "Alabama",
    code: "MOB9",
    type: "",
    address: "6735 Trippol Rd., Theodore, AL"
  },
  {
    id: "warehouse-5",
    location: "Alabama",
    code: "SUHB",
    type: "",
    address: "4675 Appaloosa Dr, Irondale, AL"
  },
  {
    id: "warehouse-6",
    location: "Alabama",
    code: "SUHD",
    type: "",
    address: "4675 Appaloosa Drive, Irondale, AL"
  },
  {
    id: "warehouse-7",
    location: "Arizona",
    code: "SAZ1",
    type: "FC",
    address: "3333 S 7th St, Phoenix, AZ 85040, Maricopa County"
  },
  {
    id: "warehouse-8",
    location: "Arizona",
    code: "TUS1",
    type: "Reverse Logistics",
    address: "533 W Lower Buckeye Rd, Phoenix, Arizona, 85043, Maricopa County"
  },
  {
    id: "warehouse-9",
    location: "Arizona",
    code: "TUS2",
    type: "FC",
    address: "6701 S. Kolb Rd., Tucson, AZ 85756, Pima County"
  },
  {
    id: "warehouse-10",
    location: "Arizona",
    code: "AZA4",
    type: "",
    address: "3333 S 59th Ave, Phoenix, Arizona"
  },
  {
    id: "warehouse-11",
    location: "Arizona",
    code: "AZA5",
    type: "",
    address: "6000 W Van Buren St., Phoenix, Arizona"
  },
  {
    id: "warehouse-12",
    location: "Arizona",
    code: "AZA6",
    type: "",
    address: "2150 East Riverview Drive, Phoenix, Arizona"
  }
];

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    warehouseId: "warehouse-1",
    userId: "user-2",
    userName: "李师傅",
    content: "今天这里情况正常，等待时间大约2小时",
    status: "normal",
    timestamp: new Date('2025-05-27T08:30:00')
  },
  {
    id: "comment-2",
    warehouseId: "warehouse-1",
    userId: "user-3",
    userName: "张师傅",
    content: "下午开始爆仓了，估计要等5小时以上",
    status: "overcrowded",
    timestamp: new Date('2025-05-27T14:15:00')
  },
  {
    id: "comment-3",
    warehouseId: "warehouse-7",
    userId: "user-4",
    userName: "赵师傅",
    content: "这里今天非常忙，大家最好明天再来",
    status: "busy",
    timestamp: new Date('2025-05-27T10:45:00')
  }
];

export const mockMedia: Media[] = [
  {
    id: "media-1",
    commentId: "comment-2",
    type: "image",
    url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&auto=format&fit=crop"
  },
  {
    id: "media-2",
    commentId: "comment-3",
    type: "image",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&auto=format&fit=crop"
  }
];

export const mockPrices: Price[] = [
  {
    id: "price-1",
    warehouseId: "warehouse-1",
    userId: "user-2",
    userName: "李师傅",
    amount: 2000,
    currency: "CNY",
    details: "标准货物，20公里范围内",
    timestamp: new Date('2025-05-27T09:00:00')
  },
  {
    id: "price-2",
    warehouseId: "warehouse-1",
    userId: "user-3",
    userName: "张师傅",
    amount: 2200,
    currency: "CNY",
    details: "重型货物，需要大车",
    timestamp: new Date('2025-05-27T14:30:00')
  },
  {
    id: "price-3",
    warehouseId: "warehouse-7",
    userId: "user-4",
    userName: "赵师傅",
    amount: 1800,
    currency: "CNY",
    details: "小型货物，市内配送",
    timestamp: new Date('2025-05-27T11:15:00')
  }
];

export const getCommentsByWarehouseId = (warehouseId: string): Comment[] => {
  return mockComments.filter(comment => comment.warehouseId === warehouseId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getMediaByCommentId = (commentId: string): Media[] => {
  return mockMedia.filter(media => media.commentId === commentId);
};

export const getPricesByWarehouseId = (warehouseId: string): Price[] => {
  return mockPrices.filter(price => price.warehouseId === warehouseId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
