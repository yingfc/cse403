import React from "react";
import { useEffect, useState } from "react";
import { DiningType, getDiningData } from "./DiningData";
import DiningPage from "./DiningPage";

const DiningComponent: React.FC = () => {
  const [sideBar, setSideBar] = useState(false);
  const diningData = React.useRef<DiningType[]>([]);

  useEffect(() => {
    getDiningData()
      .then((res) => {diningData.current = res})
      .catch((err) => {alert(`Unable to retrieve dining data due to: ${err}`)})
  })

  const sideBarOnClickHandler = () => {
    setSideBar(!sideBar);
  };

  let diningPage: React.ReactElement | null = null;
  if(sideBar) {
    diningPage = <DiningPage className="sidebar" sideBar={sideBar} onClose={sideBarOnClickHandler} diningData={diningData.current}/>
  }

  return (
    <>
      <button onClick={sideBarOnClickHandler}>Show Dinning Option</button>
      {diningPage}
    </>
  )
}

export default DiningComponent;