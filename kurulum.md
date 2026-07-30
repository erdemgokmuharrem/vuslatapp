# Zmatik — Canlı Ortama Alma Rehberi
## App Store & Google Play — Adım Adım Kurulum

> Bu belge, **hiç bilmeyen biri** için baştan sona yazılmıştır.  
> Atlanacak tek bir adım bile uygulamanın reddedilmesine yol açabilir.  
> Tüm adımları sırasıyla uygulayın.

---

## İÇİNDEKİLER

1. [Gereksinimler](#1-gereksinimler)
2. [Expo & EAS Hesabı Kurulumu](#2-expo--eas-hesabı-kurulumu)
3. [Apple Developer Hesabı (iOS)](#3-apple-developer-hesabı-ios)
4. [App Store Connect — Uygulama Oluşturma](#4-app-store-connect--uygulama-oluşturma)
5. [Google Play Console Hesabı (Android)](#5-google-play-console-hesabı-android)
6. [Google Play — Uygulama Oluşturma](#6-google-play--uygulama-oluşturma)
7. [eas.json Dosyasını Doldurma](#7-easjson-dosyasını-doldurma)
8. [Production Build Alma](#8-production-build-alma)
9. [App Store'a Gönderme](#9-app-storea-gönderme)
10. [Google Play'e Gönderme](#10-google-playe-gönderme)
11. [Güncelleme Yayınlama (Sonraki Sürümler)](#11-güncelleme-yayınlama-sonraki-sürümler)
12. [Sık Karşılaşılan Sorunlar](#12-sık-karşılaşılan-sorunlar)

---

## 1. GEREKSİNİMLER

### Bilgisayarınızda Kurulu Olması Gerekenler

| Yazılım | Nasıl Kontrol Edilir | Kurulum Linki |
|---------|---------------------|---------------|
| Node.js (v18+) | Terminalde: `node -v` | https://nodejs.org |
| npm | Terminalde: `npm -v` | Node ile birlikte gelir |
| EAS CLI | Terminalde: `eas --version` | Aşağıda anlatıldı |

**EAS CLI Kurulumu (Bir kez yapılır):**
```bash
npm install -g eas-cli
```

### Ödeme Gerektiren Hesaplar

| Platform | Ücret | Ne İşe Yarar |
|----------|-------|--------------|
| **Apple Developer Program** | $99/yıl | iOS uygulaması yayınlamak için zorunlu |
| **Google Play Console** | $25 (bir kerelik) | Android uygulaması yayınlamak için zorunlu |

> **ÖNEMLİ:** Bu hesapları açmadan build alamaz ve mağazaya gönderemezsiniz.

---

## 2. EXPO & EAS HESABI KURULUMU

### 2.1 — Expo Hesabı Oluşturma

1. **https://expo.dev** adresine gidin
2. "Sign Up" butonuna tıklayın
3. E-posta, kullanıcı adı ve şifre girin → Hesap oluşturun
4. E-postanıza gelen doğrulama linkine tıklayın

### 2.2 — Terminalde Giriş Yapma

Proje klasörüne gidin:
```bash
cd /Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app
```

EAS ile giriş yapın:
```bash
eas login
```
Expo kullanıcı adı ve şifrenizi girin.

Girişin başarılı olduğunu kontrol edin:
```bash
eas whoami
# Çıktı: kullanıcı adınız yazmalı
```

### 2.3 — Projeyi EAS'e Bağlama

```bash
eas init
```

Bu komut expo.dev'de "zmatik-app" adında bir proje oluşturur ve `app.json` içindeki `projectId` değerini otomatik günceller.

---

## 3. APPLE DEVELOPER HESABI (iOS)

> iOS'ta yayın yapmak istiyorsanız bu bölümü takip edin.
> Sadece Android istiyorsanız Bölüm 5'e geçin.

### 3.1 — Hesap Açma

1. **https://developer.apple.com/programs/enroll/** adresine gidin
2. Bir Apple ID ile giriş yapın (yoksa önce oluşturun: https://appleid.apple.com)
3. "Start Your Enrollment" butonuna tıklayın
4. "Individual / Sole Proprietor / Single Person Business" seçin
5. Kredi kartı bilgilerinizi girin — **$99/yıl** ücret kesilir
6. Onay e-postası gelene kadar bekleyin (genellikle 24-48 saat)

### 3.2 — Gereken Bilgileri Toplama

Hesabınız aktif olduktan sonra şu bilgilere ihtiyacınız var:

**Apple ID:** developer.apple.com'a giriş yaptığınız e-posta (örn: `sizin@email.com`)

**Team ID (Takım Kimliği):**
1. https://developer.apple.com/account adresine gidin
2. Sol menüden "Membership Details"e tıklayın
3. "Team ID" satırındaki kodu kopyalayın
4. Örnek görünüm: `ABCDE12345` (10 karakter)

---

## 4. APP STORE CONNECT — UYGULAMA OLUŞTURMA

### 4.1 — App Store Connect'e Giriş

1. **https://appstoreconnect.apple.com** adresine gidin
2. Apple Developer hesabınızla giriş yapın

### 4.2 — Yeni Uygulama Oluşturma

1. "My Apps" sayfasında sol üstteki **"+"** butonuna tıklayın
2. "New App" seçeneğini seçin
3. Açılan formu doldurun:

| Alan | Doldurulacak Değer |
|------|--------------------|
| **Platforms** | iOS işaretleyin |
| **Name** | `Zmatik - İslami Uygulama` |
| **Primary Language** | Turkish |
| **Bundle ID** | `com.zmatik.islamicapp` — Dropdown'dan seçin |
| **SKU** | `zmatik-islamicapp-001` |
| **User Access** | Full Access |

4. "Create" butonuna tıklayın

### 4.3 — App ID (ascAppId) Bilgisini Alma

1. Uygulamanız oluşturulduktan sonra "App Information" sayfasına gidin
2. URL'deki sayıya bakın: `https://appstoreconnect.apple.com/apps/`**`1234567890`**`/...`
3. Bu numarayı kopyalayın — `ascAppId` olarak kullanacaksınız

### 4.4 — Ek Bilgiler

**Privacy Policy URL (zorunlu):**
- Kendi sitenizin gizlilik politikası yoksa ücretsiz oluşturun: https://www.privacypolicygenerator.info

**Pricing:** Free seçin

**Age Rating:** "4+" seçin

---

## 5. GOOGLE PLAY CONSOLE HESABI (Android)

### 5.1 — Hesap Açma

1. **https://play.google.com/console/signup** adresine gidin
2. Bir Google hesabıyla giriş yapın
3. Geliştirici türünü seçin: "Bireysel"
4. Geliştirici adınızı girin: `Zmatik` veya kendi adınız
5. İletişim bilgilerini doldurun
6. **$25** kayıt ücretini ödeyin (bir kerelik, ömür boyu geçerli)
7. Hesabınızın onaylanmasını bekleyin (birkaç saat - 2 gün)

### 5.2 — Servis Hesabı Oluşturma (Otomatik Yükleme İçin)

Bu adım, EAS'in sizin adınıza otomatik olarak Play Store'a yüklemesi için gereklidir.

**Adım 1: Google Cloud Console'a Gidin**
1. **https://console.cloud.google.com** adresine gidin
2. Google hesabınızla giriş yapın

**Adım 2: Proje Oluşturun**
1. Sol üstteki proje seçicisine tıklayın → "New Project"
2. Proje adı: `zmatik-play-store`
3. "Create" butonuna tıklayın

**Adım 3: Google Play Android Developer API'yi Etkinleştirin**
1. Sol menüden "APIs & Services" → "Library"e gidin
2. Arama kutusuna `Google Play Android Developer API` yazın
3. Çıkan sonuca tıklayın → "Enable" butonuna basın

**Adım 4: Servis Hesabı Oluşturun**
1. Sol menüden "IAM & Admin" → "Service Accounts"a gidin
2. "Create Service Account" butonuna tıklayın
3. Bilgileri doldurun:
   - Name: `zmatik-eas-uploader`
   - Description: `EAS otomatik yükleme için`
4. "Create and Continue" tıklayın
5. Role için: "Basic" → "Editor" seçin
6. "Continue" → "Done" tıklayın

**Adım 5: JSON Anahtarı İndirin**
1. Oluşturduğunuz servis hesabının satırına tıklayın
2. Üstteki "Keys" sekmesine gidin
3. "Add Key" → "Create New Key" seçin
4. Format: **JSON** seçili olarak "Create" tıklayın
5. JSON dosyası bilgisayarınıza inecek
6. Bu dosyayı şu konuma taşıyın:
   ```
   /Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app/google-service-account.json
   ```

**Adım 6: Play Console'da Yetki Verin**
1. **https://play.google.com/console** adresine gidin
2. Sol menüden "Setup" → "API access"e gidin
3. "Link an existing Google Cloud project" seçin → Az önce oluşturduğunuz projeyi seçin
4. Sayfanın altında servis hesabınızı görün → "Grant access" tıklayın
5. Rol: "Release manager" seçin → "Invite user" tıklayın

---

## 6. GOOGLE PLAY — UYGULAMA OLUŞTURMA

1. **https://play.google.com/console** adresine gidin
2. "Create app" butonuna tıklayın
3. Formu doldurun:

| Alan | Değer |
|------|-------|
| **App name** | `Zmatik - İslami Uygulama` |
| **Default language** | Turkish |
| **App or game** | App |
| **Free or paid** | Free |

4. "Create app" tıklayın

**Store Listing (Mağaza Sayfası) — Doldurun:**

- **Short description** (max 80 karakter):
  `Namaz vakitleri, Zikirmatik, Kuran-ı Kerim ve İslami rehber`

- **Full description** (max 4000 karakter):
  Zmatik; namaz vakitleri bildirimi, zikirmatik, Kuran-ı Kerim okuma ve dinleme, dua ve zikir kütüphanesi, hicri takvim ve İslami bilgi içerikleriyle müslümanların günlük dini hayatını kolaylaştıran kapsamlı bir uygulamadır.

- **App icon**: `assets/icon.png` dosyasını yükleyin (512x512 px PNG)
- **Feature graphic**: 1024x500 px bir görsel oluşturun (Canva ile ücretsiz yapılabilir)
- **Screenshots**: En az 2 ekran görüntüsü

**Content Rating:** "Reference" → tüm sorulara "No" → Rating: PEGI 3

**Data Safety:** Location (Evet), diğerleri Hayır

---

## 7. EAS.JSON DOSYASINI DOLDURMA

Dosyayı açın:
```bash
open /Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app/eas.json
```

Şu kısımları gerçek bilgilerinizle değiştirin:

```json
"submit": {
  "production": {
    "ios": {
      "appleId": "SENİN_EMAIL@example.com",
      "ascAppId": "1234567890",
      "appleTeamId": "ABCDE12345"
    },
    "android": {
      "serviceAccountKeyPath": "./google-service-account.json",
      "track": "production"
    }
  }
}
```

| Alan | Nereden Bulunur |
|------|----------------|
| `appleId` | Apple Developer hesabınızın e-postası |
| `ascAppId` | Bölüm 4.3'te kopyaladığınız App URL numarası |
| `appleTeamId` | developer.apple.com → Membership → Team ID |

---

## 8. PRODUCTION BUILD ALMA

> Build işlemi Expo'nun bulut sunucularında gerçekleşir.
> Bilgisayarınız kapalı olsa da devam eder. Ortalama süre: 15–30 dakika.

Proje klasöründe terminali açın:
```bash
cd /Users/erdemgokmuharremoglu/Desktop/zikirmatik/zmatik-app
```

### Android Build (.aab dosyası — Google Play için):
```bash
eas build --platform android --profile production
```
"Generate a new Android Keystore?" sorusuna → **Yes** deyin (otomatik oluşturulur ve Expo'da saklanır)

### iOS Build (.ipa dosyası — App Store için):
```bash
eas build --platform ios --profile production
```
Sertifika sorularına → **Yes** deyin

### İkisi Birden:
```bash
eas build --platform all --profile production
```

### Build Durumunu Kontrol Etme:
```bash
eas build:list
```
`Status: finished` gördüğünüzde hazırdır.

---

## 9. APP STORE'A GÖNDERME

### Otomatik Gönderme:
```bash
eas submit --platform ios --latest
```

### App Store Connect'te Son Adımlar:

1. **https://appstoreconnect.apple.com** → "My Apps" → "Zmatik" → "1.0"
2. Yüklenen build'i seçin
3. "What's New" kısmına yazın:
   ```
   İlk sürüm: Namaz vakitleri, Zikirmatik, Kuran-ı Kerim, Dua ve Zikir kütüphanesi
   ```
4. En az 3 ekran görüntüsü yükleyin (iPhone 6.9" boyutu)
5. **"Submit for Review"** butonuna tıklayın

**Apple inceleme süresi:** 1–3 iş günü

---

## 10. GOOGLE PLAY'E GÖNDERME

### Otomatik Gönderme:
```bash
eas submit --platform android --latest
```

### Sonra Play Console'da:

1. **https://play.google.com/console** → "Zmatik"
2. Sol menüden "Testing" → "Internal testing"
3. "Create new release" → .aab dosyasını yükleyin (EAS zaten yükledi ise seçin)
4. Release notes yazın → "Start rollout to Internal testing"
5. E-postanıza test linki gelecek → Uygulamayı indirin ve test edin
6. Test tamam ise: Sol menüden "Production" → "Create new release" → "Start rollout to Production"

**Google inceleme süresi (ilk uygulama):** 3–7 iş günü

---

## 11. GÜNCELLEME YAYINLAMA (SONRAKI SÜRÜMLER)

### Küçük Değişiklik (UI, metin, hata düzeltmesi) — Build almaya GEREK YOK:
```bash
eas update --branch production --message "Hata düzeltmesi"
```
Kullanıcılar otomatik olarak güncellenir.

### Büyük Değişiklik (Yeni özellik, izin değişikliği):

Önce `app.json`'da versiyonları artırın:
```json
"version": "1.0.1",
"ios": { "buildNumber": "2" },
"android": { "versionCode": 2 }
```

Sonra:
```bash
eas build --platform all --profile production
eas submit --platform all --latest
```

---

## 12. SIK KARŞILAŞILAN SORUNLAR

| Hata | Sebep | Çözüm |
|------|-------|-------|
| "Bundle identifier already exists" | ID başkası tarafından alınmış | `app.json`'da `bundleIdentifier` değiştirin |
| "Invalid provisioning profile" | iOS sertifikası geçersiz | `eas credentials` → yeni sertifika oluşturun |
| "Google API Error: 403" | Servis hesabı yetkisi yok | Bölüm 5.2 Adım 6'yı tekrarlayın |
| Build "failed" | Çeşitli sebepeler | `eas build:list` ile build ID alıp `eas build:view [ID]` ile logu inceleyin |
| Apple rejected: "2.1 Performance" | Crash veya hata | Hataları düzeltin, yeni sürüm gönderin |

---

## ÖZET — KONTROL LİSTESİ

```
[ ] npm install -g eas-cli
[ ] expo.dev'de hesap oluşturuldu
[ ] eas login yapıldı
[ ] eas init ile proje bağlandı

── iOS İçin ──────────────────────────────────
[ ] Apple Developer hesabı açıldı ($99/yıl)
[ ] App Store Connect'te uygulama oluşturuldu
[ ] Apple ID, Team ID, ascAppId toplandı
[ ] eas.json iOS bilgileri dolduruldu

── Android İçin ──────────────────────────────
[ ] Google Play Console açıldı ($25)
[ ] Servis hesabı JSON oluşturuldu ve proje klasörüne taşındı
[ ] Play Console'da servis hesabına yetki verildi
[ ] eas.json Android bilgileri dolduruldu
[ ] Play Console'da uygulama oluşturuldu

── Build & Yayın ─────────────────────────────
[ ] eas build --platform android --profile production
[ ] eas build --platform ios --profile production
[ ] eas submit --platform android --latest
[ ] eas submit --platform ios --latest
[ ] App Store'da "Submit for Review" tıklandı
[ ] Play Store'da "Start rollout to Production" tıklandı
```

---

## YARDIMCI LİNKLER

| Kaynak | Link |
|--------|------|
| Expo EAS Dokümantasyon | https://docs.expo.dev/eas/ |
| Apple Developer Portal | https://developer.apple.com |
| App Store Connect | https://appstoreconnect.apple.com |
| Google Play Console | https://play.google.com/console |
| Google Cloud Console | https://console.cloud.google.com |
| Gizlilik Politikası Oluşturucu | https://www.privacypolicygenerator.info |
| Canva (Görsel Oluşturma) | https://www.canva.com |
