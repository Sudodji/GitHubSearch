import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Input from './components/Input/Input';
import RepoPage from './components/RepoPage/RepoPage';
import Favorites from './components/Favorites/Favorites';
import CopyButton from './components/CopyButton/CopyButton';

const App = () => {
  return (
    <>
      <h1>GitHub Repos</h1>
      <Routes>
        <Route path="/GitHubSearch" element={
          <div className="container"> 
            <Input />
            <CopyButton textToCopy='Just text'/>
            <Favorites />
          </div>
        }/>
        <Route path="/GitHubSearch/repositories/*" element={<RepoPage />} />
      </Routes>
    </>
  );
}

export default App;
