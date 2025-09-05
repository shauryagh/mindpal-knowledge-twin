import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Dashboard section */}
      <div data-dashboard>
        <Dashboard />
      </div>
      
      {/* Call-to-action section */}
      <section className="py-16 bg-gradient-secondary/50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">
            Ready to Transform Your Knowledge?
          </h2>
          <p className="text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of learners, researchers, and professionals who use MindPal to enhance their knowledge management.
          </p>
          <button
            onClick={() => {
              const uploadTab = document.querySelector('[data-tab="upload"]') as HTMLElement;
              if (uploadTab) {
                uploadTab.click();
                uploadTab.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
