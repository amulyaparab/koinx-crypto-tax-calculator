import tick from "../../assets/images/tick.svg";

const InvestmentType = ({ dispatch, isInvestmentLongTerm }) => {
  return (
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
  );
};

export default InvestmentType;
