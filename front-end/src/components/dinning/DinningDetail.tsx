import React from 'react';

// possibly include query time as one infomation or selectable feature for search dinning
export class DinningInfo {
  open: string[];
  close: string[];
  constructor(open: string[], close: string[]) {
    this.open = open;
    this.close = close;
  }
}

const Dinning: React.FC =  () => {
  let btn = document.getElementById("hide_dinning") as HTMLButtonElement;
  btn.addEventListener("click", () => {
    let detail = document.getElementById("dinning_detail") as HTMLElement;
    detail.style.display = "none";
  });

  let dinning: DinningInfo | null;
  // fetch dinning data and parse it as Dinning Info here

  const parseDinning = (dinning: DinningInfo) => {
    let open_display : JSX.Element[] = [];
    for (let i = 0; i < dinning.open.length; i++) {
      let building = <div>
          <p id={"dinning:" + dinning.open[i]}>{dinning.open[i]}</p>
          <button className="exhibit_dinning">Show Details</button>
        </div>
      open_display.push(building)
    }

    let close_display : JSX.Element[] =[];
    for (let i = 0; i < dinning.close.length; i++) {
      let building = <div>
          <p id={"dinning:" + dinning.close[i]}>{dinning.close[i]}</p>
          <button className="exhibit_dinning">Show Details</button>
        </div>
      close_display.push(building)
    }
    return <div>
      {open_display}
      {close_display}
    </div>
  };

  return (
    <div id="dinning_detail" style={{display: "none"}}>
      <h3>Dinning Detail</h3>
      <div>{parseDinning(dinning!)}</div>
      <button id="hide_dinning">Hide Dinning</button>
    </div>
  )
}

// fetch the dinning info from back end server
export async function getDinningInfo() {return new DinningInfo([], [])}
export default Dinning;
