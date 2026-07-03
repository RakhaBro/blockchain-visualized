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
      <span className="eyebrow">Peer to Peer</span>
      <h1>
        <span className="grad">Distributed</span> Ledger
      </h1>
      <p className="intro">
        Pada jaringan sungguhan, banyak <b>peer</b> menyimpan salinan rantai
        yang sama. Selama semua identik dan hijau, jaringan sepakat. Coba ubah
        data pada salah satu peer &mdash; rantainya menyimpang dari yang lain,
        sehingga kecurangan mudah terdeteksi.
      </p>

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
