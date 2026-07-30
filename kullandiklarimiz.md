# Zikirmatik & Kuran Uygulaması - Kullanılan Teknolojiler ve Kaynaklar

Bu belge, uygulamanın App Store ve Google Play Store'a yüklenmesi (yayınlanması) sürecinde, mağaza inceleme ekiplerine ve kullanıcılara uygulamanın teknik altyapısı, kullanılan teknolojiler, üçüncü parti servisler, API'ler ve veri gizliliği (privacy) politikaları hakkında şeffaf bilgi sağlamak amacıyla hazırlanmıştır.

## 1. Temel Teknolojiler ve Çatı (Core Framework)

Uygulama, hem iOS hem de Android platformlarında sorunsuz ve yüksek performanslı çalışabilmesi için modern çapraz platform (cross-platform) teknolojileriyle geliştirilmiştir.

- **React Native (v0.81.5):** Uygulamanın temel arayüzünü ve iş mantığını oluşturmak için kullanılmıştır.
- **Expo (v54.0.23):** React Native projelerinin derlenmesi, cihaz özelliklerine erişim sağlanması (Kamera, Konum vb.) ve hızlı geliştirme süreçleri için tercih edilmiştir.
- **TypeScript:** Kodun tip güvenliğini (type-safety) sağlamak, hataları en aza indirmek ve sürdürülebilir bir geliştirme süreci yürütmek amacıyla kullanılmıştır.

## 2. Kullanılan Üçüncü Parti Kütüphaneler (Third-Party Libraries)

Uygulamada yer alan özelliklerin sorunsuz çalışması için güvenilir açık kaynak kütüphaneler tercih edilmiştir.

### Kullanıcı Arayüzü (UI) ve Tasarım
- **NativeWind (v2.0.11) & Tailwind CSS (v3.3.2):** Uygulama arayüzündeki bileşenlerin hızlı, modern ve tutarlı bir şekilde stillendirilmesi için kullanılmıştır.
- **@expo/vector-icons:** Arayüzde yer alan ikonların (Ionicons, FontAwesome vb.) görüntülenmesi için kullanılmıştır.
- **expo-linear-gradient:** Estetik geçişli arka plan (gradient) tasarımları oluşturmak için kullanılmıştır.

### Durum Yönetimi (State Management)
- **Zustand (v5.0.8):** Uygulama içindeki global verilerin (Kullanıcı tercihleri, Kuran dinleme durumu, Namaz vakitleri, Zikir sayıları vb.) performanslı bir şekilde yönetilmesi için kullanılmıştır. React Context API yerine daha hafif ve hızlı olduğu için tercih edilmiştir.

### Yerel Veritabanı ve Saklama (Local Storage)
- **@react-native-async-storage/async-storage:** Kullanıcının uygulamadaki ilerlemesi, favori duaları, uygulama ayarları ve hatim takibi gibi verilerin cihazın yerel hafızasında (çevrimdışı çalışabilmesi için) güvenli bir şekilde saklanmasını sağlar.

### Ses, Medya ve Oynatıcılar
- **expo-av & react-native-track-player:** Kuran-ı Kerim ayetlerinin ve surelerinin, ezan seslerinin ve arka plandaki duaların hem uygulama açıkken hem de arka plandayken kesintisiz çalınmasını yönetir.

### Konum ve Bildirimler
- **expo-location:** Kullanıcının bulunduğu konuma (enlem/boylam) göre en doğru namaz vakitlerini hesaplayabilmek amacıyla, sadece kullanıcıdan izin alındığında cihaz konumunu alır.
- **expo-notifications:** Namaz vakitleri girdiğinde ve Zikir hatırlatıcıları için cihaza yerel bildirim (local push notification) göndermek amacıyla kullanılır.

### Sensörler ve Cihaz Özellikleri
- **expo-device:** Uygulamanın hangi cihazda çalıştığını algılayarak arayüzün cihaz türüne (tablet, telefon) uygun şekilde optimize edilmesini sağlar.
- **expo-haptics:** Zikir çekerken ekrana dokunulduğunda kullanıcıya gerçekçi bir geri bildirim vermek için cihazın titreşim motorunu (Haptic Feedback) kullanır.

### Navigasyon (Yönlendirme)
- **@react-navigation/native (v7.x):** Uygulama içi sayfalar arası geçişi, alt sekmeleri (Bottom Tabs) ve ekran yığınlarını (Stack Navigation) oluşturur.

### Çoklu Dil ve Yerelleştirme
- **i18next & react-i18next:** Uygulamanın Türkçe, İngilizce, Almanca, Fransızca, Rusça gibi farklı dillerde kullanılabilmesini sağlayan çeviri altyapısıdır.

---

## 3. Harici API'ler ve Servisler (External APIs & Services)

Uygulamanın içeriğini dolduran dini veriler, herkese açık ve güvenilir ücretsiz API servislerinden anlık olarak çekilmektedir:

1. **Al-Adhan API (api.aladhan.com):** 
   - Kullanıcının bulunduğu konuma (enlem, boylam) göre Diyanet veya diğer global otoritelere uygun namaz vakitlerini (Fecr, Güneş, Öğle, İkindi, Akşam, Yatsı) hesaplamak için kullanılır.
2. **Al Quran Cloud API (api.alquran.cloud):** 
   - Kuran-ı Kerim Arapça metinlerini, ayetlerini, sure bilgilerini ve farklı dillere ait meal/tercüme verilerini çekmek için kullanılır.
3. **Islamic Network CDN (cdn.islamic.network) & QuranicAudio:** 
   - Farklı hafızların (Mishary Rashid Al-Afasy, Abdul Basit vb.) Kuran-ı Kerim ses dosyalarını (mp3) uygulamaya aktarıp çalmak için kullanılan ses sağlayıcılarıdır.

---

## 4. İzinler ve Veri Gizliliği Politikası (Privacy & Permissions)

Mağaza onay süreçlerinde (App Store Privacy Policy, Google Play Data Safety) beyan edilmesi gereken özellikler aşağıdadır:

- **Konum İzni (Location Permission):** Yalnızca kullanıcının doğru namaz vakitlerini görebilmesi amacıyla anlık konumu istenir. Konum verisi **hiçbir uzak sunucuya kaydedilmez veya izlenmez**; işlem cihaz üzerinde yapılır ve sadece cihaz hafızasına önbelleklenir.
- **Bildirim İzni (Notification Permission):** Kullanıcıya vakit girmesi gibi durumlarda uyarı gönderebilmek içindir. Bildirimler tamamen yerel (local) olarak programlanır, herhangi bir dış push bildirim sunucusu kullanılmaz.
- **Kullanıcı Verileri (User Data):** Zikir sayaçları, hatim ilerlemesi ve kişisel ayarlar gibi tüm kullanıcı verileri **yalnızca cihazın kendi içinde (AsyncStorage) tutulur.** Hiçbir kişisel veri, uzak bir veritabanına aktarılmaz, toplanmaz veya üçüncü şahıslarla paylaşılmaz.
- **Analitik (Analytics) ve Reklam (Ads):** Uygulama içerisinde kullanıcı hareketlerini izleyen (tracking) harici bir analitik aracı veya reklam SDK'sı bulunmamaktadır.
