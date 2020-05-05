function firstStart() {
    const manager = new AppManager();
    const introScoreData = manager.localDb.getItem(appPrefix.students)
    const scoreListSummary = introScoreData.reduce((carry, item) => {
      carry += introListTemplate
        .replace(/__STUDENTNAME__/, item.userName)
        .replace(/__STUDENTICON__/, item.userId)
        .replace(/__STUDENTSCORE__/, item.userScore);
      return carry;
    }, '');
    introScoreList.innerHTML = scoreListSummary;
    userPassInput.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        loginBtn.click();
      }
    })
    loginBtn.addEventListener('click', function () {
      const userNameValue = userNameInput.value;
      const userPassValue = userPassInput.value;
      manager.login(userNameValue, userPassValue)
  
      appReStart()
    });
  }
  
  function appReStart() {
    const manager = new DBManager();
    const introScoreData = manager.getItem(appPrefix.currentStudent);
    if (!!introScoreData) {
      const quizHeadingResult = quizHeadingTemplate
        .replace(/__STUDENTNAME__/, introScoreData.userName)
        .replace(/__STUDENTSCORE__/, introScoreData.userScore)
        .replace(/__STUDENTICON__/, introScoreData.userId)
      quizHeading.innerHTML = quizHeadingResult;
  
      body.classList.add("isLogin")
      return;
    }
    body.classList.remove("isLogin")
  }
  
  function logOut() {
    const dbManager = new DBManager();
    dbManager.removeItem(appPrefix.currentStudent);
    location.reload();
  }
  
  let questionCount = 10;
  let generatedQuestion = null;
  
  function newQuestion() {
    appReStart()
    clearInterval(timerFire)
    timer(0, 10);
    questionCount--;
    generatedQuestion = new QuestionGenerator();
    quizNumberFirst.innerHTML = generatedQuestion.firstNumber;
    quizNumberSecond.innerHTML = generatedQuestion.secondNumber;
  }
  
  let timerFire;
  
  function timer(minute, second) {
    timerFire = setInterval(contDown, 1000);
  
    function contDown() {
      if (document.hasFocus()) {
        second--;
        let currentTime = minute + ":" + (second < 10 ? "0" : "") + second;
        timerBox.innerHTML = currentTime;
        if (second === 0) {
          if (minute > 0 && second === 0) {
            minute--;
            second = 60;
          } else {
            clearInterval(timerFire);
            eventManager.emit("checkQuizStatus");
          }
        }
      }
    }
  }
  
  function QuizFinish() {
    appReStart()
    const dbManager = new DBManager();
    const currentStuendData = dbManager.getItem(appPrefix.currentStudent);
    const allStudentData = dbManager.getItem(appPrefix.students)
    const updatedAllUserData = allStudentData.map(item => {
      if (item.userName !== currentStuendData.userName) {
        return item;
      }
      item.userScore += currentStuendData.userScore;
      return item;
    })
    dbManager.setItem(appPrefix.students, updatedAllUserData)
    logOut()
  }
  
  
  // Events
  
  logOutBtn.addEventListener("click", function () {
    logOut()
  })
  
  
  startQuiz.addEventListener("click", function () {
    this.remove();
    quizMainBox.classList.remove("d-none");
    quizMainBox.classList.add("d-flex");
    newQuestion()
  })
  
  quizGuessInput.addEventListener("change", function (e) {
    console.log(e.target.value, generatedQuestion.result)
    if (parseInt(e.target.value) === parseInt(generatedQuestion.result)) {
      message = "Dogru";
      addClass = "alert-success";
      removeClass = "alert-danger";
      const scoreDB = new Student();
      scoreDB.studentLiveData(10);
    } else {
      message = "Yanlis";
      addClass = "alert-danger";
      removeClass = "alert-success";
    }
    quizGuessResult.innerHTML = message;
    quizGuessResult.classList.add(addClass);
    quizGuessResult.classList.remove(removeClass);
    e.target.value = "";
    eventManager.emit("checkQuizStatus");
  })
  
  eventManager.on("checkQuizStatus", function(){
    questionCount > 0 ? newQuestion() : QuizFinish();
  });
  
  eventManager.on("userLoginFailed", function(){
    loginCheckAlert.style.display = "block";
      setTimeout(function () {
        loginCheckAlert.style.display = "none";
      }, 1400)
  })
  
  firstStart();
  appReStart();