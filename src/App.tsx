import { Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Todo from './pages/Todo';
import EditTodo from './pages/EditTodo';

import { TodoProvider } from './store/ContextProvider';
import NotFound from './pages/NotFound';

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
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
