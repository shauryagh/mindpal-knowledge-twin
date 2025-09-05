import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Network, Upload } from "lucide-react";
import heroImage from "@/assets/mindpal-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-secondary opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neural-node rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neural-highlight rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neural-connection rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-neural-node rounded-full animate-ping delay-700"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Brain className="w-12 h-12 text-neural-node" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-neural-node to-neural-highlight bg-clip-text text-transparent">
            MindPal
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Your AI Memory & Knowledge Twin
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your notes, PDFs, and knowledge into an interactive AI companion. 
          Chat with your information, discover connections, and never forget anything again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            <Upload className="w-5 h-5" />
            Start Building Your Knowledge
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-8 py-6">
            <MessageSquare className="w-5 h-5" />
            See Demo
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Upload Anything</h3>
            <p className="text-gray-400">Notes, PDFs, research papers - feed your AI brain with knowledge</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Chat & Learn</h3>
            <p className="text-gray-400">Ask questions, get summaries, explore connections in natural language</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Network className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Knowledge Graph</h3>
            <p className="text-gray-400">Visualize how your ideas connect and discover hidden insights</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;