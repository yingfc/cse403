import React from 'react';

const DinningBtn : React.FC = () => {
  const button = document.getElementById("dinning");
  const exhibitDetail = async() => {
    // trigger dinning detail page to load data;
    let detail = document.getElementById("dinning_detail") as HTMLElement;
    detail.style.display = "block";
  }

  button?.addEventListener("click", exhibitDetail);

  return (
    <button id="dinning">Show Dinning Option</button>
    );
}

export default DinningBtn;