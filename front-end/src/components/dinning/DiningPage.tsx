import { useState } from "react";
import { DiningType } from "./DiningData";

interface DiningPageProps {
  className: string;
  sideBar: boolean;
  diningData: DiningType[]
}

const DiningPage: React.FC<DiningPageProps> = (props) => {

  const [isOpen, setIsOpen] = useState(props.sideBar);

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={props.className}>
        <button onClick={handleClose}>&times; close</button>
      </div>
    </>
  )
}

export default DiningPage;