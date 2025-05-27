import { Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import About from './pages/About';
import EditTodo from './pages/EditTodo';
import Home from './pages/Home';
import Todo from './pages/Todo';
import { TodoProvider } from './store/ContextProvider';

function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<Outlet />}>
            <Route path=':id' element={<EditTodo />}></Route>
            <Route path='' element={<Todo />}></Route>
          </Route>
        </Route>
      </Routes>
    </TodoProvider>
  );
}

export default App;
