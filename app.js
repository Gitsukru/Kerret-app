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
    }
    setStudentsRegister() {
        const initialData = {
            studentRegisterInfo: [{
                    name: "Ahmet",
                    password: "1234"
                },
                {
                    name: "Ayse",
                    password: "5678"
                },
                {
                    name: "Mehemet",
                    password: "1379"
                },
                {
                    name: "Fatma",
                    password: "2345"
                },
            ]
        };
        this.dbManager.setItem(this.appName, initialData);
    }
    userCheck(n, p) {
        let checkStatus = false;
        let registerUsers = this.dbManager.getItem(this.appName);
        registerUsers.studentRegisterInfo.
        filter(user => user.name === n && user.password === p ? checkStatus = true : false);
        return checkStatus;
    }
    login(userName, userPass) {
        if (this.userCheck(userName, userPass)) {
           this.userIntro();
            return
        }
        let loginCheckAlert = document.querySelector(".login-control-alert");
        loginCheckAlert.style.display = "block";
        setTimeout(function () {
            loginCheckAlert.style.display = "none";
        }, 1500)
    }
    userIntro(){
    document.querySelector(".close").click();
    }
}



function renderIntro() {
    let scoreListTemplate = `  
        <div class="d-flex align-items-center py-2 justify-content-between border-bottom border-gray">
            <div class="d-flex align-items-center media">
                <img class="mr-2" width="60" height="60" src="img/Avatar1.svg" alt="">
                <p class="media-body  mb-0 small">
                <strong class="d-block ">@__STUDENTNAME__</strong>
                </p>
            </div>
                <h5 class="score-box m-0">
                __STUDENTSCORE__ Puan
                </h5>
            </div>`
    const introRender = new AppManger();
    let localDB = introRender.dbManager.getItem(introRender.appName);
    scoreListTemplate
    
    let loginBtn = document.querySelector(".login-button");
    loginBtn.addEventListener("click", function () {
        const userName = document.querySelector("#user-name").value;
        const userPass = document.querySelector("#user-pass").value;
        introRender.login(userName, userPass)
    })
}
renderIntro();