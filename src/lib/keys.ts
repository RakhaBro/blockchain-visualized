import * as secp from '@noble/secp256k1'
import { sha256 as nobleSha256 } from '@noble/hashes/sha2.js'
import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from 'js-sha256'

/**
 * Kriptografi kunci publik/privat memakai kurva secp256k1 (ECDSA),
 * kurva yang sama dipakai Bitcoin & Ethereum.
 */

// @noble/secp256k1 v3 butuh fungsi hash disuntikkan untuk operasi sinkron.
secp.hashes.sha256 = (m: Uint8Array) => nobleSha256(m)
secp.hashes.hmacSha256 = (k: Uint8Array, m: Uint8Array) => hmac(nobleSha256, k, m)

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function fromHex(hex: string): Uint8Array {
  const clean = hex.trim().toLowerCase().replace(/[^0-9a-f]/g, '')
  const out = new Uint8Array(Math.floor(clean.length / 2))
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return out
}

/** Private key acak (32 byte) sebagai string hex. */
export function randomPrivateKey(): string {
  return toHex(secp.utils.randomSecretKey())
}

/** Turunkan public key (uncompressed, hex) dari private key hex. */
export function derivePublicKey(privateKeyHex: string): string {
  try {
    return toHex(secp.getPublicKey(fromHex(privateKeyHex), false))
  } catch {
    return ''
  }
}

/** Digest 32-byte dari pesan (SHA256) yang akan ditandatangani. */
function messageHash(message: string): Uint8Array {
  return fromHex(sha256(message))
}

/** Tanda tangani pesan dengan private key. Mengembalikan signature hex. */
export function sign(message: string, privateKeyHex: string): string {
  try {
    return toHex(secp.sign(messageHash(message), fromHex(privateKeyHex)))
  } catch {
    return ''
  }
}

/** Verifikasi signature terhadap pesan & public key. */
export function verify(
  message: string,
  signatureHex: string,
  publicKeyHex: string,
): boolean {
  try {
    return secp.verify(
      fromHex(signatureHex),
      messageHash(message),
      fromHex(publicKeyHex),
    )
  } catch {
    return false
  }
}

export { toHex }
