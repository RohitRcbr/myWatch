import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './Create';
import ClockPage from './ClockPage';
function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/find" element={<FindClock />} /> {/* ✅ */}
      <Route path="/clock" element={<ClockPage />} />
      <Route path="/clock/:uniqueName" element={<ClockPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
