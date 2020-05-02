/**
 * Applikasyonnun amaci cocuklara kerrat ögretmek
 * 
 * Akis
 * 
 *  - hergün, her çocuk icin basari sayisi (cetveli) ayri tutlacak kaybolmamali (local storrage)
 *  - her cocuk applikasyonu actiginda bir isim listesi ve aldiklari toplam puanlar görülecek
 *  - cocugun ismi yoksa listede kayit olabilecek baska cocuklarin ismi ile soru çömemeli ***Dikkat**
 *  - full screen olmali cocuklarin konsantrasyonu bozulmamasi için
 *  - 10 soru olmalidir her oturum icin ve her soru icin 10 saniye sure verilmeli
 *  - couklari rahatlatmak icin arka planda muzik donmeli
 *  - baska bir sebeple aplikasyondan cikilirsa soru cözme esnasinda süre durmali sonra tekrar devam edbilmeli cocuk
 *  - bütün sorulari cözünce (10) isim listesine geri dönmeli ve kendi ismi ve puani güncellenmis olarak
 * 
 * Analiz
 * 
 *  - sayfa acilinca müzik baslamasi
 *  - bir tablo görünmesi ve icinde cocuklarin listesi ve puanlari siralanmali en cok puan alan en ustte..
 *  - isme tiklayip soru cözmeye baslayacak yada ayri bir buton la "start" basinca ismini ve sifresini verecek cocuk
 *  - yoksa yeni kayit yapabilmeli cocuk  form la ve soru cözmeye baslamali
 *  - start ta basinca full screen olmasi..!??
 *  - 10 soru sirayla (birini cözmeden öbürüne gecmemeli) sayfada bir soru görünmeli (10saniye her soru icin) 
 *  - sorular bitmezse ve ekrandan cikarsa sayaç durmali
 *  - bitince local storrage a kayit etmeli
 *  - ve tekrar ana sayfaya geri dönmeli 
 */

let introScoreList = document.querySelector(".intro-score-list");
let loginBtn = document.querySelector(".login-button");
let quizStartBtn = document.querySelector(".quiz-start-btn");
let quizMainBox = document.querySelector(".quiz-main-box");
let numberFirst = document.querySelector(".number-first");
let numberSecond = document.querySelector(".number-second");
let quizGuess = document.querySelector(".quiz-guess");
let quizGuessResult = document.querySelector(".quiz-guess-result");
let quizHeading = document.querySelector(".quiz-heading");
let timerBox = document.querySelector(".timer-box");


let scoreListTemplate = `  
<div class="d-flex align-items-center py-2 justify-content-between border-bottom border-gray">
    <div class="d-flex align-items-center media">
        <img class="mr-2" width="60" height="60" src="img/Avatar__STUDENTICON__.svg" alt="">
        <p class="media-body  mb-0 small">
        <strong class="d-block ">@__STUDENTNAME__</strong>
        </p>
    </div>
        <h5 class="score-box m-0">
        __STUDENTSCORE__ Puan
        </h5>
    </div>`

let quizHeadingTemplate = `<div class="d-flex align-items-center py-2 justify-content-between">
<div class="d-flex align-items-center media">
    <img class="mr-2" width="60" height="60" src="img/Avatar__STUDENTICON__.svg" alt="">
    <p class="media-body  mb-0 small">
        <strong class="d-block ">@__STUDENTNAME__ hosgeldin !</strong>
    </p>
</div>
<h5 class="score-box m-0">
    Toplam puanin : __STUDENTSCORE__
</h5>
</div>`;

class DBManager {
    constructor() {
        this.db = localStorage;
    }
    setItem(key, value) {
        value = JSON.stringify(value);
        this.db.setItem(key, value);
    }
    getItem(key) {
        const data = this.db.getItem(key);
        return JSON.parse(data);
    }
}

class AppManger {
    constructor() {
        // this.firstNumber = this.random();
        //this.secondNumber = this.random();
        this.appName = "Ogrenciler"
        this.dbManager = new DBManager();
        this.setStudentsRegister();
        this.currentStudentData = null;
    }
    setStudentsRegister() {
        const initialData = [{
                id: 1,
                name: "Ahmet",
                password: "1234",
                score: 0
            },
            {
                id: 2,
                name: "Ayse",
                password: "1234",
                score: 0
            },
            {
                id: 3,
                name: "Mehemet",
                password: "1234",
                score: 0
            },
            {
                id: 4,
                name: "Fatma",
                password: "1234",
                score: 0
            },
        ]
        this.dbManager.setItem(this.appName, initialData);
    }

    userCheck(n, p) {
        let checkStatus = false;
        let registerUsers = this.dbManager.getItem(this.appName);
        registerUsers.
        filter(user => user.name === n && user.password === p ? checkStatus = true : false);
        return checkStatus;
    }
    login(userName, userPass) {
        if (this.userCheck(userName, userPass)) {
            let allStudentData = this.dbManager.getItem(this.appName);
            let currentStudentOldData = allStudentData.find(user => {
                return user.name === userName
            })
            this.dbManager.setItem("currentStudent", currentStudentOldData);
            this.currentStudentData = this.dbManager.getItem("currentStudent");
            return
        }

        let loginCheckAlert = document.querySelector(".login-control-alert");
        loginCheckAlert.style.display = "block";
        setTimeout(function () {
            loginCheckAlert.style.display = "none";
        }, 1500)
    }
}

class QuestionGenerator {
    constructor() {
        this.firstNumber = null;
        this.secondNumber = null;
        this.result = null;
        this.randomMultiplacation();
    }
    randomMultiplacation() {
        const firstNumber = Math.floor(Math.random() * 10);
        const secondNumber = Math.floor(Math.random() * 10);
        const result = firstNumber * secondNumber;
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.result = result;
    }
}

class Student {
    constructor(data) {
        this.studentDB = new DBManager();
    }
    studentNewData(scorePlus) {
        const availableData = this.studentDB.getItem("currentStudent");
        availableData.score += scorePlus;
        this.studentDB.setItem("currentStudent", availableData);
    }
}




function renderIntro() {
    const introRender = new AppManger();
    let localDB = introRender.dbManager.getItem(introRender.appName);

    const scorListSummary = localDB.reduce((carry, item) => {
        carry += scoreListTemplate
            .replace(/__STUDENTNAME__/, item.name)
            .replace(/__STUDENTSCORE__/, item.score)
            .replace(/__STUDENTICON__/, item.id)
        return carry;
    }, "");
    introScoreList.innerHTML = scorListSummary;
    loginBtn.addEventListener("click", function () {
        const userName = document.querySelector("#user-name").value;
        const userPass = document.querySelector("#user-pass").value;
        introRender.login(userName, userPass);
        document.querySelector(".close").click();
        reStart();
    })
}
renderIntro();

function reStart() {
    const manager = new DBManager();
    const introStudentData = manager.getItem("currentStudent");
    //yeni yontem (!!=> true | (!=>false döndürür
    if (!!introStudentData) {
        document.querySelector("body").classList.add("is-login");
        const quizHeadingResult = quizHeadingTemplate
            .replace(/__STUDENTNAME__/, introStudentData.name)
            .replace(/__STUDENTSCORE__/, introStudentData.score)
            .replace(/__STUDENTICON__/, introStudentData.id);
        quizHeading.innerHTML = quizHeadingResult;
    }
}
reStart();

quizStartBtn.addEventListener("click", function () {
    quizStart();
    timer(0,10);
    this.remove();
    quizMainBox.classList.remove("d-none");
    quizMainBox.classList.add("d-flex");
})

let counter = 10;

function quizStart() {
    const generatedQuestion = new QuestionGenerator();
    numberFirst.innerHTML = generatedQuestion.firstNumber;
    numberSecond.innerHTML = generatedQuestion.secondNumber;
    quizGuess.onchange = guessValue;

    function guessValue(e) {
        if (parseInt(generatedQuestion.result) === parseInt(e.target.value)) {
            quizGuessResult.innerHTML = "Dogru";
            quizGuessResult.classList.add("alert-success");
            quizGuessResult.classList.remove("alert-danger");
            const scoreDB = new Student();
            scoreDB.studentNewData(10)
        } else {
            quizGuessResult.innerHTML = "Yanlis";
            quizGuessResult.classList.add("alert-danger");
            quizGuessResult.classList.remove("alert-success");
        }
        counter--;
        e.target.value = "";
        if (counter >= 0) {
            quizStart();
            console.log(counter);
        }
        timer(0, 10);
        clearInterval(timeFire);
    }
    reStart();
}

function timer(minute, second) {
    timeFire = setInterval(countDown, 1000);

    function countDown() {
        second--;
        let currentTime = minute + ":" + (second < 10 ? "0" : "") + second;
        timerBox.innerHTML = currentTime;
        if (second == 0) {
            if (minute > 0 && second == 0) {
                minute--;
                second = 60;
            } else {
                clearInterval(timeFire);
                quizStart();
            }
        }
    }
}