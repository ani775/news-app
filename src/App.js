import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Component, useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const c = "harry";
  const pageSize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setprogress] = useState(0)



  return (
    <>
      <div>
        <BrowserRouter>
          my new news app {c}
          <Navbar />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News setprogress={setprogress} apikey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route exact path='/business' element={<News setprogress={setprogress} apikey={apikey} key="business" pageSize={pageSize} country="in" category="business" />} />
            <Route exact path='/entertainment' element={<News setprogress={setprogress} apikey={apikey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
            <Route exact path='/health' element={<News setprogress={setprogress} apikey={apikey} key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route exact path='/science' element={<News setprogress={setprogress} apikey={apikey} key="science" pageSize={pageSize} country="in" category="science" />} />
            <Route exact path='/sports' element={<News setprogress={setprogress} apikey={apikey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
            <Route exact path='/technology' element={<News setprogress={setprogress} apikey={apikey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );

}

export default App;
