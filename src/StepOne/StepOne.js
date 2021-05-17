import { useEffect, useState } from "react";
import cn from "classnames";
import s from "./StepOne.module.css";
import iconPlus from "../images/icon-plus.svg";
import iconMinus from "../images/icon-minus.svg";
import { Button } from "../Buttons/Button/Button";
import { isEmpty } from "./utils/isEmpty";
import { ProgressBlock } from "../ProgressBlock/ProgressBlock";

const products = [
  {
    id: 1,
    name: "Стандарт",
    countries: 59,
    itemCost: 79,
    cost: 99,
    minItems: 20,
  },
  {
    id: 2,
    name: "Стандарт+",
    countries: 74,
    itemCost: 99,
    cost: 165,
    minItems: 15,
  },
  {
    id: 3,
    name: "Премиум",
    countries: 90,
    itemCost: 119,
    cost: 379,
    minItems: 10,
  },
];

export function StepOne({ setStep, steps, setCurrentProduct, setSlots }) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [valueInputSlots, setValueInputSlots] = useState(0);
  const [warningMinItems, setWarningMinItems] = useState(false);

  useEffect(() => {
    setWarningMinItems(
      !isEmpty(selectedProduct) && valueInputSlots < selectedProduct.minItems
    );
  }, [selectedProduct, valueInputSlots]);

  useEffect(() => {
    setSlots(valueInputSlots);
  }, [setSlots, valueInputSlots]);

  function handleInputSlotsChange(e) {
    const value = +e.target.value;

    if (isNaN(value)) {
      return;
    } 
    setValueInputSlots(value);
    if (value > 999) {
      setValueInputSlots(999);
    }
    if (value < 0) {
      setValueInputSlots(0);
    }
    
    
  }

  function handleSelectedProductClick({
    id,
    name,
    countries,
    itemCost,
    cost,
    minItems,
  }) {
    setSelectedProduct({ id, name, countries, itemCost, cost, minItems });
    setCurrentProduct({ id, name, countries, itemCost, cost, minItems });
    setValueInputSlots(minItems);
  }

  return (
    <div className={s.stepOne}>
      <div className={s.title}>{steps.one}</div>
      <div className={s.products}>
        {products.map(({ id, name, countries, itemCost, cost, minItems }) => (
          <div
            className={cn({
              [s.product]: true,
              [s.selectedProductBorder]: selectedProduct.id === id,
            })}
            key={id}
            onClick={() =>
              handleSelectedProductClick({
                id,
                name,
                countries,
                itemCost,
                cost,
                minItems,
              })
            }
          >
            <div
              className={cn({
                [s.productTitle]: true,
                [s.selectedProduct]: selectedProduct.id === id,
              })}
            >
              {name}
            </div>
            <div className={s.productParams}>
              <div>от {minItems} слотов</div>
              <div>{countries} стран ГЕО</div>
              <div>${itemCost} за слот</div>
            </div>
            <div
              className={cn({
                [s.cost]: true,
                [s.selectedProduct]: selectedProduct.id === id,
              })}
            >
              ${cost} <span>/ месяц</span>
            </div>
            <a className={s.detailsLink} href="/#">
              Подробнее
            </a>
          </div>
        ))}
      </div>
      <label className={s.labelSlots} htmlFor="slots">
        <div className={s.titleSlots}>Количество слотов</div>
        <div className={s.containerSLots}>
          <div className={s.inputWrap}>
            <input
              className={cn({
                [s.inputSlots]: true,
                [s.inputWarning]: warningMinItems,
              })}
              type="text"
              pattern="[0-9]*"
              name="slots"
              id="slots"
              value={valueInputSlots}
              onChange={handleInputSlotsChange}
            />
            <button
              className={s.btnPlus}
              type="button"
              onClick={() => setValueInputSlots((prev) => prev >= 999 ? 999 : prev + 1)}
            >
              <img src={iconPlus} alt="plus" />
            </button>
            <button
              className={s.btnMinus}
              type="button"
              onClick={() => setValueInputSlots((prev) => prev <= 0 ? 0 : prev - 1)}
            >
              <img src={iconMinus} alt="minus" />
            </button>
          </div>
          {warningMinItems && (
            <div className={s.warning}>
              Для оформления выбранного плана
              <br /> необходимо более {selectedProduct.minItems} слотов
            </div>
          )}
        </div>
      </label>
      <div className={s.bottom}>
        <div className={s.btnContinueWrap}>
          <Button
            style={{ letterSpacing: ".3px" }}
            onClick={() => setStep(steps.two)}
            disabled={warningMinItems || isEmpty(selectedProduct)}
          >
            <span>Продолжить</span>
          </Button>
        </div>
        <ProgressBlock step={1} title={steps.one} />
      </div>
    </div>
  );
}
