import { useReducer } from "react";

import { initialState, reducer } from "../reducers/reducer";
import CalculatorInfo from "./calculator/CalculatorInfo";
import InputPrice from "./calculator/InputPrice";
import InvestmentType from "./calculator/InvestmentType";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const isInvestmentLongTerm = state.investmentType === "Long Term";
  return (
    <div className="calculator">
      <CalculatorInfo />
      <div>
        <div className="calculator-form">
          <div>
            <InputPrice
              label="Enter purchase price of Crypto"
              value={state.purchasePrice}
              dispatch={dispatch}
              type="PURCHASE_PRICE"
              placeholder="eg. $30,000"
            />
            <InputPrice
              label="Enter sale price of Crypto"
              value={state.salePrice}
              dispatch={dispatch}
              type="SALE_PRICE"
              placeholder="eg. $20,000"
            />
          </div>
          <div>
            <InputPrice
              label="Enter your Expenses"
              value={state.expenses}
              dispatch={dispatch}
              type="EXPENSES"
              placeholder="eg. $5000"
            />
            <InvestmentType
              dispatch={dispatch}
              isInvestmentLongTerm={isInvestmentLongTerm}
            />
          </div>
          <div>
            <div className="annual-income">
              <label>Select Your Annual Income</label>
              <select
                onChange={(event) =>
                  dispatch({
                    type: "ANNUAL_INCOME",
                    payload: event.target.value,
                  })
                }
              >
                <option value="$0_to_$18200">$0 - $18,200</option>
                <option value="$18200_to_$45000">$18,201 - $45,000</option>
                <option value="$45001_to_$120000">$45,001 - $120,000</option>
                <option value="$120001_to_$180000">$120,001- $180,000</option>
                <option value="$180001">$180,000+</option>
              </select>
            </div>
            <div className="tax-rate">
              <label>Tax Rate</label>
              <p>{state.taxRate}</p>
            </div>
          </div>

          {isInvestmentLongTerm && (
            <div>
              <div>
                <label>Capital gains amount</label>
                <input
                  type="number"
                  value={state.capitalGainsAmount}
                  placeholder="eg. $ 5,000"
                />
              </div>
              <div>
                <label>Discount for long term gains</label>
                <input
                  type="number"
                  value={state.discountForLongTermGains}
                  placeholder="Eg. $ 2,500"
                />
              </div>
            </div>
          )}
          <div className="results">
            <div className="capital-gains">
              <p>Net Capital gains tax amount</p>
              <h2>${state.netCapitalGains || 0}</h2>
            </div>
            <div className="tax-to-be-paid">
              <p>The tax you need to pay*</p>
              <h2>${state.taxToBePaid || 0}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
