import { faqsData } from "../database/faqsData";

const FAQs = () => {
  function isArrayOrNormal(value) {
    if (Array.isArray(value)) {
      return value.map((item) => (
        <li>
          {isArrayOrNormal(item)}
          <br />
        </li>
      ));
    }
    return value;
  }

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <ol>
        {faqsData.map(({ id, question, answer }) => (
          <li key={id}>
            <p className="question">{question}</p>
            {Array.isArray(answer) ? (
              <ul>{isArrayOrNormal(answer)}</ul>
            ) : (
              <p>{answer}</p>
            )}
            {(id === 1 || id === 2 || id === 10) && (
              <div className="seperation" />
            )}
          </li>
        ))}
      </ol>{" "}
    </div>
  );
};

export default FAQs;
