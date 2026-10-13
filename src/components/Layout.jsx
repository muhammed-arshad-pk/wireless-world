import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toasts from './Toasts';
import Confetti from '../effects/Confetti';
import { useScrollReveal } from '../effects/interactions';

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useScrollReveal(pathname);

  return (
    <div className="app">
      <Sidebar open={navOpen} />
      {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}
      <div className="main">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Toasts />
      <Confetti />
    </div>
  );
}
