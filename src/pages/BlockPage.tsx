import { useState } from 'react'
import Field from '../components/Field'
import { hash, isValidHash, mine } from '../lib/crypto'

/** Payload yang di-hash untuk sebuah blok tunggal. */
function blockPayload(index: number, nonce: number, data: string): string {
  return index + nonce + data
}

export default function BlockPage() {
  const [index] = useState(1)
  const [nonce, setNonce] = useState(72608)
  const [data, setData] = useState('')

  const h = hash(blockPayload(index, nonce, data))
  const valid = isValidHash(h)

  function handleMine() {
    setNonce(mine((n) => blockPayload(index, n, data)))
  }

  return (
    <div className="page">
      <span className="eyebrow">Menyegel Sebuah Blok</span>
      <h1>
        Sebuah <span className="grad">Block</span>
      </h1>
      <p className="intro">
        Sebuah blok baru dianggap sah kalau kode uniknya kebetulan diawali
        beberapa angka nol. Karena kode ini mustahil ditebak, komputer harus
        coba-coba mengganti satu angka acak (di sini disebut <b>Nonce</b>)
        berulang kali sampai ketemu. Kerja keras coba-coba inilah yang bikin
        blok sulit dipalsukan. Tekan <b>Mine</b> dan biarkan komputer mencarinya.
      </p>

      <div className={'block ' + (valid ? 'valid' : 'invalid')}>
        <div className="block__header">
          <span className="block__badge">
            <span className="cube" />
            BLOCK <span className="n">#{String(index).padStart(2, '0')}</span>
          </span>
          <span className={'block__status ' + (valid ? 'ok' : 'bad')}>
            <span className="dot" />
            {valid ? 'Valid' : 'Invalid'}
          </span>
        </div>
        <Field label="Nonce">
          <input
            className="text short mono"
            value={nonce}
            onChange={(e) => setNonce(Number(e.target.value) || 0)}
          />
        </Field>
        <Field label="Data">
          <textarea
            className="text"
            rows={4}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Field>
        <Field label="Hash">
          <input className="text mono" readOnly value={h} />
        </Field>
        <button className="mine" onClick={handleMine}>
          Mine
        </button>
      </div>
    </div>
  )
}
