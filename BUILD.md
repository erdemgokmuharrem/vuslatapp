# Zmatik App Build Guide

Bu rehber Zmatik İslami uygulamasının build süreçlerini açıklar.

## Gereksinimler

### Genel
- Node.js 18+
- npm veya yarn
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)

### iOS
- macOS
- Xcode 14+
- iOS Simulator
- Apple Developer Account

### Android
- Android Studio
- Android SDK
- Java 11+

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS pods yükle (sadece macOS)
npm run install:pods

# Expo doctor kontrolü
npm run doctor
```

## Geliştirme

### Yerel Geliştirme
```bash
# Geliştirme sunucusunu başlat
npm start

# Android emulator
npm run android

# iOS simulator (sadece macOS)
npm run ios

# Web browser
npm run web

# Cache temizleyerek başlat
npm run start:clear

# Tunnel modu (fiziksel cihaz)
npm run start:tunnel
```

### Environment Yönetimi
```bash
# Development environment
npm run env:development

# Staging environment
npm run env:staging

# Production environment
npm run env:production
```

## Build Süreçleri

### EAS Build (Önerilen)

#### Development Build
```bash
# Development client build
eas build --profile development

# Platform specific
npm run build:android
npm run build:ios
npm run build:all
```

#### Preview Build
```bash
# Preview build (internal testing)
npm run build:preview
```

#### Production Build
```bash
# Production build
npm run build:production
```

### Local Build (Alternatif)
```bash
# Prebuild (native kod oluştur)
npm run prebuild

# Clean prebuild
npm run prebuild:clean
```

## Test ve Kalite Kontrol

### Code Quality
```bash
# TypeScript kontrolü
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Dependency analizi
npm run analyze
```

### Testing
```bash
# Unit testler
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
```

## Deployment

### App Store / Play Store Submission
```bash
# iOS App Store
npm run submit:ios

# Google Play Store
npm run submit:android

# Her iki platform
npm run submit:all
```

### Over-the-Air Updates
```bash
# Production update
npm run update:production

# Preview update
npm run update:preview
```

## Build Profiles

### Development
- **Amaç:** Geliştirme ve debugging
- **Platform:** iOS Simulator, Android Emulator
- **Features:** Debug mode, hot reload
- **Distribution:** Internal

### Preview
- **Amaç:** Internal testing, QA
- **Platform:** Fiziksel cihazlar
- **Features:** Production benzeri, test verileri
- **Distribution:** Internal (TestFlight, Internal Testing)

### Production
- **Amaç:** App Store/Play Store release
- **Platform:** Tüm cihazlar
- **Features:** Optimized, analytics enabled
- **Distribution:** Public stores

## Environment Variables

### Development (.env.development)
- Debug mode aktif
- Development API endpoints
- Test Firebase projesi
- Analytics kapalı

### Staging (.env.staging)
- Production benzeri ayarlar
- Staging API endpoints
- Staging Firebase projesi
- Analytics aktif

### Production (.env.production)
- Optimized settings
- Production API endpoints
- Production Firebase projesi
- Tüm analytics aktif

## Troubleshooting

### Yaygın Sorunlar

#### Build Hataları
```bash
# Node modules temizle
npm run install:clean

# Cache temizle
npm run start:clear

# Prebuild temizle
npm run prebuild:clean
```

#### iOS Sorunları
```bash
# Pods yeniden yükle
cd ios && pod deintegrate && pod install

# Xcode cache temizle
rm -rf ~/Library/Developer/Xcode/DerivedData
```

#### Android Sorunları
```bash
# Gradle cache temizle
cd android && ./gradlew clean

# Android cache temizle
rm -rf ~/.gradle/caches
```

### Debug İpuçları

1. **Metro bundler sorunları:** `npm run start:clear`
2. **Native module sorunları:** `npm run prebuild:clean`
3. **Build cache sorunları:** `eas build --clear-cache`
4. **Dependency sorunları:** `npm run install:clean`

## CI/CD Pipeline

### GitHub Actions Örneği
```yaml
name: Build and Deploy
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm test
      - run: eas build --platform all --non-interactive
```

## Release Checklist

### Pre-Release
- [ ] Tüm testler geçiyor
- [ ] Linting hataları yok
- [ ] TypeScript hataları yok
- [ ] Environment variables güncellendi
- [ ] Version number artırıldı
- [ ] Changelog güncellendi

### Build
- [ ] Production build başarılı
- [ ] iOS ve Android builds test edildi
- [ ] App Store/Play Store metadata hazır
- [ ] Screenshots güncellendi

### Post-Release
- [ ] App Store/Play Store'da yayınlandı
- [ ] Release notes paylaşıldı
- [ ] Monitoring kontrol edildi
- [ ] User feedback takip ediliyor

---

**Not:** Bu rehber sürekli güncellenmektedir. Sorularınız için development team ile iletişime geçin.
