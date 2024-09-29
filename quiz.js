const quizQuestions = [
    {
        question: "1. HTML의 풀 네임은?",
        answers: {
            a: "HyperText Markup Language",
            b: "Hyperlink and Text Markup Language",
            c: "Home Tool Markup Language"
        },
        correctAnswer: ["a"]
    },
    {
        question: "2. CSS는 무엇을 의미합니까?",
        answers: {
            a: "Creative Style Sheets",
            b: "Cascading Style Sheets",
            c: "Computer Style Sheets"
        },
        correctAnswer: ["b"]
    },
    {
        question: "5. 웹 개발의 주 프로토콜은 무엇인가요? (복수 선택 가능)",
        answers: {
            a: "HTTP",
            b: "FTP",
            c: "SMTP",
            d: "HTTPS"
        },
        correctAnswer: ["a", "d"]
    },
    {
        question: "6. 다음 중 JavaScript의 데이터 유형은? (복수 선택 가능)",
        answers: {
            a: "String",
            b: "Boolean",
            c: "Number",
            d: "Undefined",
            e: "Symbol",
            f: "Object"
        },
        correctAnswer: ["a", "b", "c", "f"]
    }
];

function buildQuiz() {
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        const isMultipleChoice = currentQuestion.correctAnswer.length > 1;

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="${isMultipleChoice ? 'checkbox' : 'radio'}" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question-box">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    });

    document.getElementById('quiz').innerHTML = output.join('');
}

function showResults() {
    const answerContainers = document.querySelectorAll('.answers');
    let numCorrect = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = [...answerContainer.querySelectorAll(selector)].map(input => input.value);
        
        if (JSON.stringify(userAnswer) === JSON.stringify(currentQuestion.correctAnswer)) {
            numCorrect++;
            answerContainer.classList.add('green');
        } else {
            answerContainer.classList.add('red');
        }
    });

    document.getElementById('results').innerText = `${numCorrect} out of ${quizQuestions.length} correct`;
}

buildQuiz();

document.getElementById('submit').addEventListener('click', showResults);
