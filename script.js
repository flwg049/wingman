function showSection(sectionId) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    // 선택한 섹션 보여주기
    document.getElementById(sectionId).style.display = 'block';
}

function submitQuiz() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    let score = 0;

    // 간단한 퀴즈 점수 계산 (예시)
    if (document.querySelector('input[name="q1"]:checked')?.value === '1') score++;
    if (document.querySelector('input[name="q2"]:checked')?.value === '2') score++;

    // 질문 3: 정답이 2개 (1, 2)
    const q3Answers = Array.from(document.querySelectorAll('input[name="q3"]:checked')).map(input => input.value);
    if (q3Answers.includes('1') && q3Answers.includes('2') && q3Answers.length === 2) score++;

    // 질문 4: 정답이 4개 (1, 2, 3, 4)
    const q4Answers = Array.from(document.querySelectorAll('input[name="q4"]:checked')).map(input => input.value);
    if (q4Answers.includes('1') && q4Answers.includes('2') && q4Answers.includes('3') && q4Answers.includes('4') && q4Answers.length === 4) score++;

    // 결과 페이지로 이동
    showSection('section4');

    // 구글 스프레드시트에 데이터 전송
    const url = 'https://script.google.com/macros/s/AKfycbwVkaB3QGlqw4wResdJZdS_vTrL-dlvPYpE2MraKRwexwcBzxpNOoUTV1R_jRlEdh0TeQ/exec';
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}&id=${id}&email=${email}&score=${score}`,
    });
}
