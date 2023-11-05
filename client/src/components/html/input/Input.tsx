import { forwardRef, ChangeEvent, CSSProperties } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: "password" | "email" | "text" | "checkbox";
  top?: boolean;
  bottom?: boolean;
  value?: string | number;
  placeholder?: string;
  checked?: boolean;
  style?: CSSProperties;
  className?: string;
  onChange?: (element: ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (
    { type, onChange, top, bottom, value, placeholder, checked, className },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={
          `${type !== "checkbox" ? styles.input : ""} ${
            top ? styles.input__top : ""
          } ${bottom ? styles.input__bottom : ""}` +
          `${className ? className : ""}`
        }
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        checked={checked}
      />
    );
  }
);
export default Input;
