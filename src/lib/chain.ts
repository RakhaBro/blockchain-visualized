import { hash, isValidHash, mine } from './crypto'

/** Hash "prev" untuk blok pertama (genesis): 64 nol. */
export const GENESIS_PREV = '0'.repeat(64)

/** Field mentah yang bisa diedit pengguna pada sebuah blok. */
export interface BlockData {
  nonce: number
  data: string
}

/** Hasil turunan (dihitung) untuk sebuah blok dalam rantai. */
export interface DerivedBlock {
  index: number
  prev: string
  hash: string
  valid: boolean
}

/** String yang di-hash untuk sebuah blok berantai. */
export function chainPayload(
  index: number,
  nonce: number,
  data: string,
  prev: string,
): string {
  return index + nonce + data + prev
}

/**
 * Hitung prev/hash/valid untuk seluruh rantai. Setiap blok mengunci hash
 * blok sebelumnya lewat field `prev`, sehingga mengubah satu blok akan
 * membatalkan semua blok setelahnya.
 */
export function computeChain(blocks: BlockData[]): DerivedBlock[] {
  const out: DerivedBlock[] = []
  let prev = GENESIS_PREV
  blocks.forEach((b, i) => {
    const index = i + 1
    const h = hash(chainPayload(index, b.nonce, b.data, prev))
    out.push({ index, prev, hash: h, valid: isValidHash(h) })
    prev = h
  })
  return out
}

/** Cari nonce yang valid untuk blok pada posisi `i` dengan prev tertentu. */
export function mineBlock(index: number, data: string, prev: string): number {
  return mine((n) => chainPayload(index, n, data, prev))
}
