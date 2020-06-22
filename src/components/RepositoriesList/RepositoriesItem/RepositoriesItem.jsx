import React, { useEffect } from 'react';
import s from './RepositoriesItem.module.scss';
import { Link } from "react-router-dom";
import useFetchString from '../../../customHooks/useFetchString.jsx';
import useCommitDate from '../../../customHooks/useCommitDate.jsx';

const API_URL = 'https://api.github.com/repos';

const RepositoriesItem = ({ item }) => {
  const [, setCommitInfo, latestCommits] = useFetchString();
  const [latestCommit, getLatestCommit] = useCommitDate();

  useEffect(() => {
    setCommitInfo(`${API_URL}/${item.full_name}/commits`);
  }, []);

  useEffect(() => {
    getLatestCommit(latestCommits);
  }, [latestCommits]);

  return (
    <tr className={s.tableRow}>
      <td className={s.tableData}>
        <div className={s.avatar}>
          <img className={s.icon} src={item.owner.avatar_url} alt='' />
        </div>
        <Link to={`${item.full_name}`}>{item.name}</Link>
      </td>
      <td className={s.tableData}>{item.stargazers_count}</td>
      <td className={s.tableData}>{latestCommit}</td>
      <td className={s.tableData}><a href={item.html_url}>Link</a></td>
    </tr>
  )
}

export default RepositoriesItem;
