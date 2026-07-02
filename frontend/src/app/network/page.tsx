'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Network, ZoomIn, ZoomOut, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NetworkGraph = dynamic(() => import('@/components/NetworkGraph'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-card border border-border rounded-lg">
      <div className="flex flex-col items-center text-primary animate-pulse">
        <Network className="h-10 w-10 mb-2 opacity-50" />
        <span>Loading Graph Neural Network...</span>
      </div>
    </div>
  )
});

export default function FraudNetwork() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            <Network className="mr-3 h-8 w-8 text-primary" />
            Fraud Network Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">Graph AI analysis mapping phone numbers, IPs, and mule accounts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" /> Filter Nodes
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Export Intel Package
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full relative rounded-xl overflow-hidden border border-border shadow-2xl bg-[#0B1120]">
        <NetworkGraph />
        
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
