export const getCorrectAnswer = (question, type) => {
    const {answer, choices} = question;
    if (type === "INP") {
        return answer;
    }
    return choices[parseInt(answer, 10)];
};