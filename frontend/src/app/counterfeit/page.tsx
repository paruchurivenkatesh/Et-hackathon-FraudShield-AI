'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Banknote, UploadCloud, BrainCircuit, ScanLine, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CounterfeitAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<null | 'Original' | 'Counterfeit'>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setResult('Counterfeit'); // Mock result
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <Banknote className="mr-3 h-8 w-8 text-primary" />
          Counterfeit Currency Identification
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Upload front and back images of currency for instant verification of security features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border">
          <CardHeader>
            <CardTitle>Image Upload</CardTitle>
            <CardDescription>Upload high-resolution scans or photos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group flex flex-col items-center justify-center"
                onClick={() => document.getElementById('front-image-upload')?.click()}
              >
                <input type="file" id="front-image-upload" className="hidden" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) toast.success('Front Image Loaded');
                }} />
                <UploadCloud className="h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">Front Image</p>
              </div>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group flex flex-col items-center justify-center"
                onClick={() => document.getElementById('back-image-upload')?.click()}
              >
                <input type="file" id="back-image-upload" className="hidden" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) toast.success('Back Image Loaded');
                }} />
                <UploadCloud className="h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">Back Image</p>
              </div>
            </div>
            
            <AnimatePresence>
              {analyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary flex items-center">
                      <ScanLine className="w-4 h-4 mr-2 animate-pulse" /> Scanning Optical Features...
                    </span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-primary/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter>
            <Button onClick={startAnalysis} disabled={analyzing} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {analyzing ? <BrainCircuit className="w-4 h-4 mr-2 animate-spin-slow" /> : <ScanLine className="w-4 h-4 mr-2" />}
              {analyzing ? 'Verifying Microprint & RBI Seal...' : 'Run Computer Vision AI'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card border-border overflow-hidden">
          <CardHeader>
            <CardTitle>Analysis Report</CardTitle>
            <CardDescription>Computer Vision findings based on RBI guidelines.</CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !analyzing && (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                Upload images to view report
              </div>
            )}
            
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className={`p-4 rounded-lg flex items-center justify-between border ${result === 'Counterfeit' ? 'bg-destructive/10 border-destructive/30' : 'bg-success/10 border-success/30'}`}>
                  <div>
                    <h3 className={`text-xl font-bold flex items-center ${result === 'Counterfeit' ? 'text-destructive' : 'text-success'}`}>
                      {result === 'Counterfeit' ? <AlertTriangle className="mr-2" /> : <ShieldCheck className="mr-2" />}
                      {result.toUpperCase()} DETECTED
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Confidence Score: <span className="font-semibold text-foreground">96.8%</span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Feature Verification</h4>
                  {[
                    { name: 'Security Thread', status: 'Failed - No color shift detected', pass: false },
                    { name: 'Watermark', status: 'Passed', pass: true },
                    { name: 'Microprint (RBI)', status: 'Failed - Blurred edges', pass: false },
                    { name: 'Intaglio Printing', status: 'Failed - No tactile feel detected in scan', pass: false },
                    { name: 'Serial Number Pattern', status: 'Passed', pass: true },
                  ].map((feature, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded bg-background/50 border border-border">
                      <span className="text-sm font-medium">{feature.name}</span>
                      <Badge variant="outline" className={feature.pass ? 'text-success border-success/50' : 'text-destructive border-destructive/50'}>
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
