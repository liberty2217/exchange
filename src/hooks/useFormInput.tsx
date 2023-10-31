import {useCallback, useState} from 'react';

const useFormInput = (initialValue: string, validationRegex: RegExp) => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const isValid = validationRegex.test(value);

  const handleChange = useCallback((text: string) => {
    setValue(text);
    setTouched(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    isTouched: touched,
    isValid,
  };
};

export default useFormInput;
