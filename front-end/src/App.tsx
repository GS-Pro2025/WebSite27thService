import Navbar from './components/navbar'
import './App.css'
import Home from './pages/home'
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full overflow-visible">
      <Navbar />
      <Home/>
            <Footer />
    </div>
  )
}

export default App