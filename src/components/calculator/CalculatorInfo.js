import arrow from "../../assets/images/vector.svg";
import australia from "../../assets/images/flag-of-australia.svg";

const CalculatorInfo = () => {
  return (
    <>
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
    </>
  );
};

export default CalculatorInfo;
