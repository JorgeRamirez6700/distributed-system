import type { ChangeEvent } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
}

const TextInput = ({
  value,
  onChange,
  id,
  className = '',
  placeholder,
  disabled = false,
  required = false,
  ariaLabel,
}: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={handleChange}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-label={ariaLabel}
    />
  );
};

export default TextInput;