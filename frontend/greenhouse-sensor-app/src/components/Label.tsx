import styles from './Label.module.css';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;