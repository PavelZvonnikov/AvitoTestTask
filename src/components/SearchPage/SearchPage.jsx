import React from 'react';
import s from './SearchPage.module.scss';

import SearchForm from '../SearchForm/SearchForm.jsx';
import RepositoriesList from '../RepositoriesList/RepositoriesList.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const SearchPage = ({
  inputValue,
  onChangeValue,
  reposList,
  currentPage,
  changePage,
  pagesCount
}) => {

  return (
    <div className={s.startPage}>
      <div className={s.main}>
        <div className={s.searchWrapper}>
          <SearchForm value={inputValue} onChange={onChangeValue} />
        </div>
        <RepositoriesList reposList={reposList} />
      </div>
      <Pagination value={currentPage} onChange={changePage} end={pagesCount} />
    </div >
  )
}

export default SearchPage;
