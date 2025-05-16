import type { ChangeEvent } from 'react';
import styles from './NumberInput.module.css';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  id?: string;
  className?: string;
  placeholder?: string;
}

const NumberInput = ({ value, onChange, id, className = '', placeholder }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <input
      type="number"
      id={id}
      value={value}
      onChange={handleChange}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default NumberInput;