import Homepage from './pages/Homepage';
import { Routes, Route } from "react-router-dom";
import './styles/main.scss';
import ResultPage from './pages/ResultPage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
