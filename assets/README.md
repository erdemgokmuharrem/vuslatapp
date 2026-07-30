# Zmatik App Assets

Bu klasör Zmatik İslami uygulaması için gerekli tüm görsel varlıkları içerir.

## İkon Gereksinimleri

### Ana İkon (icon.png)
- **Boyut:** 1024x1024 px
- **Format:** PNG
- **Şeffaflık:** Desteklenmez (solid background gerekli)
- **Tasarım:** İslami hilal ve yıldız motifi, yeşil tonlarda

### iOS İkon (ios-icon.png)
- **Boyut:** 1024x1024 px
- **Format:** PNG
- **Köşeler:** Yuvarlatılmış (iOS otomatik uygular)
- **Tasarım:** Ana ikon ile aynı

### Android Adaptive İkon (adaptive-icon.png)
- **Boyut:** 1024x1024 px
- **Format:** PNG
- **Şeffaflık:** Desteklenir
- **Safe Zone:** Merkezi 768x768 px alan
- **Background:** #2E7D32 (İslami yeşil)

## Splash Screen Gereksinimleri

### Splash İkon (splash-icon.png)
- **Boyut:** 1200x1200 px
- **Format:** PNG
- **Şeffaflık:** Desteklenir
- **Background:** #2E7D32 (İslami yeşil)
- **Tasarım:** Minimalist hilal ve "Zmatik" yazısı

## Diğer İkonlar

### Notification İkon (notification-icon.png)
- **Boyut:** 96x96 px
- **Format:** PNG
- **Renk:** Monokrom (beyaz)
- **Tasarım:** Basit hilal motifi

### Favicon (favicon.png)
- **Boyut:** 32x32 px
- **Format:** PNG
- **Tasarım:** Küçük hilal motifi

## Tasarım Rehberi

### Renk Paleti
- **Ana Yeşil:** #2E7D32
- **Açık Yeşil:** #4CAF50
- **Koyu Yeşil:** #1B5E20
- **Altın Vurgu:** #FFD700
- **Beyaz:** #FFFFFF

### Tipografi
- **Ana Font:** System default (San Francisco/Roboto)
- **Başlık:** Bold, 18-24pt
- **Gövde:** Regular, 14-16pt

### İkonografi
- **Ana Motif:** İslami hilal ve yıldız
- **Stil:** Modern, minimalist
- **Çizgiler:** Yumuşak, yuvarlak
- **Gölge:** Hafif, doğal

## Dosya Yapısı
```
assets/
├── icon.png              # Ana uygulama ikonu
├── ios-icon.png          # iOS özel ikonu
├── adaptive-icon.png     # Android adaptive ikonu
├── splash-icon.png       # Splash screen ikonu
├── notification-icon.png # Bildirim ikonu
├── favicon.png           # Web favicon
└── README.md            # Bu dosya
```

## Üretim Notları

1. **Kalite:** Tüm ikonlar yüksek çözünürlükte olmalı
2. **Optimizasyon:** PNG dosyaları sıkıştırılmalı
3. **Test:** Farklı cihazlarda test edilmeli
4. **Tutarlılık:** Tüm platformlarda tutarlı görünüm
5. **Erişilebilirlik:** Yeterli kontrast oranı

## Güncelleme Süreci

İkon güncellemeleri için:
1. Tasarım dosyalarını güncelle
2. Tüm boyutları yeniden üret
3. app.json'da versiyonu artır
4. Test build oluştur
5. Tüm platformlarda test et

---

**Not:** Bu ikonlar İslami değerlere uygun olarak tasarlanmıştır ve telif hakkı korunmaktadır.
