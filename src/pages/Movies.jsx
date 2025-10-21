import {useParams, useNavigate, Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {MOVIE_TYPES} from "../constants";
import {Navbar, FallbackImage, GenSelect } from "../components";
import {useTheme} from "../contexts/ThemeContext";
import {useLoading} from "../contexts/LoadingContext";
import Spinner from "../components/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const Movies=() => {
  const {terms} = useParams();
  const navigate=useNavigate();
  const [searchTerms, setSearchTerms]=useState(terms);
  const {themeClasses, changeTheme}=useTheme();
  const {isLoading, startLoading, stopLoading}=useLoading();
  const [data, setData]=useState([]);
  const [films, setFilms]=useState([]);
  const [hasMatches, setHasMatches]=useState(false);
  const [selectedType, setSelectedType]=useState('');
  const [searchResultsCaps, setSearchResultsCaps]=useState('');
  const [responseError, setResponseError]=useState('');
  const errorNoMatches = "No results match the search criteria";
  const errorTooMany = "Too many results, please narrow the search";
  const omdbkey=process.env.REACT_APP_OMDB_API_KEY;

  const handleMovieType=(e) => {
    setSelectedType(e.target.value);
    const movieType=e.target.value;
    if (movieType !== "all") {
      setFilms(data.filter(film => film.Type === movieType).slice(0, 6));
    } else {
      setFilms(data.slice(0, 6));
    }
  };

  function capitalizeWordsConvertPlus (str) {
    if (str === '') {
      setHasMatches(false);
      return '';
    }
    let withSpaces=str.replaceAll("+", " ");
    return withSpaces.toLowerCase().replace(/(^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const onSearch = (event) => {
    event.preventDefault();
    console.log('SearchTerms in onSearch: ', searchTerms);
    navigate(`/movies/${searchTerms}`);
  }

  async function getFilms (searchTerms) {
    startLoading();
    setHasMatches(true);
    setSearchResultsCaps(capitalizeWordsConvertPlus(searchTerms));
    const movieTitle=searchTerms.trim().replaceAll(" ", "+");
    try {
      setSelectedType("");
      const response=await axios.get(`https://www.omdbapi.com/?apikey=${omdbkey}&s=${movieTitle || terms}`);
      console.log("In getFilms try response: ",response.data);
      if (response.data.Response !== 'False') {
        setHasMatches(true);
        setData(response.data.Search);
        setFilms(response.data.Search.slice(0, 6));
      } else {
        setHasMatches(false);
        setSearchTerms('');
        setData([]);
        setFilms([]);
        if (response.data.Error === 'Too many results.') {
          setResponseError(errorTooMany);
        } else {
          setResponseError(errorNoMatches);
        }
      }
    } catch (e) {
      setHasMatches(false);
      stopLoading();
      setData([]);
      setFilms([]);
      setSearchTerms('');
      console.log('Error in getFilms catch: ', e);
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
    changeTheme('darkBg');// Set theme when component mounts
    console.log('In Movies useEffect terms: ', terms);
    if (terms) {
      setSearchTerms(terms);
      getFilms(terms);
    } else {
      setSearchTerms('');
      getFilms('2025');
    }
  }, [terms]);

  return (
    <>
      <div className = "all">
        <div className = "row nav__row">
          <Navbar/>
          <div className = "browse">
            <h1 className = {themeClasses.browseTitle}>Browse Movies</h1>
            <div className = "browse__terms--wrapper">
              <input
                className = "browse__terms"
                type = "text"
                value = {searchTerms}
                onChange = {(event) => setSearchTerms(event.target.value)}
                onKeyDown = {(event) => event.key === 'Enter' && onSearch(event)}
                placeholder = "Search by Title or Keyword"
              />
              <button className = "browse__terms--btn" onClick = {(event) => {onSearch (event)}} disabled = {isLoading}>
                  {isLoading ? <Spinner/> :
                    <FontAwesomeIcon icon = {faMagnifyingGlass} className = {`fa-solid fa-magnifying-glass ${themeClasses.browseBtnIcon}`}/>}
              </button>
            </div>
          </div>
          <div className = "overlay"></div>
          <div className = {`progress-bar ${isLoading ? 'indeterminate' : 'determinate'}`}>
            <div className = "progress-bar-track"></div>
            <div className = "progress-bar-fill"></div>
            <div className = "progress-bar-buffer"></div>
          </div>
        </div>
      </div>
      <section id = "search">
        <div className = "container">
          <div className = "row">
            <div className = "results__heading">
              { terms
                ?
                <h1 className = "results__title">Search Results{hasMatches ? ' For ' : ':'}<span
                  className = "text--purple">{hasMatches ? `'${searchResultsCaps}'` : ''}</span></h1>
                :
                <h1 className = "results__title">Showing All Movies</h1>
              }
              <div className = "results__filter">
                <p className = "results__filter--title">Refine Results</p>
                <div className = "results__filter--controls">
                <GenSelect
                  options = {MOVIE_TYPES}
                  label = "Select Movie Type "
                  name = "filter" onChange = {handleMovieType}
                  value = {selectedType}
                />
                </div>
              </div>
            </div>
            <div className = "results__list">
              <div className = "results">
                {
                  isLoading
                    ? new Array(6).fill(0).map((_, index) => (
                      <div className = "result" key = {index}>
                        <figure className = "result__img--skeleton">
                        </figure>
                        <p className = "result__title--skeleton"></p>
                      </div>))
                    : (films.map(({Poster, Title, imdbID}) => (
                      <>
                      <div className = "result" key = {imdbID}>
                        <Link to = {`/movie/${imdbID}`}>
                          <figure className = "result__img--wrapper">
                            <FallbackImage src= {Poster} alt = "movie poster image"/>
                          </figure>
                        </Link>
                        <Link to = {`/movie/${imdbID}`}>
                          <p className = "result__title">{Title}</p>
                        </Link>
                      </div>
                      </>
                    )))
                }
              </div>
              <div className = {`results__no-matches ${hasMatches ? '' : ' results__fail'}`}>
                {responseError}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Movies
