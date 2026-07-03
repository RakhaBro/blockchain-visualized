const HALVING_BLOCKS = 210_000
const INITIAL_REWARD = 50
const TOTAL = 21_000_000

/** Hitung tiap era halving: hadiah per block, jumlah ditambang, dan kumulatif. */
function buildEras(count: number) {
  const eras = []
  let cumulative = 0
  for (let n = 0; n < count; n++) {
    const reward = INITIAL_REWARD / 2 ** n
    const minted = HALVING_BLOCKS * reward
    cumulative += minted
    eras.push({ n, year: 2009 + n * 4, reward, minted, cumulative })
  }
  return eras
}

const nf = (n: number, dp = 0) =>
  n.toLocaleString('id-ID', { maximumFractionDigits: dp })

export default function SupplyPage() {
  const eras = buildEras(8)

  return (
    <div className="page">
      <span className="eyebrow">Suplai Terbatas</span>
      <h1>
        Kenapa ada <span className="grad">21 juta</span> Bitcoin?
      </h1>

      <div className="intro">
        <p>
          Bitcoin baru tidak dicetak sesuka hati. Setiap kali sebuah block
          ditambang, penambangnya mendapat sejumlah Bitcoin baru sebagai hadiah
          (<b>block reward</b>). Di awal (2009) hadiahnya <b>50 BTC</b> per
          block.
        </p>
        <p>
          Yang membuatnya terbatas: hadiah ini <b>dipotong setengah setiap
          210.000 block</b> (kira-kira tiap 4 tahun) &mdash; peristiwa yang
          disebut <b>halving</b>. Jadi 50 → 25 → 12,5 → 6,25 → … terus mengecil
          sampai akhirnya mendekati nol.
        </p>
        <p>
          Angka 21 juta sendiri bukan ditulis langsung di kode, melainkan{' '}
          <b>muncul otomatis</b> dari dua pilihan itu (hadiah awal 50 BTC +
          halving tiap 210.000 block). Coba jumlahkan semua hadiah sepanjang masa
          di bawah ini.
        </p>
      </div>

      {/* Visual: tiap era mengisi setengah sisa, konvergen ke 21 juta */}
      <div className="card">
        <div className="section-title">
          <span className="idx">Σ</span> Setiap halving mengisi separuh sisanya
        </div>
        <div className="supply-meter" role="img" aria-label="Jadwal suplai Bitcoin menuju 21 juta">
          {eras.map((e) => (
            <div
              key={e.n}
              className="supply-seg"
              style={{
                flexBasis: (e.minted / TOTAL) * 100 + '%',
                background: `hsl(${188 + e.n * 12} 85% ${62 - e.n * 2}%)`,
              }}
              title={`Era ${e.n + 1}: +${nf(e.minted)} BTC`}
            />
          ))}
        </div>
        <div className="supply-scale">
          <span>0</span>
          <span>≈ 21 juta BTC</span>
        </div>
        <p className="supply-note">
          Tiap balok mewakili Bitcoin yang dicetak pada satu era &mdash;
          masing-masing separuh dari sebelumnya. Karena 1 + ½ + ¼ + ⅛ + … = 2,
          totalnya berhenti persis di 21 juta.
        </p>
      </div>

      {/* Formula */}
      <div className="formula">
        210.000 blok × 50 BTC × 2 <span className="eq">=</span>{' '}
        <b>21.000.000 BTC</b>
      </div>

      {/* Tabel jadwal halving */}
      <div className="card">
        <div className="section-title">
          <span className="idx">⛏</span> Jadwal halving
        </div>
        <div className="halving-scroll">
          <table className="halving-table">
            <thead>
              <tr>
                <th>Era</th>
                <th>≈ Tahun</th>
                <th>Hadiah / block</th>
                <th>Ditambang</th>
                <th>Total beredar</th>
              </tr>
            </thead>
            <tbody>
              {eras.map((e) => (
                <tr key={e.n}>
                  <td>{e.n + 1}</td>
                  <td>{e.year}</td>
                  <td className="mono num">{nf(e.reward, 8)} BTC</td>
                  <td className="mono num">{nf(e.minted, 1)}</td>
                  <td className="mono num">{nf(e.cumulative, 1)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={4}>… dan seterusnya, menuju</td>
                <td className="mono num">21.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="intro" style={{ marginBottom: 0 }}>
        <p>
          Satu catatan menarik: karena Bitcoin hanya bisa dibagi sampai satuan
          terkecil (satoshi = 0,00000001 BTC) dan tiap pembagian dibulatkan ke
          bawah, jumlah akhir sebenarnya <b>sedikit di bawah</b> 21 juta &mdash;
          sekitar 20.999.999,97 BTC.
        </p>
      </div>
    </div>
  )
}
