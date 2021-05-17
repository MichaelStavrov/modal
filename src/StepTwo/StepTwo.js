import { useEffect, useState } from "react";
import cn from "classnames";
import s from "./StepTwo.module.css";
import iconVector from "../images/icon-vector.svg";
import { getNameMonth } from "./utils/getNameMonth";
import { Button } from "../Buttons/Button/Button";
import { ButtonBack } from "../Buttons/ButtonBack/ButtonBack";
import { ProgressBlock } from "../ProgressBlock/ProgressBlock";
import { isEmpty } from "../StepOne/utils/isEmpty";

const terms = [
  { id: 1, month: 1, discount: 0 },
  { id: 2, month: 2, discount: 10 },
  { id: 3, month: 3, discount: 20 },
  { id: 4, month: 4, discount: 30 },
];

export function StepTwo({
  steps,
  subCost,
  setStep,
  setDataRequest,
  dataRequest,
  setCurrentProduct,
}) {
  const [inFocus, setInfocus] = useState(false);
  const [value, setValue] = useState("");
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [activeTerms, setActiveTerms] = useState([])

  if (activeTerms.length === 0) {
    setActiveTerms(terms)
  }




  useEffect(() => {
    if (value.length < 6) {
      setCurrentDiscount(0);
    }
  }, [value]);

  useEffect(() => {
    if (!isEmpty(dataRequest)) {
      setDisabled(false);
    }
  }, [dataRequest]);

  function handleInputTermChange(e) {
    const value = e.target.value
    setValue(value);
    const activeItem = terms.find(term => term.month !== +value) 
    setActiveTerms([...activeTerms, activeItem]);
    setActiveTerms(activeTerms.filter(term => term.month === +value));
  }

  function handleMouseDownClick(month, discount) {
    const total = Math.round(
      subCost * month - (subCost * month * discount) / 100
    );
    const totalValue = `${month} ${getNameMonth(month)} - $${total}`;
    setValue(totalValue);
    setCurrentDiscount(discount);
    setDataRequest({ month, discount, total });
  }

  function handleBtnBackClick() {
    setStep(steps.one);
    setDataRequest({});
    setCurrentProduct({});
  }

  return (
    <div className={s.stepTwo}>
      <div className={s.title}>{steps.two}</div>
      <div className={s.datalist}>
        <div
          className={s.inputWrapper}
          style={{ pointerEvents: inFocus ? "none" : "all" }}
        >
          <label className={s.label} htmlFor="term">
            <input
              className={s.inputTerm}
              style={{
                width: value.length < 6 ? "150px" : value.length * 8 + "px",
              }}
              type="text"
              name="term"
              id="term"
              placeholder="1 месяц"
              autoComplete="off"
              value={value}
              onChange={handleInputTermChange}
              onFocus={() => setInfocus(true)}
              onBlur={() => setInfocus(false)}
            />
            {currentDiscount !== 0 && (
              <div className={s.discount}>{`-${currentDiscount}%`}</div>
            )}
            <div
              className={cn({
                [s.iconVectorWrapper]: true,
                [s.iconVectorWrapperRotate]: inFocus,
              })}
            >
              <img className={s.iconVector} src={iconVector} alt="vector" />
            </div>
          </label>
        </div>
        {inFocus && (
          <ul className={s.listTerms}>
            {activeTerms.map(({ id, month, discount }) => (
              <li
                className={s.itemTerms}
                key={id}
                onMouseDown={() => handleMouseDownClick(month, discount)}
              >
                <span>{`${month} ${getNameMonth(month)} - ${Math.round(
                  subCost * month - (subCost * month * discount) / 100
                )}$`}</span>
                {discount !== 0 && (
                  <span className={s.discount}>{`-${discount}%`}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.bottom}>
        <div className={s.btnWrapper}>
          <Button
            style={{ letterSpacing: ".3px" }}
            disabled={disabled}
            onClick={() => setStep(steps.three)}
          >
            Продолжить
          </Button>
        </div>
        <ButtonBack onClick={handleBtnBackClick}>
          {"<"} Вернуться назад
        </ButtonBack>
        <div className={s.progressWrapper}>
          <ProgressBlock step={2} title={steps.two} />
        </div>
      </div>
    </div>
  );
}
