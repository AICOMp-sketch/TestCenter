// Sample questions for each category
const questionsData = {
    Math: [
        {
            question: "What is 5 + 7?",
            options: ["10", "11", "12", "13"],
            answer: "12"
        },
        {
            question: "What is 9 x 3?",
            options: ["27", "18", "24", "21"],
            answer: "27"
        }
    ],
    Science: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            answer: "H2O"
        }
    ],
    Languages: [
        {
            question: "Which language is primarily spoken in Brazil?",
            options: ["Spanish", "Portuguese", "French", "English"],
            answer: "Portuguese"
        },
        {
            question: "What is the synonym of 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            answer: "Joyful"
        }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedCategory = '';

const categoryCards = document.querySelectorAll('.category-card');
const testSection = document.getElementById('test-section');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const categoryTitleSpan = document.getElementById('category-title');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        selectedCategory = card.dataset.category;
        startTest(selectedCategory);
    });
});

function startTest(category) {
    // Load questions for the selected category
    currentQuestions = questionsData[category];
    currentQuestionIndex = 0;
    categoryTitleSpan.textContent = category;
    // Show test section
    document.querySelector('.categories-section').style.display = 'none';
    document.querySelector('.intro-section').style.display = 'none';
    document.getElementById('test-section').style.display = 'block';

    displayQuestion();
    updateNavigationButtons();
}

function displayQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionText.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Generate answer options
    currentQuestion.options.forEach(option => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = option;
        answerDiv.addEventListener('click', () => {
            // Mark selected answer
            // Remove previous selection styles
            Array.from(answersContainer.children).forEach(child => {
                child.style.backgroundColor = '#f4f7f8';
            });
            answerDiv.style.backgroundColor = '#d0e6f7';
            answerDiv.dataset.selected = 'true';
        });
        answersContainer.appendChild(answerDiv);
    });
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === currentQuestions.length - 1 ? 'Finish' : 'Next';
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavigationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateNavigationButtons();
    } else {
        // Finish test
        showResults();
    }
});

function showResults() {
    let score = 0;
    currentQuestions.forEach((q, index) => {
        const answers = answersContainer.children;
        const selectedAnswerDiv = Array.from(answers).find(div => div.dataset.selected === 'true');
        if (selectedAnswerDiv && selectedAnswerDiv.textContent === q.answer) {
            score++;
        }
    });
    alert(`Your score: ${score} out of ${currentQuestions.length}`);
    // Reset to category selection
    resetTest();
}

function resetTest() {
    document.querySelector('.categories-section').style.display = 'flex';
    document.querySelector('.intro-section').style.display = 'block';
    document.getElementById('test-section').style.display = 'none';
    // Clear answers
    answersContainer.innerHTML = '';
}