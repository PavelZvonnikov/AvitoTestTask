import { useState, useCallback, useMemo } from 'react';

export default (initialValue = []) => {
  let [state, setState] = useState(initialValue);
  let [slicedState, setSlicedState] = useState(initialValue);

  const callAPI = useCallback((queryStr) => {
    fetch(queryStr)
      .then(res => {
        if (res.status !== 200) {
          console.log(res.status);
          return;
        }
        return res.json()
      })
      .then(data => {
        setState(data);
        setSlicedState(data.slice(0, 10));
        return data;
      })
      .catch(err => console.log(err))
  }, []);

  return [state, callAPI, slicedState];
}
