import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, Footer } from "./components";

import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useTheme } from "./components/ThemeProvider";

import {
  AboutMe,
  Admin,
  Auth,
  CreateEstate,
  Help,
  Home,
  MyEstate,
  NotFound,
  Register,
  FullEstate,
  Favorites,
  Profile,
} from "./pages";

const App = () => {
  const dispatch = useDispatch();

  const { setTheme } = useTheme();
  let theme = localStorage.getItem("features-color-theme");

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    setTheme(theme === "light" ? "light" : "dark");
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aboutMe' element={<AboutMe />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/help' element={<Help />} />
          <Route path='/my-estate' element={<MyEstate />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/user/:id' element={<Profile />} />
          <Route path='/estates/:id' element={<FullEstate />} />
          <Route path='/estates/:id/edit' element={<CreateEstate />} />
          <Route path='/create-estate' element={<CreateEstate />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
