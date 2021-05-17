import cn from 'classnames'
import s from "./Button.module.css";

export function Button({ children, onClick, disabled, style }) {
  return (
    <button
    style={style}
      className={cn({
        [s.btnContinue]: true,
        [s.btnDisabled]: disabled
      })}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
