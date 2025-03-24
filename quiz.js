// quiz.js
function startQuiz() {
    window.location.href = "quiz.html";
}

const questions = [
    {
        question: "The tavern is alive with music and laughter as a festival begins. How do you join the merriment?",
        options: [
            { answer: "Jump into the dancing, mingle with everyone, and lead the charge in festive cheer!", role: "E" },
            { answer: "Find a quiet corner with a drink, observing the joy from a comfortable distance.", role: "I" },
        ]
    },
    {
        question: "A noble offers you a timed contract with strict goals. Do you...",
        options: [
            { answer: "Accept—it’s structured and you know exactly what’s expected to succeed.", role: "J" },
            { answer: "Decline—I prefer flexibility and freedom to choose my own path.", role: "P" },
        ]
    },
    {
        question: "You're offered a high reward to betray a companion. What do you do?",
        options: [
            { answer: "Calculate the pros and cons, but loyalty has value too—it’s a matter of strategy.", role: "T" },
            { answer: "Refuse without hesitation—bonds forged on the road are worth more than gold.", role: "F" },
        ]
    },
    {
        question: "You’re invited to join a band of adventurers setting out at dawn. How do you feel?",
        options: [
            { answer: "Excited! Meeting new faces and sharing in the journey sounds like a grand time.", role: "E" },
            { answer: "Wary. I prefer smaller groups or even traveling alone, where I can move at my own pace.", role: "I" },
        ]
    },
    {
        question: "While exploring ruins, you discover an artifact. What excites you most?",
        options: [
            { answer: "Learning about its origin, craftsmanship, and tangible history.", role: "S" },
            { answer: "Wondering about the legend behind it, and how it fits into a greater myth.", role: "N" },
        ]
    },
    {
        question: "In the middle of a dungeon crawl, plans suddenly change. How do you react?",
        options: [
            { answer: "Quickly adapt, but work to regain order and steer the party back to a clear plan.", role: "J" },
            { answer: "Embrace the chaos—change is just another part of the adventure.", role: "P" },
        ]
    },
    {
        question: "You’re tasked with solving a riddle to open an ancient door. What’s your approach?",
        options: [
            { answer: "Examine the carvings and surroundings for concrete clues that point to a solution.", role: "S" },
            { answer: "Consider the symbolic meaning behind the riddle, thinking outside the box.", role: "N" },
        ]
    },
    {
        question: "Your party argues over which quest to take. How do you help decide?",
        options: [
            { answer: "Analyze the risks and rewards of each quest, aiming for the most efficient choice.", role: "T" },
            { answer: "Listen to everyone’s hopes and concerns, seeking a path that feels right to all.", role: "F" },
        ]
    },
    {
        question: "In the heart of battle, how do you thrive?",
        options: [
            { answer: "By coordinating with allies, calling out strategies, and inspiring those around me.", role: "E" },
            { answer: "By focusing inward, acting with precision and letting my actions speak louder than words.", role: "I" },
        ]
    },
    {
        question: "A mysterious potion seller offers you a brew. Do you...",
        options: [
            { answer: "Ask detailed questions about the ingredients and effects before trying anything.", role: "S" },
            { answer: "Speculate on the magical origins, imagining how it might unlock hidden potential.", role: "N" },
        ]
    },
    {
        question: "A fellow traveler is accused of theft. The evidence is unclear. What’s your response?",
        options: [
            { answer: "Investigate objectively, weighing all facts before making a fair decision.", role: "T" },
            { answer: "Consider the emotions and intentions involved, aiming for a compassionate resolution.", role: "F" },
        ]
    },
    {
        question: "You’re planning a journey across the realm. What’s your preparation style?",
        options: [
            { answer: "Draft a detailed itinerary, ensuring all supplies and stops are accounted for.", role: "J" },
            { answer: "Pack light and let the road unfold—spontaneity leads to the best stories.", role: "P" },
        ]
    }
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