'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Radio, AlertTriangle, ShieldAlert, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FeedItem = {
  id: number;
  type: string;
  source: string;
  risk: 'Critical' | 'High' | 'Medium';
  time: string;
};

const initialFeed: FeedItem[] = [
  { id: 1, type: 'Mass SMS Phishing', source: 'Telecom API', risk: 'High', time: 'Just now' },
  { id: 2, type: 'Digital Arrest Call', source: 'Citizen App', risk: 'Critical', time: '1m ago' },
  { id: 3, type: 'Suspicious IP Cluster', source: 'Bank Partner', risk: 'Medium', time: '3m ago' },
];

export default function LiveIntelligence() {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const risks: ('Critical' | 'High' | 'Medium')[] = ['Critical', 'High', 'Medium'];
      const types = ['Fake UPI Handle', 'Counterfeit Note Scanned', 'Voice Clone Detected', 'Mule Account Transfer', 'Govt Portal Spoof'];
      const sources = ['Cyber Cell App', 'Bank API', 'Telecom Node', 'Social Media Scan'];
      
      const newItem: FeedItem = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        risk: risks[Math.floor(Math.random() * risks.length)],
        time: 'Just now'
      };
      
      setFeed(prev => [newItem, ...prev].slice(0, 20));
    }, 4000); // New item every 4 seconds
    
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            <Radio className="mr-3 h-8 w-8 text-primary" />
            Global Threat Feed
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Real-time ingestion of multisource intelligence.</p>
        </div>
        <Badge 
          variant="outline" 
          className={`py-1.5 px-3 cursor-pointer ${isLive ? 'bg-destructive/10 text-destructive border-destructive animate-pulse' : 'bg-muted text-muted-foreground'}`}
          onClick={() => setIsLive(!isLive)}
        >
          <Wifi className="w-4 h-4 mr-2" />
          {isLive ? 'LIVE STREAM ACTIVE' : 'STREAM PAUSED'}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-card/50 backdrop-blur-xl border-border h-[600px] flex flex-col">
          <CardHeader className="border-b border-border/50 shrink-0">
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Incoming Incident Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {feed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    item.risk === 'Critical' ? 'bg-destructive/10 border-destructive/30' :
                    item.risk === 'High' ? 'bg-warning/10 border-warning/30' :
                    'bg-primary/5 border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.risk === 'Critical' ? (
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    ) : item.risk === 'High' ? (
                      <ShieldAlert className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    ) : (
                      <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-bold ${
                        item.risk === 'Critical' ? 'text-destructive' :
                        item.risk === 'High' ? 'text-warning' : 'text-primary'
                      }`}>{item.type}</h4>
                      <p className="text-sm text-muted-foreground">Source: {item.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={
                      item.risk === 'Critical' ? 'text-destructive border-destructive' :
                      item.risk === 'High' ? 'text-warning border-warning' : 'text-primary border-primary'
                    }>
                      {item.risk} Risk
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="col-span-1 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Stream Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Events/min</span>
                  <span className="font-bold text-foreground">1,204</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">AI Processing Latency</span>
                  <span className="font-bold text-foreground">14ms</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success w-1/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Node Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Vision AI Engine', 'NLP Pattern Matcher', 'Graph DB Router', 'Telecom API Gateway'].map((node, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-background/50 rounded">
                  <span className="text-muted-foreground">{node}</span>
                  <span className="flex items-center text-success text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-success mr-2"></span>Online
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
