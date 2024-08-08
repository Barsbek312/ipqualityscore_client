import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header/Header";
import Loader from "./components/Common/Loader/Loader";
import Main from "./components/Main/Main";

function App() {
  const { loadingProxyIp } = useSelector((state) => state.proxyIp);

  return (
    <BrowserRouter>
      <div className="app-wrapper container">
        <Loader isShow={loadingProxyIp} />
        <Routes>
          <Route path="/ipqualityscore_client" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
