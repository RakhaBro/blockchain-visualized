import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import HashPage from './pages/HashPage'
import BlockPage from './pages/BlockPage'
import BlockchainPage from './pages/BlockchainPage'
import DistributedPage from './pages/DistributedPage'
import TokensPage from './pages/TokensPage'
import KeysPage from './pages/KeysPage'

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/hash" replace />} />
        <Route path="/hash" element={<HashPage />} />
        <Route path="/block" element={<BlockPage />} />
        <Route path="/blockchain" element={<BlockchainPage />} />
        <Route path="/distributed" element={<DistributedPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/keys" element={<KeysPage />} />
        <Route path="*" element={<Navigate to="/hash" replace />} />
      </Routes>
    </HashRouter>
  )
}
