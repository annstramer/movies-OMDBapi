import BentoDots from "./BentoDots";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar=() => {
  const [showBentoBtn, setShowBentoBtn]=useState(false);
  const [showBentoCloseBtn, setShowBentoCloseBtn]=useState(false);
  const [showBentoMenu, setShowBentoMenu]=useState(false);
  const navigate = useNavigate();
  const { themeClasses } = useTheme();
  const terms = useParams().terms;

  function showHidePhoneNav () {
    setShowBentoBtn(!showBentoBtn);
    if (showBentoBtn === true) {
      setShowBentoCloseBtn(false);
      setShowBentoMenu(false);
    } else {
      setShowBentoMenu(true);
      setShowBentoCloseBtn(true);
    }
  }

  return (<>
    <div className = "nav__bar">
      <div className = "logo__img--wrapper">
        <img src = {themeClasses.logoImgSrc} alt = "" className = "logo__img"/>
      </div>
      <div className = "nav__links">
        <Link to = "/" className = {themeClasses.navLink} >Home</Link>
        <Link to = "/movies/" className = {themeClasses.navLink} >Find Your Movie</Link>
        <Link to = "" className = {themeClasses.navLinkContact}>Contact</Link>
      </div>
      <div id = "phone__nav">
        <div className = {`bento__menu ${showBentoBtn ? 'hide__anim-out' : 'show__anim-in'}`}
             onClick = {showHidePhoneNav}>
          <BentoDots />
        </div>
        <div className = {`close__btn ${showBentoCloseBtn ? 'show' : ''}`} onClick = {showHidePhoneNav}></div>
        <div className = {`show__menu ${showBentoMenu ? ' active' : ''}`}>
          <Link to = "/" className = "phone__link">Home</Link>
          <Link to = "/movies/" className = "phone__link">Find Your Movie</Link>
          <Link to = "" className = "phone__link">Contact</Link>
        </div>
      </div>
    </div>
  </>)
}
export default Navbar
