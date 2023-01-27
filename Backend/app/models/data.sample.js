const toko = [
  {
    nama: "Kahf Official",
    kota: "Jakarta Selatan",
  },
  {
    nama: "Frisian Flag Official",
    kota: "Tangerang Selatan",
  },
  {
    nama: "Orient Food",
    kota: "Surabaya",
  },
  {
    nama: "Dettol, Vanish, & Harpic Official Store",
    kota: "Medan",
  },
  {
    nama: "Kerastase by MayMaySalon",
    kota: "Jakarta Barat",
  },
  {
    nama: "Keychron Indonesia",
    kota: "Jakarta Barat",
  },
  {
    nama: "Divipard",
    kota: "Jakarta Barat",
  },
  {
    nama: "fantemil store",
    kota: "Jakarta Barat",
  },
  {
    nama: "Essenzo Indonesia Official",
    kota: "Tangerang Selatan",
  },
  {
    nama: "Miisoo Official Shop",
    kota: "Tangerang Selatan",
  },
  {
    nama: "Skintific Official Store",
    kota: "Jakarta",
  },
  {
    nama: "thinkplus-Lenovo",
    kota: "Tangerang",
  },
];

const produk = [
  {
    nama: "Kahf Oil and Acne Care Face Wash 100 ml - Sabun Wajah Pria",
    harga: 40700,
    qty: 1,
    diskon: 20,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/12/23/946483af-8df4-4b2d-8e82-b4bca9e1dd60.png",
  },
  {
    nama: "Kahf Gentle Exfoliating Face Scrub 100 ml - Lawan Noda Hitam",
    harga: 40700,
    qty: 1,
    diskon: 20,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/12/23/1455347b-a711-4d57-8f07-9c446fe61d7d.png",
  },
  {
    nama: "Frisian Flag Milky Susu UHT Chocolate 115ml [12 pcs]",
    harga: 40400,
    qty: 1,
    diskon: 18,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/8/c8158a70-3b3b-4e8a-ad8e-ac154c63251e.jpg",
  },
  {
    nama: "Frisian Flag Purefarm Susu Bubuk Keluarga Fullcream [2x800g] Free Gift - Tempat Pensil",
    harga: 233600,
    qty: 1,
    diskon: 20,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/12/28/86829634-81e4-444b-8ed7-e19a38d77a5c.jpg",
  },
  {
    nama: "Fiesta Nugget Dino 500gr (Naget Ayam bentuk DInosaurus)",
    harga: 51500,
    qty: 1,
    diskon: 0,
    gambar:
      "https://images.tokopedia.net/img/cache/900/product-1/2019/5/12/12156420/12156420_9856e192-debe-445e-abbb-c273deb0c764_2048_2048",
  },
  {
    nama: "Fiesta Chicken Siomay - 180gr",
    harga: 24000,
    qty: 1,
    diskon: 0,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/6/12/011f41b4-722b-40ec-9409-3ba974071f93.jpg",
  },
  {
    nama: "Dettol Cairan Antiseptik 1L",
    harga: 200600,
    qty: 1,
    diskon: 22,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/22/c6cf9d97-bf97-4e9f-a3fd-f44bdbbe6baf.png",
  },
  {
    nama: "Dettol Hand Sanitizer & Surface Spray 2in1 50ml - Citrus Tea",
    harga: 18100,
    qty: 1,
    diskon: 9,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/11/1/4a03fa01-f18b-4569-b7f8-6e71aec03686.png",
  },
  {
    nama: "Kerastase Fresh Affair Refreshing Dry Shampoo Menyegarkan Rambut Lepek",
    harga: 390000,
    qty: 1,
    diskon: 22,
    gambar:
      "https://images.tokopedia.net/img/cache/900/hDjmkQ/2023/1/7/ac416696-9289-42c0-830f-04ac81e98cff.jpg",
  },
  {
    nama: "Kerastase Specifique Bain Prevention 250ml Shampoo Anti Rontok",
    harga: 840000,
    qty: 1,
    diskon: 45,
    gambar:
      "https://images.tokopedia.net/img/cache/900/hDjmkQ/2023/1/21/54955db8-8788-4e46-ae1e-81c4c1ea30b2.jpg",
  },
  {
    nama: "Keychron M1 Ultra-Light Optical Mouse - Black",
    harga: 690000,
    qty: 1,
    diskon: 0,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/12/25/7e4374a4-f7b2-45ba-a942-60789e146f3a.jpg",
  },
  {
    nama: "Keychron Q10 Alice Layout QMK Fully Assembled Knob Mechanical Keyboard - Silver Grey B, Red Switch",
    harga: 4000000,
    qty: 1,
    diskon: 5,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/11/27/20125844-60c8-4a76-92a1-7d4d8cc2c44f.jpg",
  },
  {
    nama: "Divipard Mouse Wireless Gaming Charging Honey Comb Q13 RGB Mode 7200 - Biru Muda",
    harga: 300000,
    qty: 1,
    diskon: 62,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/8/12/ff2718fe-3d27-4c73-9b21-468d64c54c94.jpg",
  },
  {
    nama: "Optical Mouse Kabel USB G5 Unitech Wired USB 1000DPI - Biru",
    harga: 100000,
    qty: 1,
    diskon: 87,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/14/1723ec17-b2b5-47ef-b4df-d2aa440d7552.jpg",
  },
  {
    nama: "Karpet Minimalis Import Polyester 100X150cm Anti Slip Aesthetic - 229",
    harga: 150000,
    qty: 1,
    diskon: 1,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/22/a9ba00f6-3572-4194-bc7b-1890e2eb4fba.jpg",
  },
  {
    nama: "Karpet Minimalis Aesthetic Import Polyester 150x200cm Anti Slip - 190",
    harga: 298000,
    qty: 1,
    diskon: 1,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/8/bdd4222c-747b-41fa-b515-ddc91ed3dbcf.jpg",
  },
  {
    nama: "Essenzo Beam Diffuser 300ml + Remote",
    harga: 395000,
    qty: 1,
    diskon: 24,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/3/67a67e19-8d4f-4a7b-a674-f6a260fbd332.jpg",
  },
  {
    nama: "Essenzo Kids Honey - Madu Fungsional untuk Bantu Nafsu Makan",
    harga: 215000,
    qty: 1,
    diskon: 18,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/3/5bf507b0-62fd-455c-87cc-40efd03e6ea5.jpg",
  },
  {
    nama: "MIISOO N95 KN95 Multicolor Korea KF94 Masker Kesehatan masker evo 4ply - Putih 1 Box",
    harga: 100000,
    qty: 1,
    diskon: 80,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/7/5/912088ba-7524-454d-8ef0-bce5c72aca1b.jpg",
  },
  {
    nama: "MIISOO Disposable Daily Fit mask Per BOX Masker Kesehatan 4ply - Fitmask Putih",
    harga: 80000,
    qty: 1,
    diskon: 63,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/1/14/fa115a2e-403c-4f20-86bd-14d26a96f8d2.jpg",
  },
  {
    nama: "SKINTIFIC-5X 2PCS Ceramide Low PH Oil Control Cleanser-80ml【BPOM】",
    harga: 238000,
    qty: 1,
    diskon: 25,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/12/3/b11cce6e-baea-41f1-9900-6b38a0d7ddab.jpg",
  },
  {
    nama: "SKINTIFIC Salicylic Acid Acne Powerful Set 3PCS",
    harga: 407000,
    qty: 1,
    diskon: 27,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/12/4/8a444d93-754d-43dd-a918-b886310fb9e3.jpg",
  },
  {
    nama: "Lenovo LP1S True Wireless Bluetooth Earphone TWS Noise Reduction - Hitam",
    harga: 145000,
    qty: 1,
    diskon: 0,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/12/4/1f72a3bc-b09f-453c-a5bd-5d4e7bc41b79.jpg",
  },
  {
    nama: "Lenovo LP3 Pro Bluetooth Headphones TWS Wireless LED Display Earphones - Hitam",
    harga: 139000,
    qty: 1,
    diskon: 0,
    gambar:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/12/9/4067219c-ab3c-4f27-a1fd-c33bf80c1017.jpg",
  },
];

module.exports = { toko, produk };
