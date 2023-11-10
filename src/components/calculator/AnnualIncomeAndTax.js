const AnnualIncomeAndTax = ({ dispatch, taxRate }) => {
  return (
    <>
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
        <p>{taxRate}</p>
      </div>{" "}
    </>
  );
};

export default AnnualIncomeAndTax;
