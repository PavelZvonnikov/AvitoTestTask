import { useCallback, useState } from 'react';

export default latestCommits => {
  const [state, setState] = useState('');

  const latestCommit = useCallback((latestCommits) => {
    if (!latestCommits.length) return;

    const [commit] = latestCommits;
    const date = new Date(commit.commit.author.date);
    const newDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    setState(newDate);

  }, [latestCommits]);

  return [state, latestCommit]
}