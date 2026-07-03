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
        kode acak dengan jumlah karakter yang selalu tetap. Sifatnya: data yang
        sama <b>selalu</b> menghasilkan kode yang sama, tapi mengubah satu huruf
        saja membuat kodenya berubah total dan tak bisa ditebak. Kode inilah yang
        disebut <b>hash</b>, dan ia jadi fondasi semua tahap berikutnya. Coba
        ketik apa saja di bawah dan perhatikan hash-nya berubah.
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
