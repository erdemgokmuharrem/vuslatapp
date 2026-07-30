# 📋 Zmatik App - Yapılacaklar Listesi (Adım Adım)

Bu rehber sana kodlardan sonra ne yapman gerektiğini adım adım anlatıyor.

## 🚀 HEMEN YAPILMASI GEREKENLER

### 1. 📱 Expo Hesabı ve Kurulum (30 dakika)

#### Expo Hesabı Oluştur
1. [expo.dev](https://expo.dev) sitesine git
2. "Sign up" ile hesap oluştur
3. Email doğrulamasını yap

#### Bilgisayarına Kurulumlar
```bash
# Terminal'de sırayla çalıştır:
npm install -g @expo/cli
npm install -g eas-cli

# Expo'ya giriş yap
expo login
eas login
```

### 2. 🔥 Firebase Projesi Kurulumu (45 dakika)

#### Firebase Console'da Proje Oluştur
1. [console.firebase.google.com](https://console.firebase.google.com) git
2. "Create a project" tıkla
3. Proje adı: `zmatik-islamic-app`
4. Google Analytics'i etkinleştir
5. Proje oluşturulmasını bekle

#### iOS App Ekle
1. Firebase Console'da "Add app" > iOS
2. iOS bundle ID: `com.zmatik.islamicapp`
3. App nickname: `Zmatik iOS`
4. `GoogleService-Info.plist` dosyasını indir
5. Bu dosyayı projenin `ios/` klasörüne koy

#### Android App Ekle
1. Firebase Console'da "Add app" > Android
2. Android package name: `com.zmatik.islamicapp`
3. App nickname: `Zmatik Android`
4. `google-services.json` dosyasını indir
5. Bu dosyayı projenin `android/app/` klasörüne koy

#### Firebase Servislerini Aktifleştir
1. **Authentication:**
   - Authentication > Sign-in method
   - Email/Password'ü etkinleştir
   - Anonymous'u etkinleştir

2. **Firestore Database:**
   - Firestore Database > Create database
   - Start in test mode seç
   - Location: europe-west3 (Frankfurt)

3. **Cloud Messaging:**
   - Cloud Messaging otomatik aktif

### 3. 📝 Environment Variables Güncelle (15 dakika)

Firebase'den aldığın bilgileri environment dosyalarına yaz:

#### `.env.development` dosyasını aç ve güncelle:
```bash
# Firebase bilgilerini Firebase Console > Project Settings'den al
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy... (Web API Key)
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=zmatik-islamic-app.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=zmatik-islamic-app
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=zmatik-islamic-app.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### Aynı bilgileri `.env.staging` ve `.env.production` dosyalarına da kopyala

### 4. 🍎 Apple Developer Hesabı (Sadece iOS için)

#### Apple Developer Program
1. [developer.apple.com](https://developer.apple.com) git
2. Apple Developer Program'a kaydol ($99/yıl)
3. Hesap onayını bekle (1-2 gün sürebilir)

#### App Store Connect
1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com) git
2. "My Apps" > "+" > "New App"
3. Platform: iOS
4. Name: Zmatik - İslami Uygulama
5. Bundle ID: com.zmatik.islamicapp
6. SKU: zmatik-islamic-app
7. User Access: Full Access

### 5. 🤖 Google Play Console (Sadece Android için)

#### Google Play Console Hesabı
1. [play.google.com/console](https://play.google.com/console) git
2. Developer hesabı oluştur ($25 tek seferlik)
3. Hesap doğrulamasını yap

#### Uygulama Oluştur
1. "Create app" tıkla
2. App name: Zmatik - İslami Uygulama
3. Default language: Turkish
4. App or game: App
5. Free or paid: Free
6. Declarations'ları kabul et

---

## 🛠️ GELIŞTIRME AŞAMASI

### 6. 📦 Proje Kurulumu (10 dakika)

```bash
# Proje klasörüne git
cd /Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app

# Bağımlılıkları yükle
npm install

# iOS pods yükle (sadece Mac'te)
cd ios && pod install && cd ..

# Development environment'ı aktif et
npm run env:development
```

### 7. 🧪 Test Çalıştırma (20 dakika)

```bash
# Expo development server'ı başlat
npm start

# QR kod ile telefonunda Expo Go app'te test et
# Veya simulator'de test et:
npm run ios     # iOS simulator
npm run android # Android emulator
```

#### Kontrol Edilecekler:
- [ ] Uygulama açılıyor mu?
- [ ] Tüm ekranlar çalışıyor mu?
- [ ] Namaz vakitleri gösteriliyor mu?
- [ ] Tesbih sayacı çalışıyor mu?
- [ ] Sesli dualar çalıyor mu?
- [ ] Tema değişimi çalışıyor mu?

### 8. 🎨 İkon ve Resimler (60 dakika)

#### Gerekli Dosyalar:
Sen şu dosyaları hazırlamalısın (Canva, Figma veya Photoshop ile):

1. **icon.png** (1024x1024px)
   - İslami hilal ve yıldız motifi
   - Yeşil tonlarda (#2E7D32)
   - Şeffaf olmayan background

2. **splash-icon.png** (1200x1200px)
   - Splash screen için logo
   - Merkezi yerleşim
   - Yeşil background (#2E7D32)

3. **adaptive-icon.png** (1024x1024px)
   - Android için adaptive ikon
   - Merkezi 768x768px güvenli alan

4. **notification-icon.png** (96x96px)
   - Bildirimler için küçük ikon
   - Monokrom beyaz

5. **favicon.png** (32x32px)
   - Web için favicon

#### Bu dosyaları şu klasöre koy:
```
/Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app/assets/
```

---

## 🚀 YAYINLAMA AŞAMASI

### 9. 📱 EAS Build Kurulumu (30 dakika)

```bash
# EAS projesini başlat
eas init

# Build profilleri kontrol et
eas build:configure

# İlk test build'i oluştur
eas build --platform all --profile preview
```

Bu komut çalıştıktan sonra:
- Build süreci 15-30 dakika sürer
- Build tamamlandığında link alırsın
- Bu linki telefonunda açarak test edebilirsin

### 10. 🍎 iOS App Store'a Yükleme

#### Production Build Oluştur
```bash
eas build --platform ios --profile production
```

#### App Store Connect'te Hazırlık
1. App Store Connect'e git
2. Uygulamanı seç
3. **App Information:**
   - Name: Zmatik - İslami Uygulama
   - Subtitle: Namaz, Kuran, Dua ve Tesbih
   - Category: Lifestyle

4. **Pricing and Availability:**
   - Price: Free
   - Availability: All countries

5. **App Privacy:**
   - Privacy Policy URL ekle
   - Data types: Location, Usage Data

#### Screenshots Hazırla
iPhone için şu boyutlarda ekran görüntüleri:
- 6.7" Display: 1290x2796px (5 adet)
- 6.5" Display: 1242x2688px (5 adet)
- 5.5" Display: 1242x2208px (5 adet)

#### Metadata
```
App Description:
Zmatik, Müslümanlar için tasarlanmış kapsamlı bir İslami uygulamadır. 

Özellikler:
• Otomatik namaz vakitleri
• Kuran-ı Kerim okuma
• 100+ dua koleksiyonu
• Dijital tesbih sayacı
• Kıble pusulası
• Günlük ayet ve hadisler
• 10 farklı tema

Keywords: islam,namaz,kuran,dua,tesbih,kıble,ezan,müslüman
```

#### Submission
```bash
# Build tamamlandıktan sonra
eas submit --platform ios
```

### 11. 🤖 Google Play Store'a Yükleme

#### Production Build Oluştur
```bash
eas build --platform android --profile production
```

#### Play Console'da Hazırlık
1. Google Play Console'a git
2. Uygulamanı seç
3. **App content:**
   - Target audience: 13+
   - Content rating: Everyone
   - Data safety: Konum verisi toplar

4. **Store listing:**
   - App name: Zmatik - İslami Uygulama
   - Short description: Kapsamlı İslami uygulama
   - Full description: (iOS ile aynı)

#### Screenshots Hazırla
Android için:
- Phone: 1080x1920px (8 adet)
- 7-inch tablet: 1024x1600px (8 adet)
- 10-inch tablet: 1200x1920px (8 adet)

#### Submission
```bash
# Build tamamlandıktan sonra
eas submit --platform android
```

---

## ⏰ ZAMAN ÇİZELGESİ

### Haftalar bazında plan:

#### 1. Hafta: Hesap ve Kurulumlar
- [ ] Expo hesabı oluştur
- [ ] Firebase projesi kur
- [ ] Apple Developer hesabı (iOS için)
- [ ] Google Play Console hesabı (Android için)
- [ ] Environment variables güncelle

#### 2. Hafta: Test ve İyileştirme
- [ ] Uygulamayı test et
- [ ] Hataları düzelt
- [ ] İkonları hazırla
- [ ] Screenshots çek

#### 3. Hafta: Build ve Submission
- [ ] Production build oluştur
- [ ] Store metadata hazırla
- [ ] iOS App Store'a gönder
- [ ] Google Play Store'a gönder

#### 4. Hafta: Review ve Launch
- [ ] Store review sürecini bekle
- [ ] Gerekli düzeltmeleri yap
- [ ] Uygulamayı yayınla
- [ ] Marketing başlat

---

## 💰 MALİYETLER

### Zorunlu Maliyetler:
- **Apple Developer Program:** $99/yıl (sadece iOS için)
- **Google Play Console:** $25 (tek seferlik, sadece Android için)

### Opsiyonel Maliyetler:
- **Firebase:** Ücretsiz plan yeterli (başlangıç için)
- **Expo EAS:** Ücretsiz plan yeterli (aylık 1 build)
- **İkon tasarımı:** $50-200 (freelancer'dan)

---

## 🆘 SORUN ÇÖZME

### Yaygın Hatalar:

#### "Expo CLI not found"
```bash
npm install -g @expo/cli
```

#### "Build failed"
```bash
# Cache temizle
npm run start:clear
npm run install:clean
```

#### "Firebase configuration error"
- Environment variables'ları kontrol et
- Firebase console'da proje ayarlarını kontrol et

#### "Code signing error" (iOS)
- Apple Developer hesabının aktif olduğunu kontrol et
- Bundle ID'nin doğru olduğunu kontrol et

---

## 📞 YARDIM KAYNAKLARI

### Dokümantasyon:
- [Expo Docs](https://docs.expo.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Native Docs](https://reactnative.dev/docs)

### Community:
- [Expo Discord](https://chat.expo.dev)
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Video Tutorials:
- YouTube: "Expo EAS Build Tutorial"
- YouTube: "React Native Firebase Setup"
- YouTube: "App Store Submission Guide"

---

## ✅ KONTROL LİSTESİ

Yayınlamadan önce kontrol et:

### Teknik Kontroller:
- [ ] Uygulama tüm cihazlarda çalışıyor
- [ ] Crash yok
- [ ] Performance iyi
- [ ] Offline çalışıyor
- [ ] Push notification çalışıyor

### Store Kontroller:
- [ ] İkonlar hazır
- [ ] Screenshots hazır
- [ ] App description yazıldı
- [ ] Privacy policy hazır
- [ ] Terms of service hazır

### Legal Kontroller:
- [ ] Telif hakkı temiz
- [ ] İslami içerik doğru
- [ ] Privacy policy uygun
- [ ] Store policies'e uygun

---

**🎯 HEDEF:** 4 hafta içinde App Store ve Google Play Store'da yayında!

**📞 DESTEK:** Herhangi bir sorunda bana sor, adım adım yardım ederim!
