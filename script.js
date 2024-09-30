// 전역 변수로 퀴즈 데이터를 선언합니다.
let questionsData = [
    {
        question: 'The core Values are',
        options: ['laws you have to follow.', 'like road signs that remind you to make good decisions.', 'questions you have to answer before doing something.'],
        correct: [1]
    },
    {
        question: 'The four Core Values are',
        options: ['Integrity, Service, Excellence, and Pride', 'Integrity, Service, Ever-ready, and Responsibility', 'Integrity, Service, Excellence, and Respect', 'Integrity, Seriousness, Excellence, and Respect'],
        correct: [2]
    },
    {
        question: 'What does the Core Value, “Integrity” mean?',
        options: ['A. Being honest', 'B. Keep promises', 'C. Always accomplishing the mission', 'A and B', 'A, B, and C'],
        correct: [3]
    },
    {
        question: 'To stay safe, what two questions should cadets ask themselves before they begin a hiking trip? (Select two answers.)',
        options: ['What can go wrong?', 'How can we protect ourselves?', 'What are the risks?', 'What are the hazards?','Will this be fun?'],
        correct: [0, 1]
    },
    {
        question: 'A “wingman” is someone who (check all that apply)',
        options: ['watches a friend’s “six.”', 'speaks up if the other person is acting strange for no good reason.', 'is in charge of someone, like a boss.', 'helps keep his or her wingman safe.', 'decides if his or her wingman has violated the Core Values.', 'encourages his or her wingman.'],
        correct: [0, 1, 3, 5]
    },
    {
        question: 'What was the moral to the story about the wheelbarrow and the bricks?',
        options: ['You are responsible for your safety', 'Your instructor is responsible for your safety.', 'Staying safe depends mostly on talent.', 'Staying safe is mostly a matter of luck.'],
        correct: [0]  
    },
    {
        question: 'A flight of cadets is picking up litter on an old runway that’s supposed to be closed. You see something no one else does: an airplane suddenly turning your way for an emergency landing. You:',
        options: ['Ask your flight sergeant for permission to move out of the way.', 'Tell your wingman to move out of the way.', 'Command, "Knock it Off! Everyone stop, there is an airplane coming."', 'Recommend your flight sergeant give the "Knock it Off" command.'],
        correct: [2]
    },
    {
        question: 'If you attend a CAP squadron meeting, you should expect to see AT LEAST how many senior members there to supervise cadets?',
        options: ['0', '1', '2', '3'],
        correct: [2]
    },
    {
        question: 'Your wingman keeps riding to CAP in a car with just one senior member who isn’t related. You should:',
        options: ['Do nothing because no rule is being broken.', 'Tell any senior member you trust because that is against the rules.', 'Ask your wingman if the senior member driver has been acting creepy.'],
        correct: [1]
    },
    {
        question: 'Why didn’t Bruce Wayne / Batman execute the prisoner?',
        options: ['Killing people is against his code of honor.', 'He was afraid to.', 'He could not be sure the prisoner deseved to die.', 'It was not safe for him to kill the prisoner.'],
        correct: [0]
    }
];

// 퀴즈 결과를 저장하는 변수
let quizResults = {};
let chart;
let timerInterval;

document.getElementById('start-quiz').addEventListener('click', () => {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('personal-info-page').style.display = 'block';
});

document.getElementById('personal-info-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    // 이름 에러 체크 (Last, First 형식)
    if (!/^[A-Za-z]+, [A-Za-z]+$/.test(name)) {
        errorMessage.textContent = 'Name must be entered "Last Name, First Name" format. example: Doe, John';
        return;
    }

    // ID 에러 체크 (6자리 숫자)
    if (!/^\d{6}$/.test(id)) {
        errorMessage.textContent = 'CAPID must be 6 digits.';
        return;
    }

    // 이메일 에러 체크
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        errorMessage.textContent = 'Please enter your valid email address.';
        return;
    }

    // 에러가 없으면 퀴즈 섹션으로 이동
    errorMessage.textContent = ''; // 에러 메시지 초기화
    document.getElementById('personal-info-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuiz();
    startTimer(); // 타이머 시작
});

// 퀴즈 로딩 및 랜덤화
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    shuffleArray(questionsData); // 문제 섞기
    questionsData.forEach(q => shuffleArray(q.options)); // 선지 섞기

    quizContainer.innerHTML = ''; // 이전에 추가된 내용 초기화
    questionsData.forEach((q, index) => {
        const questionBox = document.createElement('div');
        questionBox.classList.add('quiz-question');
        questionBox.innerHTML = `<p>${q.question}</p>`;
        
        // 정답이 하나인 경우: 라디오 버튼 사용
        if (q.correct.length === 1) {
            q.options.forEach((opt, i) => {
                const inputId = `q${index}_opt${i}`;
                const optionElement = document.createElement('div');
                optionElement.innerHTML = `
                    <input type="radio" id="${inputId}" name="q${index}" value="${i}">
                    <label for="${inputId}">${opt}</label>
                `;
                questionBox.appendChild(optionElement);
            });
        } 
        // 여러 정답인 경우: 체크박스 사용
        else {
            q.options.forEach((opt, i) => {
                const inputId = `q${index}_opt${i}`;
                const optionElement = document.createElement('div');
                optionElement.innerHTML = `
                    <input type="checkbox" id="${inputId}" name="q${index}" value="${i}">
                    <label for="${inputId}">${opt}</label>
                `;
                questionBox.appendChild(optionElement);
            });
        }

        quizContainer.appendChild(questionBox);
    });
}

// 배열 랜덤 섞기 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 타이머 시작 함수
function startTimer() {
    let timeLeft = 20 * 60; // 20분을 초로 변환
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');

    timerInterval = setInterval(() => {
        timeLeft--;

        // 타이머 업데이트
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // 프로그레스 바 업데이트
        const progress = ((20 * 60 - timeLeft) / (20 * 60)) * 100;
        progressBar.style.width = `${progress}%`;

        // 시간이 다 되었을 경우
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('The time is up! The quiz will be submitted automatically.');
            submitQuiz();
        }
    }, 1000);
}

// 퀴즈 제출 함수
function submitQuiz() {
    clearInterval(timerInterval); // 타이머 정지
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let totalQuestions = questions.length;

    questions.forEach((question, index) => {
        const correctAnswers = questionsData[index].correct;
        const selectedAnswers = Array.from(question.querySelectorAll('input:checked')).map(input => parseInt(input.value));

        if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(selectedAnswers.sort())) {
            score++;
        }
    });

    quizResults = {
        score: `${score}/${totalQuestions}`,
        message: score === totalQuestions ? 'All answers are correct! Great job!' : `You answered ${score} out of ${totalQuestions} questions correctly.`
    };

    // 사용자 정보 및 점수 표시
    document.getElementById('result-name').textContent = document.getElementById('name').value;
    document.getElementById('result-id').textContent = document.getElementById('id').value;
    document.getElementById('result-score').textContent = quizResults.score;

    // 섹션 이동
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('instruction-page').style.display = 'block';

    // 원형 그래프 표시
    renderChart(score, totalQuestions);
}

// 원형 그래프 그리기 함수
function renderChart(score, total) {
    const ctx = document.getElementById('quiz-score-chart').getContext('2d');

    // 이전에 생성된 차트가 있으면 삭제
    if (chart) {
        chart.destroy();
    }

    // 차트 생성
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [score, total - score],
                backgroundColor: ['#4caf50', '#e0e0e0'], // 색상 설정
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    enabled: true
                },
                // 텍스트를 그래프 중앙에 표시
                datalabels: {
                    display: true,
                    formatter: () => {
                        return `Score: ${score}/${total}`;
                    },
                    color: '#000',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        },
        plugins: [ChartDataLabels] // Chart.js 데이터 레이블 플러그인 사용
    });
}




// 이메일 보내기 함수
function sendEmail() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const score = quizResults.score;

    const templateParams = {
        user_name: name,
        user_id: id,
        user_email: email,
        quiz_score: score,
    };

    emailjs.send('fl049', 'wingman049', templateParams)
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('The quiz results have been successfully submitted to the Deputy Commander of Cadets.');
    }, (error) => {
        console.error('FAILED...', error);
        alert(`Failed to send the email: ${error.text}`);
    });
}

// 퀴즈 끝내기 버튼 이벤트
document.getElementById('finish-quiz').addEventListener('click', () => {
    sendEmail();
});

// 퀴즈 제출 버튼 클릭 이벤트 추가
document.getElementById('submit-quiz').addEventListener('click', () => {
    submitQuiz();
});