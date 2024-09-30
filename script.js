// 퀴즈 문제들 배열
let questionsData = [
    {
        question: 'The core Values are',
        options: [
            { text: 'laws you have to follow.', isCorrect: false },
            { text: 'like road signs that remind you to make good decisions.', isCorrect: true },
            { text: 'questions you have to answer before doing something.', isCorrect: false }
        ]
    },
    {
        question: 'The four Core Values are',
        options: [
            { text: 'Integrity, Service, Excellence, and Pride', isCorrect: false },
            { text: 'Integrity, Service, Ever-ready, and Responsibility', isCorrect: false },
            { text: 'Integrity, Service, Excellence, and Respect', isCorrect: true },
            { text: 'Integrity, Seriousness, Excellence, and Respect', isCorrect: false }
        ]
    },
    {
        question: 'What does the Core Value, “Integrity” mean?',
        options: [
            { text: 'A. Being honest', isCorrect: false },
            { text: 'B. Keep promises', isCorrect: false },
            { text: 'C. Always accomplishing the mission', isCorrect: false },
            { text: 'A and B', isCorrect: true },
            { text: 'A, B, and C', isCorrect: false }
        ]
    },
    {
        question: 'To stay safe, what two questions should cadets ask themselves before they begin a hiking trip? (Select two answers.)',
        options: [
            { text: 'What can go wrong?', isCorrect: true },
            { text: 'How can we protect ourselves?', isCorrect: true },
            { text: 'What are the risks?', isCorrect: false },
            { text: 'What are the hazards?', isCorrect: false },
            { text: 'Will this be fun?', isCorrect: false }
        ]
    },
    {
        question: 'A “wingman” is someone who (check all that apply)',
        options: [
            { text: 'watches a friend’s “six.”', isCorrect: true },
            { text: 'speaks up if the other person is acting strange for no good reason.', isCorrect: true },
            { text: 'is in charge of someone, like a boss.', isCorrect: false },
            { text: 'helps keep his or her wingman safe.', isCorrect: true },
            { text: 'decides if his or her wingman has violated the Core Values.', isCorrect: false },
            { text: 'encourages his or her wingman.', isCorrect: true }
        ]
    },
    {
        question: 'What was the moral to the story about the wheelbarrow and the bricks?',
        options: [
            { text: 'You are responsible for your safety', isCorrect: true },
            { text: 'Your instructor is responsible for your safety.', isCorrect: false },
            { text: 'Staying safe depends mostly on talent.', isCorrect: false },
            { text: 'Staying safe is mostly a matter of luck.', isCorrect: false }
        ]
    },
    {
        question: 'A flight of cadets is picking up litter on an old runway that’s supposed to be closed. You see something no one else does: an airplane suddenly turning your way for an emergency landing. You:',
        options: [
            { text: 'Ask your flight sergeant for permission to move out of the way.', isCorrect: false },
            { text: 'Tell your wingman to move out of the way.', isCorrect: false },
            { text: 'Command, "Knock it Off! Everyone stop, there is an airplane coming."', isCorrect: true },
            { text: 'Recommend your flight sergeant give the "Knock it Off" command.', isCorrect: false }
        ]
    },
    {
        question: 'If you attend a CAP squadron meeting, you should expect to see AT LEAST how many senior members there to supervise cadets?',
        options: [
            { text: '0', isCorrect: false },
            { text: '1', isCorrect: false },
            { text: '2', isCorrect: true },
            { text: '3', isCorrect: false }
        ]
    },
    {
        question: 'Your wingman keeps riding to CAP in a car with just one senior member who isn’t related. You should:',
        options: [
            { text: 'Do nothing because no rule is being broken.', isCorrect: false },
            { text: 'Tell any senior member you trust because that is against the rules.', isCorrect: true },
            { text: 'Ask your wingman if the senior member driver has been acting creepy.', isCorrect: false }
        ]
    },
    {
        question: 'Why didn’t Bruce Wayne / Batman execute the prisoner?',
        options: [
            { text: 'Killing people is against his code of honor.', isCorrect: true },
            { text: 'He was afraid to.', isCorrect: false },
            { text: 'He could not be sure the prisoner deserved to die.', isCorrect: false },
            { text: 'It was not safe for him to kill the prisoner.', isCorrect: false }
        ]
    }
];

// 배열 랜덤 섞기 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

        // 옵션 생성 (체크박스 또는 라디오 버튼)
        q.options.forEach((opt, i) => {
            const inputId = `q${index}_opt${i}`;
            const inputType = q.options.filter(opt => opt.isCorrect).length > 1 ? 'checkbox' : 'radio';
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="${inputType}" id="${inputId}" name="q${index}" value="${i}">
                <label for="${inputId}">${opt.text}</label>
            `;
            questionBox.appendChild(optionElement);
        });

        quizContainer.appendChild(questionBox);
    });
}

// 퀴즈 제출 함수
function submitQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOptions = Array.from(question.querySelectorAll('input:checked')).map(input => parseInt(input.value));
        
        // 현재 문제의 올바른 옵션을 가져옴
        const correctAnswers = questionsData[index].options
            .map((opt, i) => opt.isCorrect ? i : -1)
            .filter(index => index !== -1);
        
        // 사용자가 선택한 옵션 중 올바른 정답이 있는지 확인
        let allCorrect = true;
        selectedOptions.forEach(optionIndex => {
            if (!questionsData[index].options[optionIndex].isCorrect) {
                allCorrect = false;
            }
        });

        // 사용자가 선택하지 않은 정답이 있는지 확인
        if (selectedOptions.length !== correctAnswers.length) {
            allCorrect = false;
        }

        // 모든 선택이 올바른 경우에만 점수 증가
        if (allCorrect) {
            score++;
        }
    });

    // 사용자 정보 및 점수 표시
    document.getElementById('result-name').textContent = document.getElementById('name').value;
    document.getElementById('result-id').textContent = document.getElementById('id').value;
    document.getElementById('result-score').textContent = `${score}/${questions.length}`;

    // 섹션 이동
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('instruction-page').style.display = 'block';

    // 원형 그래프 표시
    renderChart(score, questions.length);
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


// 이벤트 리스너 설정
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

// 퀴즈 끝내기 버튼 이벤트
document.getElementById('finish-quiz').addEventListener('click', () => {
    sendEmail();
});

// 퀴즈 제출 버튼 클릭 이벤트 추가
document.getElementById('submit-quiz').addEventListener('click', () => {
    submitQuiz();
});

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
