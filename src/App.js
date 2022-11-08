import Body from "./components/Body";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>

        <NavBar/>

        <div className="content">

          <Routes>
            <Route exact path="/" element={user ? <Body/> : <Navigate to="/login"/>}/>
            <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
          </Routes>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
