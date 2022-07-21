import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Login";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/rooms/:URLRoomID"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/direct/:uid"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/direct/:uid/:to"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
