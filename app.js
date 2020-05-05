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
  
    removeItem(key) {
      this.db.removeItem(key);
    }
  
  }
  
  class AppManager {
    constructor() {
      this.currentStudentData = null;
      this.localDb = new DBManager();
      this.setStudentsRegister();
    }
  
    setStudentsRegister() {
      let initialData = appStartData;
      const allStudentsData = this.localDb.getItem(appPrefix.students);
      if(allStudentsData){
        initialData = allStudentsData;
      }
  
      this.localDb.setItem(appPrefix.students, initialData);
    }
  
    userCheck(n, p) {
      let registerUsers = this.localDb.getItem(appPrefix.students);
      return !!registerUsers.find(user => {
        return user.userName === n && user.userPassword === p;
      });
    }
  
    login(userName, userPass) {
      if (this.userCheck(userName, userPass)) {
        let allStudentsData = this.localDb.getItem(appPrefix.students);
        let currentStudentOldData = allStudentsData.find(user => {
          return user.userName === userName;
        });
        this.localDb.setItem(appPrefix.currentStudent, currentStudentOldData);
        this.currentStudentData = this.localDb.getItem(appPrefix.currentStudent);
        loginClose.click();
        return;
      }
      eventManager.emit("userLoginFailed");
    }
  }
  
  class Student {
    constructor() {
      this.currentStudentDB = new DBManager();
    }
    
    studentLiveData(scorePlus) {
      const availableData = this.currentStudentDB.getItem(appPrefix.currentStudent)
      availableData.userScore += scorePlus;
      this.currentStudentDB.setItem(appPrefix.currentStudent, availableData )
    }
  }
  
  class QuestionGenerator{
    constructor(){
      this.firstNumber = null;
      this.secondNumber = null;
      this.result = null;
      this.rendomMultipications() 
    }
  
    rendomMultipications() {
      const firstNumer = Math.floor(Math.random() * 10);
      const secondNumer = Math.floor(Math.random() * 10);
      const result = firstNumer*secondNumer;
      this.firstNumber = firstNumer;
      this.secondNumber = secondNumer;
      this.result = result;
    }
  }