
    var timerElement = document.getElementById("timer");
    var questionElement = document.getElementById("question");
    var startButton = document.getElementById("start-btn");
    var answerButtonElement = document.getElementById("ans-btn");
    var Hiscore = document.getElementById("Score-point")

   const questions =  [
        {
            question:"What does CSS stand for?",
            Answers:[
                {text:"Casdaing Style Sheets ", Correct:true},
                {text:"Creative Style Sheets" , Correct:false},
                {text:"Computer Style Sheets" , Correct:false},
                {text:"Colourful Style Sheets" , Correct:false},
            ]
        },
        {
            question:"How do you write a function in JavaScript?",
            Answers:[
                {text:"Function ( )" , Correct:true},
                {text:"Function< >" , Correct:false},
                {text:"Document.function( )" , Correct:false},
                {text:"function [ ] " , Correct:false},
            ]
        },
        {
            question:"Array can be used to store____?",
            Answers:[
                {text:"Boolean" , Correct:false},
                {text:"Strings" , Correct:false},
                {text:"Numbers" , Correct:false},
                {text:"All Of the Above" , Correct:true},
            ]
        },
        {
            question:"How do you get the ID of an element in HTML?",
            Answers:[
                {text:"ElementById()" , Correct:false},
                {text:"querySelector()" , Correct:false},
                {text:"getElementById()" , Correct:true},
                {text:"#ID()" , Correct:false},
            ]
        }
     ];
    
    var score = 0;
    var currentQuestionIndex = 0;
    var timer;
    var par = document.getElementById("par")
    startButton.addEventListener('click', startQuiz);
     
    function startQuiz() {   
        currentQuestionIndex = 0;
        score = 0;
        timer = 35; // set timer to 75 seconds
        par.style.display = 'none';
        startButton.style.display = 'none';
        answerButtonElement.style.display="block"
        displayQuestion();
        startTimer();
    }
    
    function startTimer() {
        var interval = setInterval(function() {
            timer--;
            timerElement.textContent = "Time: " + timer;
    
            if (timer <= 0 || currentQuestionIndex === questions.length) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }
    
    function displayQuestion() {
        // clear out any old answer buttons
        while (answerButtonElement.firstChild) {
            answerButtonElement.removeChild(answerButtonElement.firstChild);
        }
       
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + " . " + currentQuestion.question;
    
        currentQuestion.Answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            if (answer.Correct) {
                button.dataset.correct = answer.Correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonElement.appendChild(button);
        });
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Get the message element
        const messageElement = document.getElementById('message');
        
        if (correct) {
            score++;
            messageElement.textContent = 'Correct!';
            messageElement.style.color = 'green';
        } else {
            timer -= 5; // subtract 5 seconds for incorrect answer
            messageElement.textContent = 'Incorrect!';
            messageElement.style.color = 'red';
        }
        
        // Remove the message after 1 second
        setTimeout(function() {
            messageElement.textContent = '';
        }, 1000);
        
        localStorage.setItem("score", score);
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }
    
 
    
    function endGame() {
        
       window.open("/score.html");

      
       
    }
    
  function submitInitials() {
    var score = localStorage.getItem("score");
    
    var initials = document.getElementById("initials").value;

      if(initials.length >= 2 && initials.length <= 3) {
            var h1score= document.getElementById("h1score");
         h1score.textContent = initials+ " : " +"Your Score Is :" + score + " / 4 ";
         if(score >= 2){
            h1score.style.color="green";
            h1score.textContent = initials+ " : " +"Your Score Is :" + score + " / 4 " + "Well DONE";
         }
        
         else if(score < 2){
            h1score.style.color="red"
         }
          
        } else {
          alert("Please enter 2 to 3 letters for your initials.");
        }
      } 

