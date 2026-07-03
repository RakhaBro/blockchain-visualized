import { useState } from 'react'
import Field from '../components/Field'
import { randomPrivateKey, derivePublicKey, sign, verify } from '../lib/keys'

export default function KeysPage() {
  // --- Keys ---
  const [priv, setPriv] = useState(() => randomPrivateKey())
  const pub = derivePublicKey(priv)

  // --- Signatures ---
  const [message, setMessage] = useState('This is a signed message')
  const signature = sign(message, priv)

  // --- Verify (transaction) ---
  const [vMessage, setVMessage] = useState('This is a signed message')
  const [vSig, setVSig] = useState('')
  const [vPub, setVPub] = useState('')
  const verified = vSig && vPub ? verify(vMessage, vSig, vPub) : null

  return (
    <div className="page">
      <span className="eyebrow">Digital Signatures</span>
      <h1>
        <span className="grad">Public / Private</span> Keys
      </h1>
      <p className="intro">
        Kepemilikan koin dijamin oleh pasangan kunci <b>secp256k1</b> (ECDSA).
        <b> Private key</b> menandatangani pesan; siapa pun bisa memverifikasi
        tanda tangan itu dengan <b>public key</b>-nya &mdash; tanpa pernah
        melihat private key. Beginilah hanya pemilik yang bisa membelanjakan
        dananya.
      </p>

      {/* Keys */}
      <div className="card valid">
        <h2 style={{ marginTop: 0 }}>Keys</h2>
        <Field label="Private">
          <textarea
            className="text mono"
            rows={2}
            value={priv}
            onChange={(e) => setPriv(e.target.value.trim())}
          />
          <button
            className="mine secondary"
            style={{ marginTop: '0.5rem' }}
            onClick={() => setPriv(randomPrivateKey())}
          >
            Random
          </button>
        </Field>
        <Field label="Public">
          <input className="text mono" readOnly value={pub} />
        </Field>
      </div>

      {/* Signatures */}
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Signatures</h2>
        <p className="intro" style={{ marginBottom: '0.75rem' }}>
          Tanda tangani sebuah pesan dengan private key di atas.
        </p>
        <Field label="Message">
          <textarea
            className="text"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Field>
        <Field label="Signature">
          <input className="text mono" readOnly value={signature} />
        </Field>
        <button
          className="mine secondary"
          onClick={() => {
            setVMessage(message)
            setVSig(signature)
            setVPub(pub)
          }}
        >
          Kirim ke Verify &darr;
        </button>
      </div>

      {/* Verify / Transaction */}
      <div
        className={
          'card ' + (verified === null ? '' : verified ? 'valid' : 'invalid')
        }
      >
        <h2 style={{ marginTop: 0 }}>Verify</h2>
        <p className="intro" style={{ marginBottom: '0.75rem' }}>
          Siapa pun dapat memverifikasi bahwa pesan ini ditandatangani oleh
          pemilik public key ini &mdash; tanpa private key. Ubah salah satu
          field dan tanda tangan menjadi tidak sah.
        </p>
        <Field label="Message">
          <textarea
            className="text"
            rows={3}
            value={vMessage}
            onChange={(e) => setVMessage(e.target.value)}
          />
        </Field>
        <Field label="Signature">
          <textarea
            className="text mono"
            rows={2}
            value={vSig}
            onChange={(e) => setVSig(e.target.value.trim())}
          />
        </Field>
        <Field label="Public">
          <textarea
            className="text mono"
            rows={2}
            value={vPub}
            onChange={(e) => setVPub(e.target.value.trim())}
          />
        </Field>
        <div>
          Status:{' '}
          {verified === null ? (
            <span className="status">— (isi signature &amp; public key)</span>
          ) : verified ? (
            <span className="status ok">VALID ✓</span>
          ) : (
            <span className="status bad">TIDAK VALID ✗</span>
          )}
        </div>
      </div>
    </div>
  )
}
