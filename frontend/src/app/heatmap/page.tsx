'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, Filter, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-card border border-border rounded-lg">
      <div className="flex flex-col items-center text-primary animate-pulse">
        <Map className="h-10 w-10 mb-2 opacity-50" />
        <span>Initializing Geospatial Engine...</span>
      </div>
    </div>
  )
});

export default function HeatmapPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            <Map className="mr-3 h-8 w-8 text-primary" />
            Geospatial Crime Pattern Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">Live tracking of cybercrime hotspots and fraud networks.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Navigation2 className="w-4 h-4 mr-2" /> Deploy Patrols
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] w-full relative rounded-xl overflow-hidden border border-border shadow-2xl">
        <MapComponent />
        
        {/* Map Overlay Panel */}
        <div className="absolute top-4 right-4 z-[400] w-72 space-y-4">
          <Card className="bg-background/80 backdrop-blur-md border-border/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Active Threat Zones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Jamtara Hub</span>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Critical</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Delhi NCR Ring</span>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Critical</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ahmedabad Notes</span>
                <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">High</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
