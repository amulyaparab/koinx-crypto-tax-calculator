import { useReducer } from "react";
import { initialState, reducer } from "../reducers/reducer";
import CalculatorInfo from "./calculator/CalculatorInfo";
import InputPrice from "./calculator/InputPrice";
import InvestmentType from "./calculator/InvestmentType";
import AnnualIncomeAndTax from "./calculator/AnnualIncomeAndTax";

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
            <AnnualIncomeAndTax
              dispatch={dispatch}
              taxRate={state.taxRate || "0%"}
            />
          </div>
          {isInvestmentLongTerm && (
            <div>
              <div>
                <label>Capital gains amount</label>
                <div className="amount">
                  {state.capitalGainsAmount || "eg. $5,000"}
                </div>
              </div>
              <div>
                <label>Discount for long term gains</label>
                <div className="amount">
                  {state.discountForLongTermGains || "eg. $2,500"}
                </div>
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
              <h2>${state.taxToBePaid || state.taxToBePaid > 0 || 0}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
