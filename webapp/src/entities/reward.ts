export interface RewardData {
  amount: number;
  brandName: string;
  code: string;
  description: string;
  id: string;
  image: string;
  name: string;
  status: string;
  type: string;
}

export interface RewardHistoryData {
  amount: number;
  createdAt: string;
  id: string;
  reward: RewardData;
  status: string;
}

interface BrandData {
  id: string;
  name: string;
  code: string;
  avatar: string;
}

export interface BrandRewardData {
  brand: BrandData;
  totalReward: number;
}
