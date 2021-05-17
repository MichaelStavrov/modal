import { useState } from "react";
import { Modal } from "../Modal/Modal";
import s from "./App.module.css";
import iconClose from "../images/close-icon.svg";
import { StepOne } from "../StepOne/StepOne";
import { isEmpty } from "../StepOne/utils/isEmpty";
import { Button } from "../Buttons/Button/Button";
import { StepTwo } from "../StepTwo/StepTwo";
import { getNameMonth } from "../StepTwo/utils/getNameMonth";
import { StepThree } from "../StepThree/StepThree";
import { StepFour } from "../StepFour/StepFour";

export function App() {
  const steps = {
    one: "План подписки",
    two: "Срок подписки",
    three: "Пополнение",
    four: "Готово!",
  };

  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(steps.one);
  const [currentProduct, setCurrentProduct] = useState({});
  const [slots, setSlots] = useState(0);
  const [dataRequest, setDataRequest] = useState({});
  const [userBalance, setUserBalance] = useState(750);

  const { itemCost, cost } = currentProduct;
  const subCost = cost + itemCost * slots;

  return (
    <div className={s.wrapper}>
      <button
        className={s.btnOpenModal}
        type="button"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className={s.header}>
          <div className={s.titleHeader}>Оформление подписки</div>
          <button
            className={s.btnClose}
            type="button"
            onClick={() => setOpen(false)}
          >
            <img src={iconClose} alt="close" />
          </button>
        </div>
        {step !== steps.four && (
            

        <div className={s.main}>
          <div className={s.left}>
            {step === steps.one && (
              <StepOne
                title={steps.one}
                setStep={setStep}
                steps={steps}
                setCurrentProduct={setCurrentProduct}
                setSlots={setSlots}
              />
            )}
            {step === steps.two && (
              <StepTwo
                steps={steps}
                setStep={setStep}
                subCost={subCost}
                dataRequest={dataRequest}
                setDataRequest={setDataRequest}
                setCurrentProduct={setCurrentProduct}
              />
            )}
            {step === steps.three && (
              <StepThree
                setStep={setStep}
                steps={steps}
                setUserBalance={setUserBalance}
              />
            )}
            
          </div>
          <div className={s.userRequest}>
            <div className={s.titleUserRequest}>Ваш запрос</div>
            <div className={s.selectedPlan}>
              {isEmpty(currentProduct) ? (
                <div className={s.rowTop}>
                  <div className={s.rowTitle}>План не выбран</div>
                  <div className={s.rowValue}>$0.00</div>
                </div>
              ) : (
                <div className={s.dataRequest}>
                  <div className={s.row}>
                    <div className={s.rowTop}>
                      <div className={s.rowTitle}>
                        План &#171;{currentProduct.name}&#187;
                      </div>
                      <div className={s.rowValue}>
                        ${(cost + itemCost * slots).toFixed(2)}
                      </div>
                    </div>
                    <div className={s.rowSubtitle}>{slots} слотов</div>
                  </div>
                  {!isEmpty(dataRequest) && (
                    <div className={s.dataRequest}>
                      <div className={s.row}>
                        <div className={s.rowTop}>
                          <div className={s.rowTitle}>Срок подписки</div>
                          <div className={s.rowValue}>x{dataRequest.month}</div>
                        </div>
                        <div className={s.rowSubtitle}>
                          {dataRequest.month} {getNameMonth(dataRequest.month)}
                        </div>
                      </div>
                      {dataRequest.discount !== 0 && (
                        <div className={s.row}>
                          <div className={s.rowTop}>
                            <div className={s.rowTitle}>Скидка</div>
                            <div className={s.rowValue}>
                              <span className={s.discount}>
                                -{dataRequest.discount}%
                              </span>
                            </div>
                          </div>
                          <div className={s.rowSubtitle}>на подписку</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={s.selectedTerm}></div>
            <div className={s.discount}></div>
            <div className={s.bottomUserRequest}>
              <div className={s.total}>
                <span className={s.leftTotal}>Итого:</span>
                {isEmpty(currentProduct) ? (
                  <span className={s.rightTotal}>$0.00</span>
                ) : (
                  <span className={s.rightTotal}>
                    $
                    {dataRequest.total
                      ? dataRequest.total.toFixed(2)
                      : subCost.toFixed(2)}
                  </span>
                )}
              </div>
              <div className={s.bottomContainer}>
                <div className={s.balanceContainer}>
                  <span className={s.titleBalance}>Ваш баланс:</span>
                  <span className={s.balance}>${userBalance.toFixed(2)}</span>
                </div>
                <Button
                  style={{ width: "120px", height: "42px" }}
                  disabled={
                    (dataRequest.total
                      ? userBalance < dataRequest.total
                      : true) || step === steps.one
                  }
                >
                  Запросить
                </Button>
              </div>
            </div>
          </div>
        </div>
        )}
        {step === steps.four && (
              <StepFour
                title={steps.four}
                data={dataRequest}
                product={currentProduct}
                slots={slots}
              />
            )}
      </Modal>
    </div>
  );
}
