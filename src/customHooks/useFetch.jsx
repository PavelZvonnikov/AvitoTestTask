import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';

export default (initialValue = []) => {
  const [state, setState] = useState(initialValue);
  const [pagesCount, setPagesCount] = useState(10);

  const callAPI = useCallback((query, currentPage) => {
    fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&sort=stars&order=desc&page=${currentPage}`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res.status);
          return;
        }
        return res.json()
      })
      .then(data => {
        const calcCount = Math.ceil(data.total_count / 10);

        if (calcCount > 10) {
          setPagesCount(10)
        } else {
          setPagesCount(calcCount)
        }

        setState(data.items);
        return data
      })
      .catch(err => console.log(err))
  }, []);

  const fetchData = useMemo(() => debounce(callAPI, 500), []);
  return [state, fetchData, pagesCount]
}
