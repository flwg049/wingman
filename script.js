// 웰컴 섹션에서 시작하기 버튼 클릭 시
function startQuiz() {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('personal-info-section').style.display = 'block';
}

// 개인정보 유효성 검사
function validateAndNext() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = '';

    const idRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!idRegex.test(id)) {
        errorMessage.innerHTML = 'ID는 6자리 숫자여야 합니다.';
        return;
    }

    if (!emailRegex.test(email)) {
        errorMessage.innerHTML = '올바른 이메일 형식을 입력하세요.';
        return;
    }

    // 퀴즈 시작
    document.getElementById('personal-info-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuiz();
}

// 퀴즈 질문 및 답변 데이터
let quizQuestions = [
    {
        question: '지구에서 가장 가까운 별은 무엇인가요?',
        options: ['태양', '달', '금성', '화성'],
        correct: [0]  // 정답: 태양
    },
    {
        question: '물의 화학식은 무엇인가요?',
        options: ['H2O', 'CO2', 'NaCl', 'H2SO4'],
        correct: [0]  // 정답: H2O
    },
    {
        question: '다음 중 포유류가 아닌 것은?',
        options: ['고양이', '개', '상어', '코끼리'],
        correct: [2]  // 정답: 상어
    },
    {
        question: '대한민국의 수도와 미국의 수도는 무엇인가요? (2개 선택)',
        options: ['서울', '도쿄', '워싱턴 D.C.', '베이징'],
        correct: [0, 2]  // 정답: 서울, 워싱턴 D.C.
    },
    {
        question: '다음 중 색상에 해당하는 것은? (4개 선택)',
        options: ['빨강', '파랑', '노랑', '나무', '바다', '초록'],
        correct: [0, 1, 2, 5]  // 정답: 빨강, 파랑, 노랑, 초록
    },
    {
        question: '컴퓨터의 주요 구성 요소가 아닌 것은?',
        options: ['CPU', 'RAM', 'SSD', '책'],
        correct: [3]  // 정답: 책
    },
    {
        question: '다음 중 물리량이 아닌 것은?',
        options: ['속도', '질량', '온도', '색상'],
        correct: [3]  // 정답: 색상
    },
    {
        question: '화학 원소 중 가장 가벼운 것은?',
        options: ['수소', '헬륨', '리튬', '산소'],
        correct: [0]  // 정답: 수소
    },
    {
        question: '다음 중 프로그래밍 언어가 아닌 것은?',
        options: ['JavaScript', 'Python', 'HTML', 'C++'],
        correct: [2]  // 정답: HTML
    },
    {
        question: '다음 중 인간의 감각 기관이 아닌 것은?',
        options: ['눈', '코', '귀', '발'],
        correct: [3]  // 정답: 발
    }
];

let timerInterval; // 타이머를 제어하기 위한 전역 변수

function startQuiz() {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('personal-info-section').style.display = 'block';

    // 유효성 검사 이벤트 리스너를 'blur' 이벤트로 추가
    document.getElementById('id').addEventListener('blur', validateID);
    document.getElementById('email').addEventListener('blur', validateEmail);
}

function validateID() {
    const id = document.getElementById('id').value;
    const idError = document.getElementById('id-error');
    const idRegex = /^\d{6}$/;

    if (!idRegex.test(id)) {
        idError.textContent = 'ID는 6자리 숫자여야 합니다.';
        idError.style.display = 'block';
    } else {
        idError.style.display = 'none';
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = '올바른 이메일 형식을 입력하세요.';
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }
}

function validateAndNext() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;

    // 유효성 검사 호출
    validateID();
    validateEmail();

    const idError = document.getElementById('id-error').style.display;
    const emailError = document.getElementById('email-error').style.display;

    if (idError === 'block' || emailError === 'block') {
        return; // 에러가 있으면 진행하지 않음
    }

    // 퀴즈 시작
    document.getElementById('personal-info-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuiz();
    startTimer(20 * 60); // 20분(1200초) 타이머 시작
}



function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    const totalDuration = duration; // 총 시간을 저장

    timerInterval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // 남은 시간 표시
        timerDisplay.textContent = `남은 시간: ${minutes}:${seconds}`;

        // 프로그레스 바 업데이트
        const progressPercentage = (timer / totalDuration) * 100;
        progressBar.value = progressPercentage;

        if (--timer < 0) {
            clearInterval(timerInterval);
            submitQuiz(); // 시간이 다 되면 자동으로 제출
        }
    }, 1000);
}

function loadQuiz() {
    quizQuestions = quizQuestions.sort(() => Math.random() - 0.5); // 문제 섞기
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // 기존 내용 초기화

    quizQuestions.forEach((questionObj, questionIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-box');

        // 각 문제의 텍스트 생성
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${questionIndex + 1}. ${questionObj.question}`;
        questionDiv.appendChild(questionTitle);

        // 복수 정답 여부 확인
        const isMultipleChoice = questionObj.correct.length > 1;

        // 선지 섞기
        const shuffledOptions = questionObj.options.map((option, i) => ({ option, index: i }))
                                                   .sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(({ option, index }) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option-box');

            // 정답이 여러 개인 경우 체크박스, 아니면 라디오 버튼 사용
            const input = document.createElement('input');
            input.type = isMultipleChoice ? 'checkbox' : 'radio';
            input.value = index;
            input.name = `question-${questionIndex}`; // 라디오 버튼 그룹화를 위해 name 설정

            const label = document.createElement('label');
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));

            optionDiv.appendChild(label);
            questionDiv.appendChild(optionDiv);
        });

        // 문제 박스를 퀴즈 컨테이너에 추가
        quizContainer.appendChild(questionDiv);
    });
}

function submitQuiz() {
    clearInterval(timerInterval); // 타이머 중지
    const results = quizQuestions.map((questionObj, questionIndex) => {
        const questionDiv = document.getElementsByClassName('question-box')[questionIndex];
        const selectedOptions = Array.from(questionDiv.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'))
                                     .map(input => parseInt(input.value));

        return {
            question: questionObj.question,
            correct: JSON.stringify(questionObj.correct.sort()),
            selected: JSON.stringify(selectedOptions.sort()),
            isCorrect: JSON.stringify(questionObj.correct.sort()) === JSON.stringify(selectedOptions.sort())
        };
    });

    // 개인 정보 및 결과 전송을 위한 데이터 준비
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const quizData = {
        name: name,
        id: id,
        email: email,
        results: results
    };

    // Google Sheets로 전송
    fetch('https://script.google.com/macros/s/AKfycbxpLtNCADtCT23Qhosm2175WOTFZpiT8MSYLLyV-EPbVTkMuGqwqY-n-ZhGl_AhDEna/exec', {  // 웹 앱 URL을 사용합니다.
        method: 'POST',
        body: JSON.stringify(quizData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('quiz-section').style.display = 'none';
            document.getElementById('instruction-section').style.display = 'block';
        } else {
            console.error('Error:', data.message);
            alert('데이터 전송에 문제가 발생했습니다. 다시 시도해 주세요.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('데이터 전송에 문제가 발생했습니다. 다시 시도해 주세요.');
    });
}

