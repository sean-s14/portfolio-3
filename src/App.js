// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ProjectsPage,
  ProjectsUpdatePage,
  ArticlesPage,
  ArticleDetailPage,
  ArticleUpdatePage,

  // Site
  AboutPage,
  PoliciesPage,
  ContactPage,

  // Auth
  LoginPage,
  SettingsPage,
  PasswordChangePage,
} from 'pages/exports';
import NavigationDrawer from 'layout/navigationDrawer';
import { useAuth } from 'contexts/exports';
import { useEffect, useState } from 'react';
import LoadingScreen from 'LoadingScreen';


export default function App() {
  
  const auth = useAuth();
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect( () => {
  //   (loading === false) && (loggedIn !== null) && return 0  
  // }, [loading])

  useEffect( () => {
    // console.log("Auth:", auth);
    // console.log("Logged In:", !!auth?.tokens?.access);
    setLoggedIn(!!auth?.tokens?.access);
  }, [auth])

  useEffect( () => setLoading(false), []);

  if (loading === true || loggedIn === null) return <LoadingScreen />;

  return (
    <>
      {/* <NavigationDrawer /> */}
      <NavigationDrawer />
      <Routes>
        <Route path="/" element={<HomePage />}/>

        <Route path="projects">
          <Route path="" element={<ProjectsPage />}/>
          <Route path="edit/:slug" element={<ProjectsUpdatePage />}/>
          {/* <Route path=":slug" element={<ProjectDetailPage />}/> */}
          {/* <Route path="create" element={<ProjectCreatePage />}/> */}
        </Route>
        
        <Route path="articles">
          <Route path="" element={<ArticlesPage />}/>
          <Route path="edit/:slug" element={<ArticleUpdatePage />}/>
          <Route path=":slug" element={<ArticleDetailPage />}/>
          {/* <Route path="create" element={<ArticleCreatePage />}/> */}
        </Route>

        <Route path="about" element={<AboutPage />}/>
        <Route path="policies" element={<PoliciesPage />}/>
        <Route path="contact" element={<ContactPage />}/>

        { !loggedIn
          ? <>
              <Route path="login" element={<LoginPage />}/>
            </>
          :
            <>
              <Route path="settings" element={<SettingsPage />}/>
              <Route path="password-change" element={<PasswordChangePage />}/>
            </>
        }
        <Route path="*" element={<Navigate to="/" replace /> }/>
      </Routes>
    </>
  );
}