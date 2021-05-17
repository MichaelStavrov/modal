import s from "./Modal.module.css";
import cn from "classnames";

export function Modal({ open, setOpen, children }) {
  return (
    <div
      className={cn({
        [s.modal]: true,
        [s.modalActive]: open,
      })}
      onClick={() => setOpen(false)}
    >
      <div
        className={cn({
          [s.modalWindow]: true,
          [s.modalWindowActive]: open,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
