import { useState } from 'react'
import Field from '../components/Field'
import { hash } from '../lib/crypto'

export default function HashPage() {
  const [data, setData] = useState('')

  return (
    <div className="page">
      <span className="eyebrow">Sidik Jari Digital</span>
      <h1>
        <span className="grad">Hash</span>: Kode Unik
      </h1>
      <p className="intro">
        Hash adalah metode enkripsi yang mengubah data apa pun menjadi sebuah
        kode acak dengan jumlah karakter yang selalu tetap. Ganti satu huruf
        saja, kodenya langsung berubah total &mdash; tapi data yang sama selalu
        menghasilkan kode yang sama. Coba ketik di bawah.
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
