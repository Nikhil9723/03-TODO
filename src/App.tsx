import { Outlet, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import EditTodo from "./pages/EditTodo";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Outlet />}>
            <Route path=":id" element={<EditTodo />}></Route>
            <Route path="" element={<Todo />}></Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
