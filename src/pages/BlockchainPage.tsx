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
      <span className="eyebrow">Immutable Ledger</span>
      <h1>
        The <span className="grad">Blockchain</span>
      </h1>
      <p className="intro">
        Setiap blok menyimpan hash blok sebelumnya di field <b>Prev</b>,
        merangkainya menjadi rantai. Ubah data pada satu blok: hash-nya berubah,
        sehingga blok itu <i>dan semua blok setelahnya</i> menjadi tidak sah
        (merah). Untuk memperbaikinya, blok-blok tersebut harus di-<b>Mine</b>{' '}
        ulang.
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
