import React, { useMemo } from 'react';
import s from './RepositoriesList.module.scss';

const RepositoriesList = ({ topRepos, reposList }) => {
  const mappingList = useMemo(() => {
    if (!reposList.length) {
      return topRepos
    } else {
      return reposList
    }
  }, [topRepos, reposList]);
  return (
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
        {mappingList.map((item, index) => (
          <tr key={item.id} className={s.tableRow}>
            <td className={s.tableData}>
              <div className={s.avatar}>
                <img className={s.icon} src={item.owner.avatar_url} alt='' />
              </div>
              {item.name}
            </td>
            <td className={s.tableData}>{item.stargazers_count}</td>
            <td className={s.tableData}>{item.updated_at}</td>
            <td className={s.tableData}><a href={item.html_url}>Link</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RepositoriesList;