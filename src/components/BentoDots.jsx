import {useTheme} from "../contexts/ThemeContext";

const BentoDots = () => {
  const { themeClasses } = useTheme();

  return (
    <>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    <div className= {themeClasses.bentoDotColor}></div>
    </>
  )
}
export default BentoDots
