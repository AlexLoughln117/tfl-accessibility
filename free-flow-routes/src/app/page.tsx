import HeroSection from '../components/layout/HeroSection';
import JourneyPlanner from '../components/journey/JourneyPlanner';
import MapContainer from '../components/map/MapContainer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import FeedbackSection from '../components/ui/FeedbackSection';
import WelcomeOverlay from '../components/ui/WelcomeOverlay';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Plan Your Accessible Journey"
        subtitle="Routes optimized for accessibility across London's transport network"
      />
      
      {/* Journey Planner */}
      <JourneyPlanner />
      
      {/* Map Container */}
      <MapContainer />
      
      {/* Loading Spinner */}
      <LoadingSpinner />
      
      {/* Feedback Section */}
      <FeedbackSection />
      
      {/* Welcome Overlay */}
      <WelcomeOverlay />
    </>
  );
} 