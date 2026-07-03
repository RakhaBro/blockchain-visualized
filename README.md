# Blockchain Visualized

Clone interaktif dari [andersbrownworth.com/blockchain](https://andersbrownworth.com/blockchain)
untuk menjelaskan mekanisme blockchain secara bertahap. Dibangun dengan
**React + Vite + TypeScript**.

## Tahapan

| Halaman | Konsep |
| --- | --- |
| **Hash** | Fungsi hash SHA256 — deterministik & sensitif terhadap perubahan input. |
| **Block** | Proof-of-work: cari `Nonce` sampai hash diawali `0000` (tombol Mine). |
| **Blockchain** | 5 blok dirangkai lewat field `Prev`; mengubah satu blok membatalkan semua blok setelahnya. |
| **Distributed** | 3 peer (A/B/C) menyimpan salinan rantai; penyimpangan mudah terdeteksi. |
| **Tokens** | Blok berisi transaksi (`$`, `From`, `To`) alih-alih data bebas. |
| **Public / Private Keys** | Tanda tangan digital ECDSA (kurva secp256k1): sign dengan private key, verify dengan public key. |

## Detail teknis

- **Hashing**: [`js-sha256`](https://www.npmjs.com/package/js-sha256) (SHA256).
- **Kesulitan mining**: hash harus diawali `0000` — lihat `DIFFICULTY_PREFIX` di [src/lib/crypto.ts](src/lib/crypto.ts).
- **Kriptografi kunci**: [`@noble/secp256k1`](https://www.npmjs.com/package/@noble/secp256k1) + `@noble/hashes` — lihat [src/lib/keys.ts](src/lib/keys.ts).
- **Rantai**: logika prev/hash/valid di [src/lib/chain.ts](src/lib/chain.ts), dipakai bersama oleh halaman Blockchain & Distributed.

## Menjalankan

```bash
npm install
npm run dev      # dev server di http://localhost:5173
npm run build    # build produksi ke dist/
```

## Struktur

```
src/
  lib/         crypto.ts, chain.ts, keys.ts   — logika inti
  components/  Nav, Field, ChainBlock         — UI dipakai ulang
  pages/       Hash, Block, Blockchain, Distributed, Tokens, Keys
  App.tsx      routing (HashRouter)
```
