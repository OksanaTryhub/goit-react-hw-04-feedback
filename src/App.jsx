import { useState } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import DisplayNotification from 'components/Notification/Notification';

import css from './App.module.css';

export default function App() {
  const [feedbackOptions, setFeedbackOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const clickBtnCount = e => {
    const param = e.currentTarget.textContent;
    setFeedbackOptions(prevState => {
      return { ...prevState, [param]: prevState[param] + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackOptions;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedbackOptions;

    if (good === 0) {
      return 0;
    }
    return Math.round((good * 100) / countTotalFeedback());
  };

  const options = Object.keys(feedbackOptions);
  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <div className={css.feedbackForm}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={clickBtnCount} />
      </Section>

      <Section title="Statistics">
        <div className={css.feedbackForm__stats}>
          {totalFeedback === 0 ? (
            <DisplayNotification message="There is no feedback" />
          ) : (
            <Statistics
              options={feedbackOptions}
              total={totalFeedback}
              positivePercentage={positiveFeedbackPercentage}
            />
          )}
        </div>
      </Section>
    </div>
  );
}
