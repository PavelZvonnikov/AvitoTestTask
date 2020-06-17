import { useState, useCallback } from 'react'

export default (initialValue = []) => {
  const [state, setState] = useState(initialValue)

  const callAPI = useCallback((query, currentPage) => {
    fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&sort=stars&order=desc&page=${currentPage}`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res.status);
          return;
        }
        return res.json()
      })
      .then(data => setState(data.items))
      .catch(err => console.log(err))
  }, []);

  return [state, callAPI]
}
