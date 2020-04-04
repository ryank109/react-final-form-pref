import React, { useCallback, useMemo, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Timer from './Timer';

const onEnter = callback => ({ key }) => {
  if (key === 'Enter') {
    callback();
  }
};

const fromEvent = callback => ({ target: { value } }) => callback(value);

const range = n => [...Array(n).keys()];

const noop = () => {};

const emptySubscription = {};
const valueSubscription = { value: true };

export default () => {
  const [startTime, setStartTime] = useState(Date.now());
  const [inputValue, setInputValue] = useState(2500);
  const [numOfFields, setNumOfFields] = useState(inputValue);
  const fields = useMemo(() => range(numOfFields), [numOfFields]);

  const commitHandler = useCallback(() => {
    inputValue !== '' && setNumOfFields(parseInt(inputValue, 10));
    setStartTime(Date.now());
  }, [inputValue]);

  const inputChangeHandler = useCallback(fromEvent(setInputValue), [setInputValue]);
  const enterKeyHandler = useCallback(onEnter(commitHandler), [commitHandler, setStartTime]);

  return (
    <div>
      <p>
        <label>
          Number of Fields:&nbsp;
          <input onChange={inputChangeHandler} onKeyPress={enterKeyHandler} value={inputValue} />
        </label>
        <button onClick={commitHandler}>Update</button>
      </p>
      <Form onSubmit={noop} subscription={emptySubscription}>
        {() =>
          fields.map(index => (
            <Field key={index} name={`field_${index}`} subscription={valueSubscription}>
              {({ input }) => (
                <label>
                  Field {index + 1}:&nbsp;
                  <input {...input} />
                </label>
              )}
            </Field>
          ))
        }
      </Form>
      <Timer startTime={startTime} />
    </div>
  );
};
