import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Upload, MessageSquare, Network, Settings } from "lucide-react";
import UploadZone from './UploadZone';
import ChatInterface from './ChatInterface';
import KnowledgeGraph from './KnowledgeGraph';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-neural-connection/20 bg-card/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-neural-node" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neural-node bg-clip-text text-transparent">
                MindPal
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="neural">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to Your AI Knowledge Hub
          </h2>
          <p className="text-gray-400">
            Upload your documents, chat with your knowledge, and explore connections
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-md border border-neural-connection/20">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-neural-node data-[state=active]:text-white"
            >
              <Upload className="w-4 h-4" />
              Upload Knowledge
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="flex items-center gap-2 data-[state=active]:bg-neural-node data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4" />
              Chat & Explore
            </TabsTrigger>
            <TabsTrigger 
              value="graph"
              className="flex items-center gap-2 data-[state=active]:bg-neural-node data-[state=active]:text-white"
            >
              <Network className="w-4 h-4" />
              Knowledge Graph
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <UploadZone />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/50 backdrop-blur-md border border-neural-connection/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Processing Power</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Advanced AI analyzes your documents to extract key concepts and relationships
                </p>
                <div className="text-2xl font-bold text-neural-node">3 Files</div>
                <div className="text-sm text-gray-400">Processed this week</div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-md border border-neural-connection/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Knowledge Nodes</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Unique concepts and ideas extracted from your documents
                </p>
                <div className="text-2xl font-bold text-neural-highlight">47 Nodes</div>
                <div className="text-sm text-gray-400">Connected concepts</div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-md border border-neural-connection/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Smart Connections</h3>
                <p className="text-gray-400 text-sm mb-4">
                  AI-discovered relationships between different topics
                </p>
                <div className="text-2xl font-bold text-neural-connection">23 Links</div>
                <div className="text-sm text-gray-400">Cross-references found</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChatInterface />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Suggested Questions</h3>
                
                <div className="space-y-3">
                  {[
                    "Summarize the key points from my neural networks research",
                    "How does machine learning relate to AI ethics?",
                    "Show me connections between my uploaded documents",
                    "What are the main concepts I should remember?"
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="glass"
                      className="w-full text-left justify-start h-auto p-4"
                    >
                      <div>
                        <p className="text-sm text-white">{question}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="graph" className="space-y-6">
            <KnowledgeGraph />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-md border border-neural-connection/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Graph Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Concepts:</span>
                    <span className="text-white font-semibold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connections:</span>
                    <span className="text-white font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cluster Density:</span>
                    <span className="text-neural-node font-semibold">High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-md border border-neural-connection/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Key Clusters</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neural-node rounded-full"></div>
                    <span className="text-white">Machine Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neural-highlight rounded-full"></div>
                    <span className="text-white">Data Science</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neural-connection rounded-full"></div>
                    <span className="text-white">AI Ethics</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;