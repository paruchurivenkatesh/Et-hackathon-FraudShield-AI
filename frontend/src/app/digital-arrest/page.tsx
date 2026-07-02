'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldAlert, Mic, Video, BrainCircuit, Activity, AlertCircle, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const transcript = [
  { time: '00:01', speaker: 'Caller', text: 'Am I speaking to Mr. Sharma? This is Inspector Singh from the CBI.' },
  { time: '00:05', speaker: 'Victim', text: 'Yes, speaking. What is this about?' },
  { time: '00:08', speaker: 'Caller', text: 'A parcel containing illegal narcotics was found under your Aadhaar number at Customs.', highlight: true, type: 'Impersonation & Fear' },
  { time: '00:15', speaker: 'Victim', text: 'What? I haven\'t ordered anything!' },
  { time: '00:18', speaker: 'Caller', text: 'You are under digital arrest. Do not disconnect this call or an FIR will be lodged.', highlight: true, type: 'Threat & Coercion' },
  { time: '00:25', speaker: 'Caller', text: 'To verify your bank accounts are clean, you must transfer your balance to the RBI secure account immediately.', highlight: true, type: 'Payment Pressure' },
];

export default function DigitalArrest() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <ShieldAlert className="mr-3 h-8 w-8 text-primary" />
          Digital Arrest Detection AI
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Upload active call audio or video to detect psychological coercion and government impersonation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-1 bg-card/50 backdrop-blur-xl border-border h-fit">
          <CardHeader>
            <CardTitle>Call Monitor</CardTitle>
            <CardDescription>Upload media or connect live stream</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={() => document.getElementById('media-upload')?.click()}
            >
              <input type="file" id="media-upload" className="hidden" accept="audio/*,video/*" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  toast.success(`Loaded: ${e.target.files[0].name}`, { description: 'Ready for AI analysis.' });
                }
              }} />
              <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
              <p className="text-sm font-medium">Upload Audio/Video</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => toast.info('Connecting to Microphone stream...')} 
                className="w-full bg-primary/10 text-primary border border-primary hover:bg-primary/20"
              >
                <Mic className="w-4 h-4 mr-2" /> Live Audio
              </Button>
              <Button 
                onClick={() => toast.info('Connecting to Camera stream...')}
                className="w-full bg-primary/10 text-primary border border-primary hover:bg-primary/20"
              >
                <Video className="w-4 h-4 mr-2" /> Live Video
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyze} disabled={analyzing || analyzed} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {analyzing ? <Activity className="w-4 h-4 mr-2 animate-pulse" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
              {analyzing ? 'Analyzing NLP Patterns...' : 'Run Real-time AI'}
            </Button>
          </CardFooter>
        </Card>

        <div className="col-span-2 space-y-6">
          {analyzed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
              <Card className="bg-destructive/10 border-destructive shadow-[0_0_20px_rgba(255,59,92,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2"><AlertCircle className="text-destructive w-12 h-12 opacity-20" /></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-destructive text-xl">Scam Probability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-black text-destructive">98.5%</div>
                  <Progress value={98.5} className="h-2 mt-3 bg-destructive/20" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Threat Vectors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Govt Impersonation</span>
                    <Badge variant="outline" className="text-destructive border-destructive">Detected</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Coercion / Threat</span>
                    <Badge variant="outline" className="text-destructive border-destructive">Detected</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Payment Request</span>
                    <Badge variant="outline" className="text-destructive border-destructive">Detected</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Card className="bg-card/50 backdrop-blur-xl border-border flex-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Real-time Transcript Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-sm">
                {transcript.map((line, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={analyzed ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ delay: i * 0.5 }}
                    className={`p-3 rounded-lg flex flex-col ${line.highlight ? 'bg-destructive/10 border border-destructive/30' : 'bg-muted/30'}`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className={`font-bold ${line.speaker === 'Caller' ? 'text-warning' : 'text-primary'}`}>{line.speaker}</span>
                      <span className="text-muted-foreground text-xs">{line.time}</span>
                    </div>
                    <p className="text-foreground">{line.text}</p>
                    {line.highlight && (
                      <div className="mt-2 text-xs text-destructive flex items-center font-sans font-semibold">
                        <AlertCircle className="w-3 h-3 mr-1" /> AI Flag: {line.type}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
