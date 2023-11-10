export const initialState = {
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

export const reducer = (state = initialState, action) => {
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
