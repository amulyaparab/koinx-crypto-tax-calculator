import { useReducer } from "react";
import arrow from "../assets/images/vector.svg";
import australia from "../assets/images/flag-of-australia.svg";
import tick from "../assets/images/tick.svg";
const initialState = {
  purchasePrice: "",
  salePrice: "",
  expenses: "",
  investmentType: "Long Term",
  annualIncome: "",
  capitalGainsAmount: "",
  discountForLongTermGains: "",
  netCapitalGains: "",
  taxRate: "",
  percentToBeMultiplied: "",
  taxToBePaid: "",
};
const taxRates = {
  $0_to_$18200: "0%",
  $18200_to_$45000: "Nil + 19% of the excess over $18,200",
  $45001_to_$120000: "$5,092 + 32.5% of the excess over $45,000",
  $120001_to_$180000: "$29,467 + 37% of the excess over $120,000",
  $180001: "$51,667 + 45% of the excess over $180,000",
};
const taxPercentToBeMultiplied = {
  $0_to_$18200: 0,
  $18200_to_$45000: 19,
  $45001_to_$120000: 32.5,
  $120001_to_$180000: 37,
  $180001: 45,
};

const reducer = (state = initialState, action) => {
  const isDiscountApplicable =
    state.investmentType === "Long Term" && state.capitalGainsAmount > 0;
  switch (action.type) {
    case "PURCHASE_PRICE":
      return {
        ...state,
        purchasePrice: action.payload,
        capitalGainsAmount: state.salePrice - action.payload - state.expenses,
        discountForLongTermGains:
          isDiscountApplicable &&
          0.5 * (state.salePrice - action.payload - state.expenses),
        netCapitalGains: isDiscountApplicable
          ? state.salePrice -
            action.payload -
            state.expenses -
            0.5 * (state.salePrice - action.payload - state.expenses)
          : state.salePrice - action.payload - state.expenses,
      };
    case "SALE_PRICE":
      const capitalGains =
        action.payload - state.purchasePrice - state.expenses;
      return {
        ...state,
        salePrice: action.payload,
        capitalGainsAmount: capitalGains,
        discountForLongTermGains: isDiscountApplicable && 0.5 * capitalGains,
        netCapitalGains: isDiscountApplicable
          ? capitalGains - 0.5 * capitalGains
          : capitalGains,
      };
    case "EXPENSES":
      return {
        ...state,
        expenses: action.payload,
        capitalGainsAmount:
          state.salePrice - state.purchasePrice - action.payload,
        discountForLongTermGains:
          isDiscountApplicable &&
          0.5 * (state.salePrice - state.purchasePrice - action.payload),
        netCapitalGains: isDiscountApplicable
          ? state.salePrice -
            state.purchasePrice -
            action.payload -
            0.5 * (state.salePrice - state.purchasePrice - action.payload)
          : state.salePrice - state.purchasePrice - action.payload,
      };
    case "LONG_TERM":
      return { ...state, investmentType: "Long Term" };
    case "SHORT_TERM":
      return { ...state, investmentType: "Short Term" };
    case "ANNUAL_INCOME":
      return {
        ...state,
        annualIncome: action.payload,
        taxRate: taxRates[action.payload],
        percentToBeMultiplied: taxPercentToBeMultiplied[action.payload],
        taxToBePaid:
          (taxPercentToBeMultiplied[action.payload] * state.netCapitalGains) /
          100,
      };
    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const isInvestmentLongTerm = state.investmentType === "Long Term";
  return (
    <div className="calculator">
      <h1>Free Crypto Tax Calculator Australia</h1>
      <div className="financial-yr">
        <div className="inline-flex">
          Financial Year
          <div className="field">
            <p>FY 2023-24</p>
            <img src={arrow} alt="downward-arrow" />
          </div>
        </div>

        <div className="inline-flex">
          {" "}
          Country
          <div className="field">
            <div className="section">
              <img src={australia} alt="Australia flag" />
              <p>Australia</p>
            </div>
            <img src={arrow} alt="downward-arrow" />
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="calculator-form">
          <div>
            <div>
              <label>Enter purchase price of Crypto</label>
              <input
                type="number"
                placeholder="eg. $ 30,000"
                value={state.purchasePrice}
                onChange={(event) =>
                  dispatch({
                    type: "PURCHASE_PRICE",
                    payload: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Enter sale price of Crypto</label>
              <input
                type="number"
                placeholder="eg. $ 20,000"
                value={state.salePrice}
                onChange={(event) =>
                  dispatch({
                    type: "SALE_PRICE",
                    payload: event.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <div>
              {" "}
              <label>Enter your Expenses</label>
              <input
                type="number"
                placeholder="eg. $ 5000"
                value={state.expenses}
                onChange={(event) =>
                  dispatch({
                    type: "EXPENSES",
                    payload: event.target.value,
                  })
                }
              />
            </div>
            <div className="investment">
              <label>Investment Type</label>
              <div className="options">
                <div
                  className={` ${!isInvestmentLongTerm && "selected"}`}
                  onClick={() => dispatch({ type: "SHORT_TERM" })}
                >
                  <p>Short Term</p>{" "}
                  <div className="box">
                    {!isInvestmentLongTerm && <img src={tick} alt="Selected" />}
                  </div>
                </div>
                <div
                  className={` ${isInvestmentLongTerm && "selected"}`}
                  onClick={() => dispatch({ type: "LONG_TERM" })}
                >
                  <p>Long Term</p>
                  <div className="box">
                    {isInvestmentLongTerm && <img src={tick} alt="Selected" />}
                  </div>
                </div>
              </div>
              <div className="timeline">
                <small>{"<"} 12 months</small>
                <small>{">"} 12 months</small>
              </div>
            </div>
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
