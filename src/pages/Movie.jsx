import {FallbackImage, Navbar} from "../components";
import React, {useState, useEffect } from 'react';
import {useParams, useNavigate, Link } from "react-router-dom";
import {useTheme} from "../contexts/ThemeContext";
import {useLoading} from "../contexts/LoadingContext";
import Spinner from "../components/Spinner";
import {Rating} from "../components";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Movie=() => {

  const {movieId}=useParams();
  const {changeTheme}=useTheme();
  const {isLoading, startLoading, stopLoading}=useLoading();
  const [movie, setMovie]=useState([]);
  const navigate=useNavigate();
  const omdbkey=process.env.REACT_APP_OMDB_API_KEY;
  const scrollToTop=() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleBackClick=() => {
    console.log('In handleBackClick'); //fix case if navigated to new browser tab
    navigate(-1);
  }

  async function getMovie (movie) {
    startLoading();
    console.log('Id in movie: ', movieId);
    try {
      const response=await axios.get(`https://www.omdbapi.com/?apikey=${omdbkey}&i=${movie || movieId}`);
      console.log('Response.data in Movie:', response.data);
      if (response.data.Response !== 'False') {
        setMovie(response.data);
      } else {
        //no movie with this id
      }
    } catch (e) {
      stopLoading();
      console.log('Error in getMovie catch: ', e);
      if (axios.isAxiosError(e)) {
        console.log('Axios Error fetching Movie data: ', e.response?.data || e.message)
      } else {
        console.log('Error fetching Movie data: ', e);
      }
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    changeTheme('lightBg'); // Set theme when component mounts
    getMovie(movieId);
  }, []);

  return (<>
    <div className = "all">
      <div className = "row nav__row">
        <Navbar/>
        <div className = "movie">
          <div className = "movie__details--top">
            <Link className = "movie__details--link" onClick = {handleBackClick}>
              <FontAwesomeIcon icon = {faArrowLeft} className = "fa-solid fa-arrow-left"/>
            </Link>
            <Link className = "movie__details--link" onClick = {handleBackClick}>
              <h2 className = "movie__details--title--top">Search Movies</h2>
            </Link>
          </div>
          <div className = "movie__featured">
            {isLoading
              ?
              <Spinner/>
              :
              <div className = "movie__details" onLoad = {(scrollToTop)}>
                <div className = "movie__poster--wrapper">
                  <FallbackImage src = {movie.Poster} alt = "movie poster image" />
                </div>
                <div className = "movie__details--description">
                  <h2 className = "movie__details--title">{movie.Title}</h2>

                    <h3 className = "movie__summary--title">Summary</h3>
                    <p className = "movie__summary--para">{movie.Plot}</p>
                    <h3 className = "movie__summary--title">Starring</h3>
                    <p className = "movie__summary--para"><span className = "text--purple">{movie.Actors}</span></p>
                    <div className="movie__summary--details">
                      <p className = "movie__sub--title">Written By</p>
                      <p className = "movie__sub--para">{movie.Writer}</p>
                    </div>
                    <div className="movie__summary--details">
                      <p className = "movie__sub--title">Director</p>
                      <p className = "movie__sub--para">{movie.Director}</p>
                    </div>
                    <div className="movie__summary--details">
                      <p className = "movie__sub--title">Awards</p>
                      <p className = "movie__sub--para">{movie.Awards}</p>
                    </div>
                    <div className="movie__summary--details">
                      <p className = "movie__sub--title">Released</p>
                      <p className = "movie__sub--para">{movie.Released}</p>
                    </div>
                    <div className = "movie__ratings" >
                      <p className = "movie__summary--title" >Ratings</p>
                      {movie.Ratings && movie.Ratings.length > 0 ? (
                        <ul>
                          {movie.Ratings.map((rating, index) => (
                            <li key={index}>
                              <Rating score = {rating.Value} source = {rating.Source}/>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className = "movie__no-ratings">No ratings available</p>
                      )}
                    </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default Movie
