document.getElementById('startQuizBtn').addEventListener('click', function() {
    showSection(2);  // 개인정보 입력 섹션으로 이동
});

document.getElementById('personalInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    showSection(3);  // 퀴즈 섹션으로 이동
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const quizResult = calculateQuizResult(); // 퀴즈 결과 계산

    // Google Sheets로 데이터 전송
    fetch('https://script.google.com/macros/s/AKfycbwVkaB3QGlqw4wResdJZdS_vTrL-dlvPYpE2MraKRwexwcBzxpNOoUTV1R_jRlEdh0TeQ/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            id: id,
            email: email,
            quizResult: quizResult
        }),
    })
    .then(response => {
        if (!response.ok)
