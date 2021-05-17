import { useState } from "react";
import cn from "classnames";
import s from "./StepThree.module.css";
import iconCard from "../images/card.svg";
import iconYandex from "../images/yandex.svg";
import iconQiwi from "../images/qiwi.svg";
import iconWebmoney from "../images/webmoney.svg";
import iconBitcoin from "../images/bitcoin.svg";
import { ReactComponent as IconСircle } from "../images/circle.svg";
import { Button } from "../Buttons/Button/Button";
import { ButtonBack } from "../Buttons/ButtonBack/ButtonBack";
import { ProgressBlock } from "../ProgressBlock/ProgressBlock";

const items = [
  {
    id: 1,
    value: "card",
    name: "Кредитной картой",
    logo: iconCard,
  },
  {
    id: 2,
    value: "yandex",
    name: "Яндекс.Деньги",
    logo: iconYandex,
  },
  {
    id: 3,
    value: "qiwi",
    name: "QIWI кошелек",
    logo: iconQiwi,
  },
  {
    id: 4,
    value: "webmoney",
    name: "Webmoney",
    logo: iconWebmoney,
  },
  {
    id: 5,
    value: "bitcoin",
    name: "Bitcoin",
    logo: iconBitcoin,
  },
];

export function StepThree({ steps, setStep, userBalance, setUserBalance, dataRequest }) {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState("yandex");

  function handleInputSumChange(e) {
    const value = +e.target.value;

    if (isNaN(value)) {
      return;
    } 
    setValue(value);
    if (value > 999999) {
      setValue(999999);
    }
    if (value < 0) {
      setValue(0);
    }
  }
  function handleRadioClick(e, id) {
    setChecked(e.target.value);
  }

  return (
    <div className={s.stepThree}>
      <div className={s.title}>{steps.three}</div>
      <label className={s.labelInputSum}>
        <div className={s.labelInputSumTitle}>Введите сумму</div>
        <div className={s.inputSumWrap}>
          <input
            className={s.inputSum}
            type="text"
            placeholder="Введите сумму и баланс пополнится"
            pattern="[0-9]*"
            value={value}
            onChange={handleInputSumChange}
            onBlur={() => setUserBalance((prev) => value ? prev + value : prev)}
          />
        </div>
      </label>
      <fieldset>
        <legend className={s.legend}>Способ пополнения</legend>
        <div className={s.radioGroup}>
          {items.map(({ id, value, name, logo }) => (
            <div className={s.item} key={id}>
              <label className={s.labelRadio} htmlFor={id}>
                <div className={s.inputRadioWrap}>
                  <div className={s.imgCircleWrap}>
                    <IconСircle
                      className={cn({
                        [s.imgCircle]: true,
                        [s.imgCircleChecked]: checked === value,
                      })}
                    />
                  </div>
                  <input
                    className={s.inputRadio}
                    type="radio"
                    id={id}
                    name="payMethod"
                    value={value}
                    checked={checked === value}
                    onChange={(e) => handleRadioClick(e, id)}
                  />
                </div>
                <div className={s.imageWrap}>
                  <img src={logo} alt="logo" />
                </div>
                <div className={s.labelRadioTitle}>{name}</div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <div className={s.bottom}>
        <div className={s.btnWrapper}>
          <Button
            style={{ letterSpacing: ".3px" }}
            disabled={userBalance < dataRequest.total}
            onClick={() => setStep(steps.four)}
          >
            Продолжить
          </Button>
        </div>
        <ButtonBack onClick={() => setStep(steps.two)}>
          {"<"} Вернуться назад
        </ButtonBack>
        <div className={s.progressWrapper}>
          <ProgressBlock step={3} title={steps.three} />
        </div>
      </div>
    </div>
  );
}
