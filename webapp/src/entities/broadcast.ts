export interface BroadcastData {
  id: string;
  message: string;
  amount: number;
  time: string;
  reaction: {
    [key: string]: number;
  };
  username: string;
}
