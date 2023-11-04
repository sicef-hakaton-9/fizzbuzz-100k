export interface IParkingLot {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
  total_spaces: number;
  free_spaces: number;
  created_at: Date;
  updated_at: Date;
}

export interface IParkingLotResponse {
  status: string;
  parkingLots: IParkingLot[];
}