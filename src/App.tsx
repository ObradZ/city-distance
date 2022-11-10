import Homepage from './pages/Homepage';
import { Routes, Route } from "react-router-dom";
import './styles/main.scss';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      {/* <Route path="/result-page" element={<Homepage />} /> */}

    </Routes>
  );
}

export default App;
