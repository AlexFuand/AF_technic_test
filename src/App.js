import './App.css';
import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom'
import Home from './pages/home/home'
import Article from './components/article/article.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Navigate replace to="/home" />} />
        <Route path="/home" element = {<Home />} />
        <Route path ="/article/:state" element = {<Article />}/>
      </Routes>
    </Router>
  );
}

export default App;
