// quiz.js
function startQuiz() {
    window.location.href = "quiz.html";
}

const questions = [
    {
        question: "Greetings Traveller, After a long journey, what’s your preferred way to spend an evening in my tavern?",
        options: [
            { answer: "I’d enjoy a good chat with the locals, share tales of my travels, and perhaps make a few new friends!", role: "E" },
            { answer: "I’d rather sit by the hearth, sip on some ale, and reflect quietly on the road behind me.", role: "I" },
        ]
    },    
    
    {
        question: "An old stranger approaches you in the middle of the rainy night, He pleads for help finding his lost dog in the woods. Do you…",
        options: [
            { answer: "Weigh the situation carefully, considering the risks and rewards before deciding whether to help.", role: "T" },
            { answer: "Feel a deep sense of empathy, and despite the danger, you can’t turn away from offering your aid.", role: "F" },
        ]
    },

    {
        question: "Relucantly, searching for the dog in the wood you stumble upon an enchanted map leading to a hidden treasure. How do you proceed?",
        options: [
            { answer: "Get lost in the possibilities, imagining what treasures lie, how the map might hold secrets of a forgotten age.", role: "N" },
            { answer: "Carefully inspect the symbols, searching for practical clues about its location and the tangible truth behind the map.", role: "S" },
        ]
    },

    {
        question: "The road splits two ways, you could easily get lost in these conditions, How do you proceed?",
        options: [
            { answer: "You travel with no set destination in mind, trusting that adventure will find you, and that you can make decisions as you go", role: "P" },
            { answer: "You plan every step carefully, ensuring that each turn is noted and that you arrive safely on time.", role: "J" },
        ]
    }
    // Add more questions as needed...
];

let currentQuestionIndex = 0;
let answers = {
    "E": 0,
    "I": 0,
    "N": 0,
    "S": 0,
    "T": 0,
    "F": 0,
    "P": 0,
    "J": 0
};

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <div class="question">
            <p>${currentQuestion.question}</p>
            ${currentQuestion.options.map((option) => `
                <button class="answer-button" onclick="nextQuestion('${option.role}')">
                    ${option.answer}
                </button>
            `).join('')}
        </div>
    `;
}

function nextQuestion(role) {
    answers[role]++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Calculate result
        let mbtiType = "";
        mbtiType += answers["E"] > answers["I"] ? "E" : "I";
        mbtiType += answers["N"] > answers["S"] ? "N" : "S";
        mbtiType += answers["T"] > answers["F"] ? "T" : "F";
        mbtiType += answers["P"] > answers["J"] ? "P" : "J";

        // Store result in localStorage
        localStorage.setItem("quizResult", mbtiType);

        // Redirect to result.html
        window.location.href = "result.html";
    }
}

function showResult() {
    const mbtiType = localStorage.getItem("quizResult");

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>You are an ${mbtiType}!</h2>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname;

    if (page.includes("quiz.html")) {
        displayQuestion();
    } else if (page.includes("result.html")) {
        showResult();
    }
});