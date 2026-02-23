let questions = [];
let currentIndex = 0;
let userSentence = [];

fetch('data/rearrange.json')
.then(res => res.json())
.then(data => {
    questions = data.questions;
    loadQuestion();
});

function loadQuestion(){
    userSentence = [];
    document.getElementById("answerBox").innerText = "";
    document.getElementById("result").innerText = "";

    const wordsBox = document.getElementById("wordsBox");
    wordsBox.innerHTML = "";

    const shuffled = [...questions[currentIndex].words].sort(() => Math.random() - 0.5);

    shuffled.forEach(word=>{
        const span = document.createElement("span");
        span.className = "word";
        span.innerText = word;
        span.onclick = ()=>{
            userSentence.push(word);
            document.getElementById("answerBox").innerText = userSentence.join(" ");
        };
        wordsBox.appendChild(span);
    });
}

function checkAnswer(){
    const correct = questions[currentIndex].correct.toLowerCase();
    const user = userSentence.join(" ").toLowerCase();

    if(user === correct){
        document.getElementById("result").innerText = "Correct!";
    }else{
        document.getElementById("result").innerText = "Try again!";
    }
}

function nextQuestion(){
    currentIndex++;
    if(currentIndex >= questions.length){
        currentIndex = 0;
    }
    loadQuestion();
}
