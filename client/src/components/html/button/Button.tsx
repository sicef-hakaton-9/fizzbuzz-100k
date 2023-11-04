import { forwardRef,MouseEvent } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  text: string;
  onClick: (e:MouseEvent<HTMLButtonElement>)=>void
}

type Ref = HTMLButtonElement

const Button = forwardRef<Ref,ButtonProps>(({text,onClick},ref)=>{
  return(
    <button ref={ref} className={styles.btn} onClick={onClick}>{text}</button>
  )
}) 
export default Button