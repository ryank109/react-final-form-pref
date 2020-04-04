import React, { useCallback, useEffect, memo, useState } from 'react';

const style = {
  alignItems: 'center',
  display: 'flex',
  position: 'absolute',
  right: 0,
  top: 0,
};

export default memo(({ startTime }) => {
  const [endTime, setEndTime] = useState(0);
  useEffect(() => {
    setEndTime(Date.now() - startTime);
  }, [setEndTime, startTime]);

  const reset = useCallback(() => setEndTime(0));

  return (
    <div style={style}>
      <h1>Time: {endTime / 1000}s</h1>
      &nbsp;
      <button onClick={reset}>Reset Time</button>
    </div>
  );
});
