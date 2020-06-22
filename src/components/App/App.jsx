import React, { useState, useCallback, useEffect } from 'react';
import SearchPage from '../SearchPage/SearchPage.jsx';
import RepositoryPage from '../RepositoryPage/RepositoryPage.jsx'
import useFetch from '../../customHooks/useFetch.jsx';
import { BrowserRouter, Route } from "react-router-dom";

const DEFAULT_QUERY = 'stars:>10000';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reposList, getReposList, pagesCount] = useFetch();

  const onChangeValue = useCallback(newValue => {
    localStorage.setItem('currentPage', 1);
    setCurrentPage(1);
    localStorage.setItem('inputValue', newValue);
    setInputValue(newValue);
  }, []);

  const onChangePage = useCallback(newValue => {
    localStorage.setItem('currentPage', newValue);
    setCurrentPage(newValue);
  }, []);

  useEffect(() => {
    const storageValue = localStorage.getItem('inputValue');
    const storagePage = localStorage.getItem('currentPage');

    if (!storageValue || !storageValue.length) {
      setCurrentPage(1);
      getReposList(DEFAULT_QUERY, currentPage)
    } else {
      setInputValue(storageValue);
      setCurrentPage(Number(storagePage));
      getReposList(inputValue, currentPage);
    }
  }, []);

  useEffect(() => {
    if (inputValue.length) {
      getReposList(inputValue, currentPage)
    } else {
      getReposList(DEFAULT_QUERY, currentPage)
    }
  }, [currentPage, inputValue]);

  console.log(reposList, 'list');

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path='/'
          render={props => (
            <SearchPage
              inputValue={inputValue}
              currentPage={currentPage}
              changePage={onChangePage}
              onChangeValue={onChangeValue}
              reposList={reposList}
              pagesCount={pagesCount}
              {...props}
            />
          )} />
        <Route path='/:name' component={RepositoryPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;

