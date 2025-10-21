import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('lightBg');

  const themeClasses = {
    lightBg: {
      browseTitle: 'browse__title--dark',
      logoImgSrc: '/images/movies_logo_b.png',
      navLink: 'nav__link--dark link__hover-effect--dark',
      navLinkContact: 'nav__link--contact--dark',
      bentoDotColor: 'bento__dot--dark',
      browseBtn: 'search__movies--btn',
      browseBtnIcon: 'search__btn--icon',
    },
    darkBg: {
      browseTitle: 'browse__title',
      logoImgSrc: '/images/movies_logo.png',
      navLink: 'nav__link link__hover-effect',
      navLinkContact: 'nav__link--contact',
      bentoDotColor: 'bento__dot--light',
      browseBtn: 'browse__terms--btn',
      browseBtnIcon: 'browse__terms--btn-icon',
    },
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'lightBg' ? 'darkBg' : 'lightBg'));
  }

  const changeTheme = (theme) => {
    setTheme(theme);
  }

  const contextValue = {
    theme,
    themeClasses: themeClasses[theme],
    toggleTheme,
    changeTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);