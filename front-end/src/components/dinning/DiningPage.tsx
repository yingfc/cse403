import { useState } from "react";
import { BuildingInfo } from "..";
import { navigate } from "../building_info/BuildingGenerator";
import { DiningType } from "./DiningData";

interface DiningPageProps {
  className: string;
  sideBar: boolean;
  onClose: any;
  diningData: DiningType[]
}

const DiningPage: React.FC<DiningPageProps> = (props) => {

  const [sideBarClass, setSideBarClass] = useState(props.className);

  const handleClose = () => {
    setSideBarClass("sidebar close");
    setTimeout(() => {
      props.onClose()
    }, 1000);
  }

  const renderDinings = () => {
    const openDining = props.diningData.filter(dining => dining.isOpen === true);
    return openDining.map((dining) => {
      let currentBuildingInfo: BuildingInfo = {
        buildingAbbr: dining.buildingAbbr,
        buildingFullName: dining.diningName,
        latitude: dining.latitude,
        longitude: dining.longitude
      }
      return (
        <div className="dining-option">
          <div>Dining Abbr: {dining.buildingAbbr}</div>
          <div>Dining Name: {dining.diningName}</div>
          <div>Dining Type: {dining.diningType}</div>
          <button className="dining-button" onClick={() => navigate(currentBuildingInfo)}>Navigate</button>
        </div>
      )
    });
  }

  const diningElements = renderDinings();



  return (
    <>
      <div className={sideBarClass}>
        <button className="close-button" onClick={handleClose}>&times; close</button>
        <h1>Opening Dinings</h1>
        {diningElements}
      </div>
    </>
  )
}

export default DiningPage;