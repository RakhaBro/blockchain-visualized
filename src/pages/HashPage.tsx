import { useState } from 'react'
import Field from '../components/Field'
import { hash } from '../lib/crypto'

export default function HashPage() {
  const [data, setData] = useState('')

  return (
    <div className="page">
      <span className="eyebrow">Cryptographic Fingerprint</span>
      <h1>
        <span className="grad">SHA256</span> Hash
      </h1>
      <p className="intro">
        Sebuah fungsi hash mengubah data apa pun menjadi "sidik jari" dengan
        panjang tetap. Ubah teks di bawah dan perhatikan hash-nya berubah total
        walau hanya satu karakter yang diubah &mdash; namun input yang sama
        selalu menghasilkan hash yang sama.
      </p>

      <div className="card">
        <Field label="Data">
          <textarea
            className="text"
            rows={4}
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Ketik apa saja di sini..."
          />
        </Field>
        <Field label="Hash">
          <input className="text mono" readOnly value={hash(data)} />
        </Field>
      </div>
    </div>
  )
}
