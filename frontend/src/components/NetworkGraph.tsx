'use client';

import { useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock Data for Fraud Network
const genRandomTree = (N = 50) => {
  const nodes = [...Array(N).keys()].map(i => ({ 
    id: i, 
    group: i % 3 === 0 ? 'Mule Account' : i % 5 === 0 ? 'IP Address' : 'Phone Number',
    risk: i % 7 === 0 ? 'Critical' : i % 4 === 0 ? 'High' : 'Medium'
  }));
  const links = [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      source: id,
      target: Math.round(Math.random() * (id - 1))
    }));
  return { nodes, links };
};

const graphData = genRandomTree(80);

const getColor = (risk: string) => {
  if (risk === 'Critical') return '#FF3B5C';
  if (risk === 'High') return '#FFC857';
  return '#00E5FF';
};

export default function NetworkGraph() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
  }, []);

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="group"
        nodeColor={(node: any) => getColor(node.risk)}
        nodeRelSize={6}
        linkColor={() => '#1e293b'}
        linkWidth={1.5}
        backgroundColor="#0B1120"
        onNodeClick={(node) => setSelectedNode(node)}
      />

      {selectedNode && (
        <Card className="absolute top-4 left-4 w-72 bg-background/80 backdrop-blur-md border-border/50 shadow-2xl z-10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Node Details
              <button onClick={() => setSelectedNode(null)} className="text-muted-foreground hover:text-foreground text-sm">&times;</button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Entity Type</span>
              <p className="font-semibold text-foreground">{selectedNode.group}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Risk Level</span>
              <div className="mt-1">
                <Badge className={
                  selectedNode.risk === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                  selectedNode.risk === 'High' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-primary/10 text-primary border-primary/20'
                }>
                  {selectedNode.risk}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Connections</span>
              <p className="font-mono text-sm text-foreground">{Math.floor(Math.random() * 15) + 2} linked nodes</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
