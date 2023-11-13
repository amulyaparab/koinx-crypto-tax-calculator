import { faqsData } from "../database/faqsData";

const FAQs = () => {
  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <ol>
        {faqsData.map(({ id, question, answer }, index) => (
          <li key={id}>
            <p className="question">{question}</p>
            {id === 4 ? (
              <ul className="faq-4-list">
                {answer.map((answer, index) =>
                  index === 0 ? <p>{answer}</p> : <li>{answer}</li>
                )}
              </ul>
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
