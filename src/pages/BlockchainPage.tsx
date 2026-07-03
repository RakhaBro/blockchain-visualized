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
      <p className="intro">
        Tiap blok ikut menyimpan kode unik blok sebelumnya (kolom <b>Prev</b>),
        seperti mata rantai yang saling mengait. Kalau seseorang diam-diam
        mengubah isi satu blok, kodenya berubah dan sambungan ke blok-blok
        berikutnya langsung putus &mdash; semuanya jadi merah. Jadi memalsukan
        satu blok berarti harus mengerjakan ulang semua blok sesudahnya.
      </p>

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
