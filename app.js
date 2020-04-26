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