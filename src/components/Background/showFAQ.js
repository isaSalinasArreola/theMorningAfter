import React from 'react';
import FrequentQuestions from './frequentquestions';
import './frequentquestions.css'
import { faqData } from './faqs';


const ShowFAQ = () => {

  return (
    <div>
      <h1 className = "FAQ">Frequently Asked Emergency Contraception Questions</h1>
      <div className="accordion">
        {faqData.map(({ title, content }) => (
          <FrequentQuestions title={title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default ShowFAQ;