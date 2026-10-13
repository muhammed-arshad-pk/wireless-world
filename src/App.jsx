import { HashRouter, Route, Routes } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UnitPage from './pages/UnitPage';
import TopicPage from './pages/TopicPage';
import LabsPage from './pages/LabsPage';
import GamesPage from './pages/GamesPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GameProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="unit/:unitId" element={<UnitPage />} />
            <Route path="unit/:unitId/:slug" element={<TopicPage />} />
            <Route path="labs" element={<LabsPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </GameProvider>
    </HashRouter>
  );
}
