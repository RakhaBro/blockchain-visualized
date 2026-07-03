import { useState } from 'react'
import Field from '../components/Field'
import { randomPrivateKey, derivePublicKey, sign, verify } from '../lib/keys'

export default function KeysPage() {
  // --- Keys ---
  const [priv, setPriv] = useState(() => randomPrivateKey())
  const pub = derivePublicKey(priv)

  // --- Signatures ---
  const [message, setMessage] = useState('Halo, ini pesan yang saya tanda tangani')
  const signature = sign(message, priv)

  // --- Verify (transaction) ---
  const [vMessage, setVMessage] = useState('Halo, ini pesan yang saya tanda tangani')
  const [vSig, setVSig] = useState('')
  const [vPub, setVPub] = useState('')
  const verified = vSig && vPub ? verify(vMessage, vSig, vPub) : null

  return (
    <div className="page">
      <span className="eyebrow">Tanda Tangan Digital</span>
      <h1>
        <span className="grad">Kunci</span> Rahasia &amp; Publik
      </h1>
      <div className="intro">
        <p>
          Kalau catatan transaksi terbuka untuk semua orang, bagaimana mencegah
          orang lain membelanjakan uangmu? Jawabannya: setiap orang punya
          sepasang kunci &mdash; satu <b>kunci rahasia</b> yang disimpan sendiri,
          dan satu <b>kunci publik</b> yang boleh dibagikan.
        </p>
        <p>
          Saat mengirim uang, kamu "menandatangani" transaksi itu memakai kunci
          rahasiamu. Siapa pun lalu bisa memakai kunci publikmu untuk memastikan
          tanda tangan itu benar-benar darimu &mdash; tanpa pernah bisa menebak
          kunci rahasianya. Jadi hanya pemilik kunci rahasia yang bisa
          membelanjakan uang di alamat itu.
        </p>
        <p>
          Coba ubah salah satu isian di bawah dan lihat tanda tangannya langsung
          dianggap palsu.
        </p>
      </div>

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
        <h2 style={{ marginTop: 0 }}>Tanda Tangan</h2>
        <p className="intro" style={{ marginBottom: '0.75rem' }}>
          Buat tanda tangan untuk sebuah pesan memakai kunci rahasia di atas.
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
          Kirim ke Cek Keaslian &darr;
        </button>
      </div>

      {/* Verify / Transaction */}
      <div
        className={
          'card ' + (verified === null ? '' : verified ? 'valid' : 'invalid')
        }
      >
        <h2 style={{ marginTop: 0 }}>Cek Keaslian</h2>
        <p className="intro" style={{ marginBottom: '0.75rem' }}>
          Siapa pun bisa memastikan pesan ini benar-benar ditandatangani si
          pemilik kunci &mdash; cukup pakai kunci publiknya, tanpa perlu kunci
          rahasia. Ubah salah satu isian, dan tanda tangannya langsung dianggap
          palsu.
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
            <span className="status">— (isi tanda tangan &amp; kunci publik)</span>
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
