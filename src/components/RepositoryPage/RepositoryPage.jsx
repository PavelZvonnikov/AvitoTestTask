import React, { useEffect } from 'react';
import s from './RepositoryPage.module.scss';
import background from '../../img/background.jpg';
import defaultAvatar from '../../img/avatar.jpg';
import useFetchString from '../../customHooks/useFetchString.jsx';
import useCommitDate from '../../customHooks/useCommitDate.jsx';

const API_URL = 'https://api.github.com/repos';

const RepositoryPage = (props) => {
  const { pathname } = props.location;
  const [repoInfo, setRepoInfo] = useFetchString();
  const [, setCommitInfo, latestCommits] = useFetchString();
  const [langsMap, setLangsList] = useFetchString();
  const [latestCommit, getLatestCommit] = useCommitDate();

  useEffect(() => {
    setRepoInfo(`${API_URL}${pathname}`);
    setCommitInfo(`${API_URL}${pathname}/commits`);
    setLangsList(`${API_URL}${pathname}/languages`);
  }, []);

  useEffect(() => {
    getLatestCommit(latestCommits);
  }, [latestCommits]);

  if (!repoInfo || !repoInfo.hasOwnProperty('owner') ||
    !latestCommits.length
  ) return null;

  return (
    <div className={s.wrapper}>
      <div className={s.header} style={{ backgroundImage: `url(${background})` }}>
        <div className={s.avatarWrapper}>
          {repoInfo.owner.avatar_url
            ? <img className={s.avatar} src={repoInfo.owner.avatar_url} alt='' />
            : <img className={s.avatar} src={defaultAvatar} alt='' />}
        </div>
        <div className={s.name}>{repoInfo.name}</div>
      </div>
      <div className={s.main}>
        <div className={s.description}>
          <table className={s.table}>
            <tbody className={s.tableBody}>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>Stars</th>
                <td>{repoInfo.stargazers_count}</td>
              </tr>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>Latest commit</th>
                <td>{latestCommit}</td>
              </tr>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>Owner</th>
                <td><a href={repoInfo.owner.html_url}> {repoInfo.owner.login}</a></td>
              </tr>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>Languages</th>
                <td>
                  {Object.keys(langsMap).map((item, index) => (
                    <div key={index}> {item} </div>
                  ))}
                </td>
              </tr>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>Description</th>
                <td>{repoInfo.description}</td>
              </tr>
              <tr className={s.tableRow}>
                <th className={s.tableHeaderItem}>10 most active contributors</th>
                <td>
                  {latestCommits.map((item, index) => (
                    <div key={index}>{item.author.login}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}

export default RepositoryPage;
