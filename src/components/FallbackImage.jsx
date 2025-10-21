import React, {useState} from 'react'

const FallbackImage=({src, alt}) => {
  const [imgSrc, setImgSrc]=useState(src);
  const [hasError, setHasError]=useState(false);
  const imgPlaceHolder = '/images/no_image.png';

  const handleImgError=() => {
    setImgSrc(imgPlaceHolder);
    setHasError(true);
  }

  return(
        <img src = {imgSrc} alt = {alt} onError = {handleImgError} className = "result__img"/>
  )
}
export default FallbackImage
