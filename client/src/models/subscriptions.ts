export interface ISubscription {
  id: number;
  name: string;
  description: string;
  minutes: number;
  price: number;
  created_at: Date;
}

export interface ISubscriptionResponse {
  status: string;
  subscriptionPlans: ISubscription[];
}