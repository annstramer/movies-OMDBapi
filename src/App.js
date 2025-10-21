import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {LoadingProvider} from "./contexts/LoadingContext";
import {ThemeProvider} from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";

const App=() => {
  return (
    <LoadingProvider>
      <ThemeProvider>
        <Router>
          <div className = "App">
            <Routes>
              <Route path = "/" element = {<Home/>}></Route>
              <Route path = "/movies/:terms?" element = {<Movies/>}></Route>
              <Route path = "/movie/:movieId" element = {<Movie/>}></Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </LoadingProvider>
  )
}
export default App

