import React, { useState } from 'react'
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GenSlider=({ type, cName, minPages, currentPage, totalPages, onClick}) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSlide = (event) => {
    setSliderValue(event.target.value);
    console.log('In handleSlide event.target.value: ', event.target.value);
  };

  return (
    <div className="slider__filter--pages">
      <div className="slider__filter--slide">
        <button className="slider__filter--pagesBtn" onClick= {(event) => onClick(event.target)}>
          <FontAwesomeIcon icon = {faMinus} className = "fa-solid fa-minus"/>
        </button>
        <div>
          <input
            type= {type}
            className= {cName}
            min= {minPages}
            max= {totalPages}
            defaultValue={currentPage}
            value={sliderValue}
            onChange={handleSlide}
          />
        </div>
        <button className="slider__filter--pagesBtn" onClick= {(event) => onClick(event.target.value)}>
          <FontAwesomeIcon icon = {faPlus} className = "fa-solid fa-plus"/>
        </button>
      </div>
      <p  className="slider__filter--controls-label">page
        <span className="slider__filter--controls-page">{currentPage}</span>
        of {totalPages}</p>
    </div>
  );
}
export default GenSlider
