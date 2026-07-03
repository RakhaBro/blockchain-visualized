import { NavLink } from 'react-router-dom'

const links = [
  { to: '/hash', label: 'Hash' },
  { to: '/block', label: 'Block' },
  { to: '/blockchain', label: 'Blockchain' },
  { to: '/distributed', label: 'Distributed' },
  { to: '/tokens', label: 'Tokens' },
  { to: '/keys', label: 'Public / Private Keys' },
  { to: '/supply', label: '21 Juta' },
]

export default function Nav() {
  return (
    <nav className="navbar">
      <NavLink to="/hash" className="brand">
        <span className="logo" />
        <span className="brand-text">Blockchain Demo</span>
      </NavLink>
      <div className="nav-links">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' active' : '')
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
