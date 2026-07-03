import { Fragment, useState } from 'react'
import ChainBlock from '../components/ChainBlock'
import ChainConnector from '../components/ChainConnector'
import { computeChain, mineBlock, type BlockData } from '../lib/chain'

function initialChain(): BlockData[] {
  return Array.from({ length: 5 }, () => ({ nonce: 0, data: '' }))
}

export default function BlockchainPage() {
  const [blocks, setBlocks] = useState<BlockData[]>(initialChain)
  const derived = computeChain(blocks)

  function patch(i: number, p: Partial<BlockData>) {
    setBlocks((prev) => prev.map((b, j) => (j === i ? { ...b, ...p } : b)))
  }

  function handleMine(i: number) {
    const nonce = mineBlock(derived[i].index, blocks[i].data, derived[i].prev)
    patch(i, { nonce })
  }

  return (
    <div className="page">
      <span className="eyebrow">Rantai yang Saling Mengunci</span>
      <h1>
        <span className="grad">Rantai</span> Blok
      </h1>
      <div className="intro">
        <p>
          Blockchain hanyalah banyak block yang disusun berurutan. Selain{' '}
          <b>Nonce</b> dan <b>Data</b>, kini tiap block juga menyimpan{' '}
          <b>Prev</b> &mdash; yaitu kode hash milik block sebelumnya. Karena hash
          sebuah block ikut dihitung dari Prev-nya, semua block jadi saling
          terkunci seperti rantai.
        </p>
        <p>
          Akibatnya, kalau kamu mengubah Data di satu block, hash-nya berubah,
          Prev di block berikutnya jadi tidak cocok, dan block itu beserta semua
          block sesudahnya langsung dianggap <b>tidak valid</b> (merah). Untuk
          memperbaikinya, setiap block yang rusak harus di-<b>Mine</b> ulang satu
          per satu &mdash; itulah yang membuat catatan lama nyaris mustahil
          diubah diam-diam.
        </p>
      </div>

      <div className="chain">
        {blocks.map((b, i) => (
          <Fragment key={i}>
            {i > 0 && <ChainConnector />}
            <ChainBlock
              block={b}
              derived={derived[i]}
              onChange={(p) => patch(i, p)}
              onMine={() => handleMine(i)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
