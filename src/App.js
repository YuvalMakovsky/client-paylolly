import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Tasks } from "./pages";
import { Header, Protected } from "./components";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header />;
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route
              path="/tasks"
              element={
                <Protected
                  Cmp={() => {
                    return (
                      <>
                        <Tasks />
                      </>
                    );
                  }}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
