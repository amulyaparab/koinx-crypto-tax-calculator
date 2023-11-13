export const initialState = {
  purchasePrice: 0,
  salePrice: 0,
  expenses: 0,
  investmentType: "Long Term",
  annualIncome: "$0_to_$18200",
  capitalGainsAmount: 0,
  discountForLongTermGains: "",
  netCapitalGains: 0,
  taxRate: 0,
  percentToBeMultiplied: "",
  taxToBePaid: 0,
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
      const capitalGainsForPurchase =
        state.salePrice - action.payload - state.expenses;

      const netCapitalGainsOnPurchase = isDiscountApplicable
        ? capitalGainsForPurchase / 2
        : capitalGainsForPurchase;

      return {
        ...state,
        purchasePrice: action.payload,
        capitalGainsAmount: capitalGainsForPurchase,
        discountForLongTermGains: isDiscountApplicable
          ? 0.5 * capitalGainsForPurchase
          : "Discount Inapplicable.",
        netCapitalGains: netCapitalGainsOnPurchase,
        taxToBePaid:
          (taxPercentToBeMultiplied[state.annualIncome] *
            netCapitalGainsOnPurchase) /
          100,
      };

    case "SALE_PRICE":
      const capitalGainsForSale =
        action.payload - state.purchasePrice - state.expenses;

      const discountApplicableDuringSale =
        state.investmentType === "Long Term" && capitalGainsForSale > 0;

      const netCapitalGainsOnSale = discountApplicableDuringSale
        ? capitalGainsForSale / 2
        : capitalGainsForSale;

      return {
        ...state,
        salePrice: action.payload,
        capitalGainsAmount: capitalGainsForSale,
        discountForLongTermGains: discountApplicableDuringSale
          ? 0.5 * capitalGainsForSale
          : "Discount Inapplicable.",
        netCapitalGains: netCapitalGainsOnSale,
        taxToBePaid:
          (taxPercentToBeMultiplied[state.annualIncome] *
            netCapitalGainsOnSale) /
          100,
      };

    case "EXPENSES":
      const capitalGainsForExpenses =
        state.salePrice - state.purchasePrice - action.payload;

      const netCapitalGainsOnExpenses = isDiscountApplicable
        ? capitalGainsForExpenses / 2
        : capitalGainsForExpenses;

      return {
        ...state,
        expenses: action.payload,
        capitalGainsAmount: capitalGainsForExpenses,
        discountForLongTermGains: isDiscountApplicable
          ? 0.5 * capitalGainsForExpenses
          : "Discount Inapplicable.",
        netCapitalGains: netCapitalGainsOnExpenses,
        taxToBePaid:
          (taxPercentToBeMultiplied[state.annualIncome] *
            netCapitalGainsOnExpenses) /
          100,
      };

    case "LONG_TERM":
      return { ...state, investmentType: "Long Term" };

    case "SHORT_TERM":
      return {
        ...state,
        investmentType: "Short Term",
        netCapitalGains: state.capitalGainsAmount,
      };

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
