import React from 'react';
import s from './SearchPage.module.scss';

import SearchForm from '../SearchForm/SearchForm.jsx';
import RepositoriesList from '../RepositoriesList/RepositoriesList.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const SearchPage = ({
  inputValue,
  onChange,
  handleClick,
  topRepos,
  reposList,
  currentPage,
  changePage
}) => {

  return (
    <div className={s.startPage}>
      <div className={s.searchWrapper}>
        <SearchForm value={inputValue} onChange={onChange} />
        <button type='button' onClick={() => { handleClick(inputValue) }} className={s.searchButton}>
          Search
        </button>
      </div>
      <RepositoriesList topRepos={topRepos} reposList={reposList} />
      <Pagination value={currentPage} onChange={changePage} />
    </div>
  )
}

export default SearchPage;
