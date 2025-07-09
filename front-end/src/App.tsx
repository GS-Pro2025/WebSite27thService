import Navbar from './components/navbar'
import './App.css'
import Home from './pages/home'

function App() {
  return (
    <div className="w-full overflow-visible">
      <Navbar />
      <Home/>
    </div>
  )
}

export default App