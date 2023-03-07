import axios from "axios";

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

export async function getDiningData(): Promise<DiningType[]> {
  const response = await axios.get(
    process.env.REACT_APP_DUBMAP_SERVER + "diningplaces"
  );

  console.log(response.data.data);
  return response.data.data;
}
