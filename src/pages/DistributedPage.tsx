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
      <p className="intro">
        Catatan ini tidak disimpan di satu tempat, tapi disalin ke banyak
        komputer (tiap komputer disebut <b>peer</b>) yang semuanya memegang
        versi sama. Kalau satu komputer dicurangi, salinannya jadi berbeda dari
        yang lain dan langsung ketahuan. Untuk menipu, seseorang harus mengubah
        mayoritas komputer sekaligus &mdash; nyaris mustahil.
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
