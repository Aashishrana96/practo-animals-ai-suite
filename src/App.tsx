import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeOverview } from './pages/HomeOverview';
import { AnimalsPage } from './pages/AnimalsPage';
import { AICoursePage } from './pages/AICoursePage';
import { CarouselPage } from './pages/CarouselPage';
import { WrittenBrief } from './pages/WrittenBrief';

export function App() {
  // Normalize initial route from window.location.pathname or hash
  const getInitialRoute = (): string => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('animals')) return '/animals';
    if (path.includes('ai-course') || path.includes('aicourse') || path.includes('ai')) return '/ai-course';
    if (path.includes('carousel')) return '/carousel';
    if (path.includes('overview') || path.includes('brief')) return '/overview';
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render active page based on currentRoute
  const renderActivePage = () => {
    switch (currentRoute) {
      case '/animals':
        return <AnimalsPage />;
      case '/ai-course':
        return <AICoursePage />;
      case '/carousel':
        return <CarouselPage />;
      case '/overview':
        return <WrittenBrief navigate={navigate} />;
      case '/':
      default:
        return <HomeOverview navigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation currentRoute={currentRoute} navigate={navigate} />
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
