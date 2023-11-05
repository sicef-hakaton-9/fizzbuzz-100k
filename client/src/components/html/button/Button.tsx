import { forwardRef, MouseEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  revert?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  ({ text, onClick, revert }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.btn} ${revert ? styles.btn__revert : ""}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
);
export default Button;
