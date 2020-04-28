class Question {
    constructor(firstNumber, secondNumber, answer) {
        this.date = new Date().toDateString();
        this.expected = firstNumber * secondNumber;
        this.score = this.expected == answer;
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.answer = answer;
    }
}

class Person {
    constructor(name) {
        this.name = name;
        this.tests = [];
    }

    addQuiz(quiz) {
        this.tests.push(quiz);
    }

    printResults() {
        this.tests.quizes.forEach(question => {
            console.log(this.name, question.date, question.firstNumber,
                question.secondNumber, question.answer, question.expected,
                question.score);
        })
    }
}

class DBManager {
    constructor() {
        this.db = localStorage;
    }

    setItem(key, value) {
        // key ve value string olmasi lazim
        value = JSON.stringify(value);
        this.db.setItem(key, value);
    }

    getItem(key) {
        const data = this.db.getItem(key);
        return JSON.parse(data);
    }
}


class Manager {
    constructor(name) {
        this.appName = 'kerrat';
        this.students = [];
        this.dbManager = new DBManager();
        this.firstNumber = this.random();
        this.secondNumber = this.random();
        this.setInitialData();
        this.addLoginEventListener();
    }

    setInitialData() {
        const initialData = {
            settings: {
                userName: 'Ahmet',
                password: 'secret'
            },
            students: []
        };

        this.dbManager.setItem(this.appName, initialData);
    }


    addLoginEventListener() {
        document.querySelector('.login-button').addEventListener('click', this.login.bind(this));
    }

    addToDom(target, value) {
        document.querySelector(target).innerHTML = value;
    }

    login(e) {
        const password = e.target.parentNode.querySelector('input[type=text]').value;
        if (!password) {
            this.addToDom('.message', 'Lütfen gecerli bir password giriniz');
            return;
        }

        const appInfo = this.dbManager.getItem(this.appName);
        if (appInfo.settings.password == password) {
            this.addToDom('.message', 'Hosgeldin admin!');
        }
        //if()
        console.log(password);
    }

    random() {
        return Math.floor(Math.random() * 9);
    }

    addStudent(name) {
        this.students.push(new Person(name))
    }

    start() {
        // inputlari doldur
    }

    check() {
        // ilk, ikinci ve sonuc sayilarini html den al
        this.person.addQuiz(new Question(this.firstNumber, this.secondNumber, 22));
        this.person.printResults();
    }
}

console.log('disardan getir', getData())

function getData() {
    const manager = new Manager('ahmet');
    return manager.dbManager.getItem(manager.appName);
}







//manager.check();