import {Navbar} from "../components";
import {useNavigate, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {useTheme} from "../contexts/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


const Home=() => {
  const navigate=useNavigate();
  const [ searchTerms, setSearchTerms ]=useState('');
  const { themeClasses, changeTheme }=useTheme();

  function handleSearchChange (str) {
    if (str !== '') {
      setSearchTerms(str);
      changeTheme('darkBg');
      navigate(`/movies/${str}`)
    }
  }

  useEffect(() => {
    changeTheme('lightBg'); // Set theme when component mounts
  }, []);

  return (
    <>
      <div className = "all">
        <div className = "row nav__row">
          <Navbar />
          <div className = "browse">
            <h1 className = {themeClasses.browseTitle}>Browse Movies</h1>
            <div className = "browse__input-btn-ctrls">
              <div className = "browse__terms--wrapper">
                <input
                  className = "browse__terms"
                  type = "text"
                  onChange = {(event) => setSearchTerms(event.target.value)}
                  onKeyDown = {(event) => event.key === 'Enter' && handleSearchChange(event.target.value)}
                  placeholder = "Search by Title or Keyword"
                />
              </div>
              <button className = {themeClasses.browseBtn} onClick = {() => handleSearchChange(searchTerms)}>
                <i className = {themeClasses.browseBtnIcon} >
                <FontAwesomeIcon icon = {faMagnifyingGlass} className = "fa-solid fa-magnifying-glass"/>
                </i>
              </button>
            </div>
          </div>
          <img src = "../images/popcorn_box.png" className="home__popcorn-box"/>
        </div>
      </div>
    </>
  )
}
export default Home
