export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface ILeaderboardUser {
  id: number;
  first_name: string;
  last_name: string;
  hours: number;
  minutes: number;
  total_time: number;
  hours_to_add: number;
}