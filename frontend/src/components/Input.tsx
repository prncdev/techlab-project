import { FormHelperText, Link, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { ChangeEvent, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

type props = {
  type: HTMLInputTypeAttribute;

  label: string;

  value?: any;

  onChange?: (event: ChangeEvent) => void;

  error?: boolean;

  name?: string;
}

const Input: React.FC<props> = function ({ name, type, label, error, value, onChange }) {
  const labelSentenceCase = label.replace(label[0], label[0].toUpperCase());
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [whichType, setWhichType] = useState<string>(type);

  const handleVisibility = () => {
    if (whichType === 'password') {
      setWhichType('text');
    } else if (whichType === 'text') {
      setWhichType('password');
    }

    setIsPasswordVisible(!isPasswordVisible)
  }

  const inputProps = type === 'password' ? {
    endAdornment: isPasswordVisible ? (
      <MdOutlineVisibility
        className='cursor-pointer text-gray-500'
        size={28}
        onClick={handleVisibility}
      />
    ) : (
      <MdOutlineVisibilityOff
        className='cursor-pointer text-gray-500'
        size={28}
        onClick={handleVisibility}
      />
    )
  } : undefined;

  useEffect(() => {
    const fieldSets = document.querySelectorAll('fieldset.MuiOutlinedInput-notchedOutline');
    Array.from(fieldSets).forEach(fieldSet => {
      fieldSet.classList.add('border-2');
    })
  }, []);

  return (
    <FormControl fullWidth className='group'>
      <span className={`text-base ${error ? "text-red-500" : "text-gray-600"}`}>
        {labelSentenceCase}
      </span>

      <TextField
        type={whichType}
        inputProps={{
          className: 'py-[.875rem]',
        }}
        value={value}
        onChange={onChange}
        error={error}
        InputProps={inputProps}
        name={name}
      />

      <FormHelperText className={`flex justify-between m-0 pt-1 pl-1 ${error ? "text-red-500" : ''}`}>
        {/* {error ? `${labelSentenceCase} is required` : <span></span>} */}
        {error? <span>{labelSentenceCase} is required</span> : <span></span>}

        {type === 'password' && (
          <Link
            href="#"
            className='no-underline hover:underline'
          >
            Forget password?
          </Link>
        )}
      </FormHelperText>
    </FormControl>
  )
}

export default Input;