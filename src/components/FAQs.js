import { faqsData } from "../database/faqsData";

const FAQs = () => {
  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <ol>
        {faqsData.map(({ id, question, answer }) => (
          <li key={id}>
            <p className="question">{question}</p>
            {Array.isArray(answer) ? (
              <ul>
                {answer.map((answer, index) =>
                  id === 4 && index === 0 ? (
                    <p key={index}>{answer}</p>
                  ) : (
                    <li key={index}>{answer}</li>
                  )
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
