import { isEmpty } from "../StepOne/utils/isEmpty";
import { getNameMonth } from "../StepTwo/utils/getNameMonth";
import s from "./StepFour.module.css";

export function StepFour({ title, data, product, slots }) {
  const { month, discount, total, subCost } = data;
  const { cost, itemCost, name } = product;
  return (
    <div className={s.stepFour}>
      <div className={s.content}>
        <div className={s.title}>{title}</div>
        <div className={s.dataRequest}>
          <div className={s.row}>
            <div className={s.rowTop}>
              <div className={s.rowTitle}>План &#171;{name}&#187;</div>
              <div className={s.rowValue}>
                ${(cost + itemCost * slots).toFixed(2)}
              </div>
            </div>
            <div className={s.rowSubtitle}>{slots} слотов</div>
          </div>
          {!isEmpty(data) && (
            <div className={s.dataRequest}>
              <div className={s.row}>
                <div className={s.rowTop}>
                  <div className={s.rowTitle}>Срок подписки</div>
                  <div className={s.rowValue}>x{month}</div>
                </div>
                <div className={s.rowSubtitle}>
                  {month} {getNameMonth(month)}
                </div>
              </div>
              {discount !== 0 && (
                <div className={s.row}>
                  <div className={s.rowTop}>
                    <div className={s.rowTitle}>Скидка</div>
                    <div className={s.rowValue}>
                      <span className={s.discount}>-{discount}%</span>
                    </div>
                  </div>
                  <div className={s.rowSubtitle}>на подписку</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={s.total}>
          <span className={s.leftTotal}>Итого:</span>
          {isEmpty(product) ? (
            <span className={s.rightTotal}>$0.00</span>
          ) : (
            <span className={s.rightTotal}>
              $
              {total
                ? total.toFixed(2)
                : subCost.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
