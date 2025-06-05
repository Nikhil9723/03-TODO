import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className='w-full flex flex-col items-center gap-2'>
        <Outlet />
      </main>
    </>
  );
}
