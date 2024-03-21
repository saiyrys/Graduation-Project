import React from "react";

import style from "./ThemeProvider.module.scss";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const StorageKey = "features-color-theme";
const supportedThemes = {
  light: "light",
  dark: "dark",
};

const ThemeContext = React.createContext(undefined);

const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.'
    );
  }

  return context;
};

const getTheme = () => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, "light");
    theme = "light";
  }
};

const Theme = (props) => {
  const [theme, setTheme] = React.useState(getTheme);

  React.useEffect(() => {
    localStorage.setItem(StorageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

Theme.Toggler = function Toggler() {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <div className={style["simpleToggler"]} onClick={handleSwitchTheme}>
      {theme === "light" ? (
        <MdOutlineDarkMode className={style["iconTheme"]} data-theme={theme} />
      ) : (
        <MdOutlineLightMode className={style["iconTheme"]} data-theme={theme} />
      )}
    </div>
  );
};

export { useTheme };
export default Theme;
