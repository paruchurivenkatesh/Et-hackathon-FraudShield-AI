'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, Link as LinkIcon, FileText, AlertTriangle, CheckCircle, Shield, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CitizenShield() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<null | any>(null);

  const startScan = () => {
    setIsScanning(true);
    setResult(null);
    setProgress(0);
    
    // Simulate AI scanning
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setResult({
            riskScore: 92,
            threatLevel: 'Critical',
            reasoning: [
              'Sender impersonating Indian Customs Authority.',
              'Payment link redirects to a known phishing domain (customs-india-pay.com).',
              'Urgency tactics used ("Arrest warrant will be issued in 2 hours").'
            ],
            action: 'DO NOT CLICK THE LINK. Block the sender and report to National Cyber Crime Portal.',
          });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <Shield className="mr-3 h-8 w-8 text-primary" />
          Citizen Fraud Shield
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Upload any suspicious SMS, Email, Call Recording, or Website Link for instant AI verification.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-border overflow-hidden relative">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        
        <CardHeader>
          <CardTitle>Submit Evidence</CardTitle>
          <CardDescription>Select the type of evidence you want the AI to analyze.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 border border-border">
              <TabsTrigger value="file" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <UploadCloud className="w-4 h-4 mr-2" /> File / Image
              </TabsTrigger>
              <TabsTrigger value="link" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <LinkIcon className="w-4 h-4 mr-2" /> Website Link
              </TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <FileText className="w-4 h-4 mr-2" /> SMS / Text
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="mt-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Drag & drop evidence here</p>
                    <p className="text-xs text-muted-foreground">Supports JPG, PNG, PDF, MP3, MP4 (Max 50MB)</p>
                  </div>
                  <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">Browse Files</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Suspicious URL</Label>
                <Input id="url" placeholder="https://example-fake-bank.com/login" className="bg-background border-border" />
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Suspicious Message Text</Label>
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Paste the SMS, WhatsApp message, or Email body here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-background/20 border-t border-border flex justify-end">
          <Button onClick={startScan} disabled={isScanning} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            {isScanning ? (
              <span className="flex items-center">
                <BrainCircuit className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Run AI Analysis
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-card border-primary/30 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-primary font-medium flex items-center">
                      <BrainCircuit className="w-4 h-4 mr-2 animate-spin-slow" /> 
                      AI Agent extracting features...
                    </span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-primary/20" />
                  <p className="text-xs text-muted-foreground font-mono">
                    {progress < 30 ? '> Running OCR and Deepfake detection...' : 
                     progress < 60 ? '> Querying Global Fraud Graph...' : 
                     progress < 90 ? '> Analyzing linguistic coercion patterns...' : '> Compiling final risk report...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <Card className="border-destructive shadow-[0_0_30px_rgba(255,59,92,0.15)] bg-card overflow-hidden">
              <div className="h-2 w-full bg-destructive" />
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-destructive flex items-center text-2xl">
                      <AlertTriangle className="mr-2 h-6 w-6" />
                      Critical Fraud Detected
                    </CardTitle>
                    <CardDescription className="mt-1 text-base">
                      High probability of a Digital Arrest scam attempt.
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-destructive">{result.riskScore}<span className="text-lg text-muted-foreground">/100</span></div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Risk Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <BrainCircuit className="w-4 h-4 mr-2 text-primary" />
                    AI Reasoning
                  </h3>
                  <ul className="space-y-2">
                    {result.reasoning.map((reason: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground bg-background/50 p-3 rounded-md border border-border">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <h3 className="font-bold text-destructive mb-1 text-sm uppercase tracking-wider">Recommended Action</h3>
                  <p className="text-foreground">{result.action}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
