import {forwardRef,ReactNode,ChangeEvent} from 'react';
import styles from './Input.module.css'

interface InputProps {
    type: string
    onChange: (element: ChangeEvent<HTMLInputElement>)=>void;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(({type,onChange}, ref) => {
    return (<input ref={ref} className={styles.input} type={type} onChange={onChange}/>)
  });
export default Input