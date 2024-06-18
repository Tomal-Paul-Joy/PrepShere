const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Green Planet?",
        answers: [
            { text: "Earth", correct: true },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which University is known as the Green Haeven?",
        answers: [
            { text: "BUET", correct: false },
            { text: "KUET", correct: false},
            { text: "RUET", correct: false },
            { text: "Chattgaiya BIT", correct: true }
        ]
    },
    {
        question: "2+3?",
        answers: [
            { text: "10", correct: false },
            { text: "5", correct: true },
            { text: "23", correct: false },
            { text: "32", correct: false }
        ]
    },
    {
        question: "Ami ken kichu pari na?",
        answers: [
            { text: "pori na", correct: false },
            { text: "jani na", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },

    // Add more questions as needed
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');

let score = 0;

function startQuiz() {
    quizContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        
        const questionElement = document.createElement('h2');
        questionElement.classList.add('question');
        questionElement.innerText = question.question;
        questionBlock.appendChild(questionElement);
        
        const answerButtonsElement = document.createElement('div');
        answerButtonsElement.classList.add('answer-buttons');
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.dataset.correct = answer.correct;
            button.dataset.questionIndex = index;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
        
        questionBlock.appendChild(answerButtonsElement);
        quizContainer.appendChild(questionBlock);
    });
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        
});

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
    }
    button.disabled=true;
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}
function handleSubmitButton() {
    const selectedAnswers = document.querySelectorAll('.selected');
    
    
    selectedAnswers.forEach(button => {
        if (button.dataset.correct === 'true') {
            score++;
        }
    });
   
    alert(`You scored ${score} out of ${questions.length}`);
    startQuiz();
}

submitButton.addEventListener('click', handleSubmitButton);

startQuiz();