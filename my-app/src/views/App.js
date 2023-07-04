import './App.css';
import { Routes, Route } from "react-router-dom";
import Product from '../components/layout/staff/product/Product';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Routes>
        <Route path="/" element={<Product />}>
        </Route>
      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
