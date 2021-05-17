import s from "./ProgressBlock.module.css";

export function ProgressBlock({ step, title }) {
  const number = 33 * step + 1;
  const width = number > 100 ? 100 : number;

  return (
    <div className={s.progress}>
      <div className={s.progressTop}>
        <div className={s.step}>Шаг {step}/3</div>
        <div className={s.titleStep}>{title}</div>
      </div>
      <div className={s.progressLine}>
        <div className={s.innerProgressLine} style={{width: width + '%'}}></div>
      </div>
    </div>
  );
}
