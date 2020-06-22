import React from 'react';
import s from './RepositoriesList.module.scss';
import RepositoriesItem from './RepositoriesItem/RepositoriesItem.jsx';

const RepositoriesList = ({ reposList }) => (
  <table className={s.table}>
    <thead className={s.tableHeader}>
      <tr className={s.tableRow}>
        <th className={s.tableHeaderItem}>Name</th>
        <th className={s.tableHeaderItem}>Stars</th>
        <th className={s.tableHeaderItem}>Latest commit</th>
        <th className={s.tableHeaderItem}>Link</th>
      </tr>
    </thead>
    <tbody className={s.tableBody}>
      {reposList.map((item) => (
        <RepositoriesItem key={item.id} item={item} />
      ))}
    </tbody>
  </table>
)

export default RepositoriesList;