import { useState } from 'react'
import Field from '../components/Field'
import {
  hash,
  isValidHash,
  mine,
} from '../lib/crypto'
import { GENESIS_PREV, chainPayload } from '../lib/chain'

interface Tx {
  amount: string
  from: string
  to: string
}

interface TokenBlock {
  nonce: number
  txs: Tx[]
}

/** Serialisasi transaksi menjadi string yang ikut di-hash. */
function serializeTxs(txs: Tx[]): string {
  return txs.map((t) => `$${t.amount}${t.from}${t.to}`).join('')
}

function initial(): TokenBlock[] {
  return [
    {
      nonce: 0,
      txs: [
        { amount: '25.00', from: 'Darcy', to: 'Bingley' },
        { amount: '4.27', from: 'Elizabeth', to: 'Jane' },
      ],
    },
    {
      nonce: 0,
      txs: [
        { amount: '9.99', from: 'Charlotte', to: 'Collins' },
        { amount: '12.50', from: 'Wickham', to: 'Lydia' },
      ],
    },
    {
      nonce: 0,
      txs: [{ amount: '1.50', from: 'Kitty', to: 'Mary' }],
    },
  ]
}

export default function TokensPage() {
  const [blocks, setBlocks] = useState<TokenBlock[]>(initial)

  // hitung prev/hash/valid per blok
  const derived: { index: number; prev: string; hash: string; valid: boolean }[] =
    []
  let prev = GENESIS_PREV
  blocks.forEach((b, i) => {
    const index = i + 1
    const h = hash(chainPayload(index, b.nonce, serializeTxs(b.txs), prev))
    derived.push({ index, prev, hash: h, valid: isValidHash(h) })
    prev = h
  })

  function patchBlock(i: number, p: Partial<TokenBlock>) {
    setBlocks((prev) => prev.map((b, j) => (j === i ? { ...b, ...p } : b)))
  }

  function patchTx(bi: number, ti: number, p: Partial<Tx>) {
    setBlocks((prev) =>
      prev.map((b, j) =>
        j === bi
          ? { ...b, txs: b.txs.map((t, k) => (k === ti ? { ...t, ...p } : t)) }
          : b,
      ),
    )
  }

  function handleMine(i: number) {
    const nonce = mine((n) =>
      chainPayload(derived[i].index, n, serializeTxs(blocks[i].txs), derived[i].prev),
    )
    patchBlock(i, { nonce })
  }

  return (
    <div className="page">
      <span className="eyebrow">Value Transfer</span>
      <h1>
        <span className="grad">Tokens</span> &amp; Transactions
      </h1>
      <p className="intro">
        Alih-alih data bebas, setiap blok kini berisi kumpulan{' '}
        <b>transaksi</b> &mdash; berapa banyak koin berpindah dari siapa ke
        siapa. Blok tetap dirangkai lewat hash, jadi seluruh riwayat transaksi
        ikut terkunci dan tak bisa diubah diam-diam.
      </p>

      {blocks.map((b, i) => (
        <div className={'block ' + (derived[i].valid ? 'valid' : 'invalid')} key={i}>
          <div className="block__header">
            <span className="block__badge">
              <span className="cube" />
              BLOCK <span className="n">#{String(derived[i].index).padStart(2, '0')}</span>
            </span>
            <span className={'block__status ' + (derived[i].valid ? 'ok' : 'bad')}>
              <span className="dot" />
              {derived[i].valid ? 'Valid' : 'Invalid'}
            </span>
          </div>
          <Field label="Nonce">
            <input
              className="text short mono"
              value={b.nonce}
              onChange={(e) => patchBlock(i, { nonce: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Tx">
            <div>
              {b.txs.map((t, ti) => (
                <div className="tx" key={ti}>
                  <span className="amt">$</span>
                  <input
                    className="text short"
                    style={{ maxWidth: 90 }}
                    value={t.amount}
                    onChange={(e) => patchTx(i, ti, { amount: e.target.value })}
                  />
                  <span className="arrow">From:</span>
                  <input
                    className="text short"
                    value={t.from}
                    onChange={(e) => patchTx(i, ti, { from: e.target.value })}
                  />
                  <span className="arrow">To:</span>
                  <input
                    className="text short"
                    value={t.to}
                    onChange={(e) => patchTx(i, ti, { to: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </Field>
          <Field label="Prev">
            <input className="text mono" readOnly value={derived[i].prev} />
          </Field>
          <Field label="Hash">
            <input className="text mono" readOnly value={derived[i].hash} />
          </Field>
          <button className="mine" onClick={() => handleMine(i)}>
            Mine
          </button>
        </div>
      ))}
    </div>
  )
}
