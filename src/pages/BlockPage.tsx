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
      <div className="intro">
        <p>
          Setiap block menampung dua hal: sebuah <b>Nonce</b> (angka sekali
          pakai) dan <b>Data</b> (isi apa pun yang ingin disimpan). "Menambang"
          (mining) artinya komputer harus menyelesaikan sebuah puzzle.
        </p>
        <p>
          Apa puzzle-nya? Begitu Data ditulis ke dalam block, supaya block itu
          dianggap <b>valid</b> oleh sistem, komputer harus terus mencoba Nonce
          acak sampai menemukan satu Nonce yang &mdash; kalau digabung dengan
          Data lalu di-hash &mdash; menghasilkan kode hash yang diawali beberapa
          angka nol.
        </p>
        <p>
          Mencari Nonce yang pas butuh ribuan percobaan, dan kerja keras itulah
          yang bikin block sah dan sulit dipalsukan. Ubah Data lalu tekan{' '}
          <b>Mine</b> untuk melihat komputer mencari Nonce-nya.
        </p>
      </div>

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
