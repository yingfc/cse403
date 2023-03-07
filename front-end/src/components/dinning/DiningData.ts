export interface DiningType {
  timeList: timeStamp[];
  buildingAbbr: string;
  diningName: string;
  diningType: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

interface timeStamp {
  day: string;
  openTime: string;
  closeTime: string;
}

export const diningData: DiningType[] = [];
