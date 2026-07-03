import { Fragment, useState } from 'react'
import ChainBlock from '../components/ChainBlock'
import ChainConnector from '../components/ChainConnector'
import { computeChain, mineBlock, type BlockData } from '../lib/chain'

const PEERS = ['Peer A', 'Peer B', 'Peer C']

function emptyChain(): BlockData[] {
  return Array.from({ length: 5 }, () => ({ nonce: 0, data: '' }))
}

export default function DistributedPage() {
  // Satu rantai per peer.
  const [chains, setChains] = useState<BlockData[][]>(() =>
    PEERS.map(emptyChain),
  )

  function patch(peer: number, i: number, p: Partial<BlockData>) {
    setChains((prev) =>
      prev.map((chain, pi) =>
        pi === peer
          ? chain.map((b, j) => (j === i ? { ...b, ...p } : b))
          : chain,
      ),
    )
  }

  return (
    <div className="page">
      <span className="eyebrow">Banyak Salinan, Satu Kebenaran</span>
      <h1>
        Catatan yang <span className="grad">Tersebar</span>
      </h1>
      <div className="intro">
        <p>
          Di dunia nyata, blockchain tidak disimpan di satu komputer, melainkan
          disalin ke banyak komputer sekaligus &mdash; tiap komputer disebut{' '}
          <b>peer</b>. Setiap peer menyimpan salinan rantai yang sama persis, dan
          selama semua salinan cocok (semuanya hijau), jaringan sepakat bahwa
          itulah catatan yang benar.
        </p>
        <p>
          Kalau seseorang mengubah Data di satu peer, hanya rantai di peer itu
          yang berubah dan langsung berbeda dari peer lain, sehingga
          kecurangannya ketahuan. Untuk benar-benar memalsukan catatan, seseorang
          harus meng-<b>Mine</b> ulang dan mengubah mayoritas peer secara
          bersamaan &mdash; dan itu praktis mustahil.
        </p>
      </div>

      <div className="peers">
        {chains.map((chain, peer) => {
          const derived = computeChain(chain)
          return (
            <div className="peer" key={peer}>
              <h2>{PEERS[peer]}</h2>
              <div className="chain">
                {chain.map((b, i) => (
                  <Fragment key={i}>
                    {i > 0 && <ChainConnector />}
                    <ChainBlock
                      compact
                      block={b}
                      derived={derived[i]}
                      onChange={(p) => patch(peer, i, p)}
                      onMine={() =>
                        patch(peer, i, {
                          nonce: mineBlock(
                            derived[i].index,
                            b.data,
                            derived[i].prev,
                          ),
                        })
                      }
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
