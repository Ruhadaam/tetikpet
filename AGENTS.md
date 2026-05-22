# Üretim Stok Takip Sistemi - Proje Planı (Versiyon 4)

Bu doküman, esnek üretim mimarisine, yeni eklenen Müşteri Yönetimine ve Müşteri ilişkili Üretim Çıkışı (Sevkiyat) modülüne göre güncellenmiştir.

---

## 🛠 Proje Özeti

Sistem, fabrikadaki bağımsız makineleri, ürün havuzunu, yapılan anlık üretim adetlerini, müşteri listesini ve bu müşterilere yapılan sevkiyatları kayıt altına alarak güncel depo stok durumunu otomatik olarak yönetir.

İlk aşamada, sistemin yönetim merkezi olacak olan **Web tabanlı Admin Paneli** ve veri tabanı altyapısı geliştirilecektir. Admin; kullanıcı rollerini, makineleri, ürünleri ve müşterileri tanımlayıp yönetebilecektir.

---

## 🚀 1. Aşama Kapsamı (MVP)

- **Kimlik Doğrulama & Roller:** Admin (Tam yetkili) ve İşçi (Worker - Sadece üretim/çıkış kaydı girer) rolleri.
- **Bağımsız Makine Yönetimi:** Makinelerin sadece isimleri ile sisteme kaydedilmesi.
- **Bağımsız Ürün Yönetimi:** Makinelerden bağımsız, SKU ve isim bazlı ürün havuzu. Stok tipi tamsayı (`INT`).
- **Müşteri Yönetimi (Yeni):** Ürün gönderilecek firmaların/müşterilerin ad ve telefon bilgisiyle sisteme kaydedilmesi.
- **Esnek Üretim Girişi & Otomatik Artış:** Üretim esnasında arayüzden **Ürün**, **Makine** ve **Miktar** seçilerek kayıt girilir. Ürün stoku otomatik artar.
- **Müşteri İlişkili Üretim Çıkışı & Otomatik Düşüş:** Sevkiyat esnasında arayüzden **Ürün**, **Müşteri** ve **Miktar** seçilerek kayıt girilir. Ürün stoku otomatik azalır.

---

## 🗄 Güncel Veri Modeli (Database Schema)

### 1. `profiles` (Kullanıcı Profilleri)

- `id` (UUID, Primary Key -> auth.users)
- `email` (VARCHAR)
- `full_name` (VARCHAR)
- `role` (ENUM: 'ADMIN', 'WORKER')

### 2. `machines` (Makine Havuzu)

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)

### 3. `products` (Ürün Havuzu)

- `id` (UUID, Primary Key)
- `sku` (VARCHAR, Unique)
- `name` (VARCHAR)
- `stock_quantity` (INT) - _Toplam güncel stok._

### 4. `customers` (Müşteri Kartları)

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique) - _Müşteri / Firma Adı._
- `phone` (VARCHAR) - _Telefon Numarası._

### 5. `productions` (Üretim Giriş Kayıtları)

- `id` (UUID, Primary Key)
- `product_id` (UUID, Foreign Key -> products.id)
- `machine_id` (UUID, Foreign Key -> machines.id)
- `quantity` (INT)

### 6. `dispatches` (Üretim Çıkış / Sevkiyat Kayıtları)

- `id` (UUID, Primary Key)
- `product_id` (UUID, Foreign Key -> products.id)
- `customer_id` (UUID, Foreign Key -> customers.id) - _Ürünü alan kayıtlı müşteri._
- `quantity` (INT)
- `created_by` (UUID, Foreign Key -> profiles.id)

---

## ⚡ Veri Tabanı Otomasyonları (Tetikleyiciler)

1. **`on_auth_user_created`**: Yeni kullanıcı geldiğinde otomatik profil açar.
2. **`on_production_inserted`**: Üretim girildiğinde `products.stock_quantity` değerini **ARTIRIR**.
3. **`on_dispatch_inserted`**: Sevkiyat girildiğinde `products.stock_quantity` değerini **AZALTIR**.

### 🤖 Agent İçin Mimari Not:

Next.js tarafında kodlama yaparken ürün stoklarını manuel güncelleyecek (`UPDATE products`) kodlar kesinlikle **YAZILMAMALIDIR**. Stok yönetimi tamamen `productions` ve `dispatches` tablolarına atılacak `INSERT` işlemlerine bağlı olarak tetikleyicilerle yürütülür. Müşteri seçimi `dispatches` formunda bir select/combobox bileşeni üzerinden `customers` tablosundan beslenmelidir.
