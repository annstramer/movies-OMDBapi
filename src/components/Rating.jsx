import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";

export default function Rating ({ score, source }) {
  const extractScore = score.split('/') || score.trim('%');
  let rating = (extractScore.length > 1 ) ? (parseFloat(extractScore[0])) : (parseFloat(extractScore[0])/10);
  let fillStars = (!Number.isInteger(rating)) ? 9-Math.floor(rating) : 10-Math.floor(rating);

  if (extractScore.length === 2 && extractScore[1] === '100') {
    rating = parseFloat(extractScore[0]) / 10;
    fillStars = (!Number.isInteger(rating)) ? (9-Math.floor(rating)) : (10-Math.floor(rating));
  }



  return (
    <>
        <p className = "movie__sub--para">{source} : {score}</p>
        <div className = "movie__ratings--stars" >
        {new Array(Math.floor(rating)).fill(0).map((_, index) => (
          <FontAwesomeIcon icon = {faStar} key = {index} className = "fa-solid fa-star rating__icon"/>
        ))}
        {!Number.isInteger(rating) && (
          <FontAwesomeIcon icon = {faStarHalfStroke} className = "fa-solid fa-star-half-stroke rating__icon"/>
        )}
        {new Array(fillStars).fill(0).map((_, index) => (
          <FontAwesomeIcon icon = {faStar} key = {index} className = "fa-solid fa-star rating__icon--disabled"/>
        ))}
      </div>

    </>
  );
}