'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save, ShieldAlert, BrainCircuit, Key } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = () => {
    toast.success('Settings Saved', {
      description: 'Your configuration has been applied successfully.',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <Settings className="mr-3 h-8 w-8 text-primary" />
          System Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">Configure AI thresholds and system integrations.</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BrainCircuit className="w-5 h-5 mr-2 text-primary" />
              AI Detection Thresholds
            </CardTitle>
            <CardDescription>Adjust the sensitivity of the fraud detection algorithms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voice-threshold">Voice Deepfake Sensitivity (%)</Label>
                <Input id="voice-threshold" type="number" defaultValue={85} className="bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ocr-threshold">OCR Confidence Threshold (%)</Label>
                <Input id="ocr-threshold" type="number" defaultValue={92} className="bg-background border-border" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Key className="w-5 h-5 mr-2 text-primary" />
              API Integrations
            </CardTitle>
            <CardDescription>Manage keys for external intelligence sources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mha-api">MHA Alert System API Key</Label>
              <Input id="mha-api" type="password" defaultValue="************************" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telecom-api">Telecom Fraud Node Webhook</Label>
              <Input id="telecom-api" defaultValue="https://telecom-node.fraudshield.gov.in/webhook" className="bg-background border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-destructive">
              <ShieldAlert className="w-5 h-5 mr-2 text-destructive" />
              Danger Zone
            </CardTitle>
            <CardDescription>Critical system actions that affect the entire intelligence network.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Purge Local Intelligence Cache
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
