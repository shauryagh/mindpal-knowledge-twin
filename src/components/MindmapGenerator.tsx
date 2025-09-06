import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, Download, Eye, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

interface MindmapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
  children: string[];
  color: string;
}

interface Summary {
  id: string;
  documentId: string;
  title: string;
  content: string;
  keyPoints: string[];
  createdAt: string;
}

interface Mindmap {
  id: string;
  documentId: string;
  title: string;
  nodes: MindmapNode[];
  createdAt: string;
}

const MindmapGenerator = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [mindmaps, setMindmaps] = useState<Mindmap[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('summaries');
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
    fetchSummaries();
    fetchMindmaps();
  }, []);

  const fetchDocuments = async () => {
    // Mock data for demo
    setDocuments([
      {
        id: '1',
        name: 'Neural Networks Fundamentals.pdf',
        type: 'PDF',
        uploadedAt: '2024-01-15',
        size: '2.3 MB'
      },
      {
        id: '2',
        name: 'Machine Learning Ethics.pdf',
        type: 'PDF',
        uploadedAt: '2024-01-14',
        size: '1.8 MB'
      },
      {
        id: '3',
        name: 'Deep Learning Research.pdf',
        type: 'PDF',
        uploadedAt: '2024-01-13',
        size: '3.1 MB'
      }
    ]);
  };

  const fetchSummaries = async () => {
    // Mock data for demo
    setSummaries([
      {
        id: '1',
        documentId: '1',
        title: 'Neural Networks Fundamentals Summary',
        content: 'Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information through weighted connections...',
        keyPoints: [
          'Neural networks mimic biological brain structure',
          'Consist of interconnected nodes with weighted connections',
          'Learn through backpropagation algorithm',
          'Used for pattern recognition and classification',
          'Can approximate any continuous function'
        ],
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]);
  };

  const fetchMindmaps = async () => {
    // Mock data for demo
    setMindmaps([
      {
        id: '1',
        documentId: '1',
        title: 'Neural Networks Concept Map',
        nodes: [
          { id: 'root', label: 'Neural Networks', x: 400, y: 200, level: 0, children: ['neurons', 'learning', 'applications'], color: '#8B5CF6' },
          { id: 'neurons', label: 'Neurons', x: 200, y: 300, level: 1, children: ['activation', 'weights'], color: '#06B6D4' },
          { id: 'learning', label: 'Learning', x: 400, y: 350, level: 1, children: ['backprop', 'gradient'], color: '#10B981' },
          { id: 'applications', label: 'Applications', x: 600, y: 300, level: 1, children: ['vision', 'nlp'], color: '#F59E0B' },
          { id: 'activation', label: 'Activation Functions', x: 100, y: 400, level: 2, children: [], color: '#06B6D4' },
          { id: 'weights', label: 'Weights & Biases', x: 300, y: 400, level: 2, children: [], color: '#06B6D4' },
          { id: 'backprop', label: 'Backpropagation', x: 350, y: 450, level: 2, children: [], color: '#10B981' },
          { id: 'gradient', label: 'Gradient Descent', x: 450, y: 450, level: 2, children: [], color: '#10B981' },
          { id: 'vision', label: 'Computer Vision', x: 550, y: 400, level: 2, children: [], color: '#F59E0B' },
          { id: 'nlp', label: 'Natural Language', x: 650, y: 400, level: 2, children: [], color: '#F59E0B' }
        ],
        createdAt: '2024-01-15T11:00:00Z'
      }
    ]);
  };

  const generateSummary = async (documentId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      });

      if (response.ok) {
        const newSummary = await response.json();
        setSummaries([...summaries, newSummary]);
        toast({
          title: "Summary Generated!",
          description: "Your document summary has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMindmap = async (documentId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-mindmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      });

      if (response.ok) {
        const newMindmap = await response.json();
        setMindmaps([...mindmaps, newMindmap]);
        toast({
          title: "Mindmap Generated!",
          description: "Your visual mindmap has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate mindmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const MindmapVisualization = ({ mindmap }: { mindmap: Mindmap }) => {
    return (
      <div className="relative w-full h-96 bg-card/30 rounded-lg border border-neural-connection/20 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Render connections */}
          {mindmap.nodes.map(node => 
            node.children.map(childId => {
              const childNode = mindmap.nodes.find(n => n.id === childId);
              if (!childNode) return null;
              return (
                <line
                  key={`${node.id}-${childId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={childNode.x}
                  y2={childNode.y}
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="2"
                />
              );
            })
          )}
          
          {/* Render nodes */}
          {mindmap.nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.level === 0 ? 30 : 20}
                fill={node.color}
                className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-white text-xs font-medium pointer-events-none"
                fontSize={node.level === 0 ? 12 : 10}
              >
                {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Analysis Hub</h2>
          <p className="text-gray-400">Generate summaries and mindmaps from your documents</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-md border border-neural-connection/20">
          <TabsTrigger value="summaries" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Summaries
          </TabsTrigger>
          <TabsTrigger value="mindmaps" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Mindmaps
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Generate New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summaries" className="space-y-6">
          {summaries.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 text-neural-node mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No Summaries Yet</h3>
                <p className="text-gray-400">Generate your first summary from uploaded documents</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {summaries.map((summary) => (
                <Card key={summary.id} className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{summary.title}</CardTitle>
                        <p className="text-gray-400 text-sm">Generated on {new Date(summary.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">{summary.content}</p>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Points:</h4>
                      <ul className="space-y-1">
                        {summary.keyPoints.map((point, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-neural-node rounded-full mt-2 flex-shrink-0"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mindmaps" className="space-y-6">
          {mindmaps.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
              <CardContent className="text-center py-12">
                <Brain className="w-16 h-16 text-neural-node mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No Mindmaps Yet</h3>
                <p className="text-gray-400">Create your first visual mindmap from documents</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {mindmaps.map((mindmap) => (
                <Card key={mindmap.id} className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{mindmap.title}</CardTitle>
                        <p className="text-gray-400 text-sm">Generated on {new Date(mindmap.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MindmapVisualization mindmap={mindmap} />
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="secondary">{mindmap.nodes.length} Concepts</Badge>
                      <Badge variant="outline">AI Generated</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-card/50 backdrop-blur-md border border-neural-connection/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neural-node/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-neural-node" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{doc.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => generateSummary(doc.id)}
                        disabled={loading}
                        variant="neural"
                        size="sm"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Summary
                      </Button>
                      <Button
                        onClick={() => generateMindmap(doc.id)}
                        disabled={loading}
                        variant="glass"
                        size="sm"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Create Mindmap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MindmapGenerator;