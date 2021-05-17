import s from './ButtonBack.module.css'

export function ButtonBack({children, onClick, width, height}) {
  return (
    <button style={{width: width, height: height}} className={s.button} type='button' onClick={onClick}>
      {children}
    </button>
  )
}