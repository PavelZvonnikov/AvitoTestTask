import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';

import SearchPage from '../SearchPage/SearchPage.jsx';
import useFetch from '../../customHooks/useFetch.jsx';

function App() {
  const defaultQuery = 'stars:>10000';
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [topRepos, getTopRepos] = useFetch();
  const [reposList, getReposList] = useFetch();

  const onChange = useCallback(newValue => {
    setInputValue(newValue);
  }, []);

  const handleClick = useCallback(() => {
    if (!inputValue.length) return;
    getReposList(inputValue, 1);
    setCurrentPage(1);
  }, [currentPage, getReposList, inputValue]);

  useEffect(() => {
    getTopRepos(defaultQuery, currentPage)
  }, []);

  useEffect(() => {
    if (inputValue.length) return;
    getTopRepos(defaultQuery, currentPage)
  }, [currentPage]);

  useEffect(() => {
    if (reposList.length) {
      getReposList(inputValue, currentPage)
    }
  }, [getReposList, currentPage]);

  console.log(topRepos, 'top');
  console.log(reposList, 'list');

  return (
    <div className="App">
      <SearchPage
        inputValue={inputValue}
        currentPage={currentPage}
        changePage={setCurrentPage}
        onChange={onChange}
        handleClick={handleClick}
        topRepos={topRepos}
        reposList={reposList}
      />
    </div>
  );
}

export default App;

