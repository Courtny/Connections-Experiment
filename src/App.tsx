import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VaultSecurityTutorial from './pages/VaultSecurityTutorial'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vault/security-tutorial" element={<VaultSecurityTutorial />} />
      </Routes>
    </HashRouter>
  )
}

export default App
