import logo from "./logo.svg";
import "./App.css";
import arrow from "./assets/Vector.svg";
import australia from "./assets/emojione_flag-for-australia.svg";
function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>KoinX</h1>
        <div className="nav-pills">
          <p>Features</p>
          <p>Exchanges</p>
          <p>How it Works?</p>
          <p>Blog</p>
          <p>About Us</p>
          <button>Sign In</button>
        </div>
      </nav>

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
                <input />
              </div>
              <div>
                <label>Enter sale price of Crypto</label>
                <input />
              </div>
            </div>
            <div>
              <div>
                {" "}
                <label>Enter your Expenses</label>
                <input />
              </div>
              <div className="investment">
                <label>Investment Type</label>
                <div className="options">
                  <div>
                    <p>Short Term</p> <div className="box"></div>
                  </div>
                  <div>
                    <p>Long Term</p>
                    <div className="box"></div>
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
                <select>
                  <option>$0 - $18,200</option>
                  <option>$18,201 - $45,000</option>
                  <option>$45,001 - $120,000</option>
                  <option>$120,001- $180,000</option>
                  <option>$180,000+</option>
                </select>
              </div>
              <div className="tax-rate">
                <label>Tax Rate</label>
                <p>$5,902 + 32% of excess over $45,001</p>
              </div>
            </div>

            <div>
              <div>
                <label>Capital gains amount</label>
                <input />
              </div>
              <div>
                <label>Discount for long term gains</label>
                <input />
              </div>
            </div>
            <div className="results">
              <div className="capital-gains">
                <p>Net Capital gains tax amount</p>
                <h2>$2500</h2>
              </div>
              <div className="tax-to-be-paid">
                <p>The tax you need to pay*</p>
                <h2>$812.5</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
