// send qriginal quiz questions and attempted quiz questions and evaluate the score

const EvaluateQuiz = (quizQuestions, attemptedQuestions) => {
  
  let score = 0;
  attemptedQuestions.forEach((question) => {
    const realQues = quizQuestions.find((x) => x.id === question.id);
    const correctOptions = realQues.options.filter((op) => op.isCorrect);
    const attemptedOptions = question.optiond.filter((op) => op.isCorrect);
    if (realQues.optionType === "check") {
      const weightage = 1 / correctOptions.length;
      attemptedOptions.forEach((selectedOp) => {
        const correct = correctOptions.find((op) => op.text === selectedOp);
        if (correct !== undefined) score += weightage;
      });
    } else if (realQues.optionType === "radio") {
      if (correctOptions[0].text === attemptedOptions[0]) {
        score++;
      }
    }
  });
  return score;
};

module.exports = EvaluateQuiz;
