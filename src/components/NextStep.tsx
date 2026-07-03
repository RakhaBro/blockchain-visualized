import { Link, useLocation } from 'react-router-dom'

/** Urutan tahap pembelajaran; tombol melompat ke tahap berikutnya. */
const STAGES = [
  { to: '/hash', label: 'Hash' },
  { to: '/block', label: 'Block' },
  { to: '/blockchain', label: 'Blockchain' },
  { to: '/distributed', label: 'Distributed' },
  { to: '/tokens', label: 'Tokens' },
  { to: '/keys', label: 'Keys' },
]

export default function NextStep() {
  const { pathname } = useLocation()
  const idx = STAGES.findIndex((s) => s.to === pathname)
  const next = idx >= 0 ? STAGES[idx + 1] : undefined

  if (!next) return null // tidak ada tahap berikutnya (halaman terakhir)

  return (
    <Link to={next.to} className="next-step" key={next.to}>
      <span className="np-label">
        <span className="np-kicker">Selanjutnya</span>
        <span className="np-title">{next.label}</span>
      </span>
      <span className="np-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
