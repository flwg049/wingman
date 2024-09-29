document.getElementById('startQuizBtn').addEventListener('click', function() {
    showSection(2);  // Move to the Personal Information section
});

document.getElementById('personalInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    showSection(3);  // Move to the Quiz section
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const quizResult = calculateQuizResult(); // Calculate quiz result

    // Send data to Google Sheets
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
    .then(response => response.text())
    .then(data => {
        alert('Quiz submitted successfully! ' + data);
        showSection(4);  // Move to the Instructions section
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to switch between sections
function showSection(sectionNumber) {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.display = (index + 1 === sectionNumber) ? 'block' : 'none';
    });
}

// Function to calculate the quiz result
function calculateQuizResult() {
    let result = 0;
    const answers = {
        q1: 'A',
        q2: 'B'
    };

    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');

    if (q1Answer && q1Answer.value === answers.q1) result++;
    if (q2Answer && q2Answer.value === answers.q2) result++;

    return `${result}/2`;  // Return the number of correct answers out of 2
}
