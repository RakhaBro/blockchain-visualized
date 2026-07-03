import { sha256 } from 'js-sha256'

/** Kesulitan proof-of-work: hash harus diawali sejumlah "0" ini. */
export const DIFFICULTY_PREFIX = '0000'

/** Hash SHA256 dari sebuah string, dikembalikan sebagai hex. */
export function hash(input: string): string {
  return sha256(input)
}

/** Apakah sebuah hash memenuhi syarat kesulitan (diawali DIFFICULTY_PREFIX)? */
export function isValidHash(h: string): boolean {
  return h.startsWith(DIFFICULTY_PREFIX)
}

/**
 * Mining: cari nonce terkecil (mulai dari 0) sehingga hash(payload(nonce))
 * memenuhi syarat kesulitan. `payloadFor` membangun string yang di-hash
 * untuk sebuah nilai nonce tertentu.
 */
export function mine(payloadFor: (nonce: number) => string): number {
  let nonce = 0
  while (!isValidHash(hash(payloadFor(nonce)))) {
    nonce++
  }
  return nonce
}
