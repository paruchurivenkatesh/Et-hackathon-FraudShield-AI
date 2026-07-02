'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Activity, Users, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', frauds: 120, alerts: 40 },
  { name: 'Tue', frauds: 180, alerts: 60 },
  { name: 'Wed', frauds: 250, alerts: 110 },
  { name: 'Thu', frauds: 190, alerts: 80 },
  { name: 'Fri', frauds: 320, alerts: 150 },
  { name: 'Sat', frauds: 400, alerts: 200 },
  { name: 'Sun', frauds: 350, alerts: 170 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-1">Real-time public safety intelligence overview.</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary animate-pulse py-1.5 px-3">
          <Activity className="w-4 h-4 mr-2" />
          System Active
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Threats Detected', value: '14,293', change: '+12.5%', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
          { title: 'Citizens Protected', value: '2.4M', change: '+4.2%', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { title: 'Active Fraud Rings', value: '42', change: '-2.1%', icon: Activity, color: 'text-warning', bg: 'bg-warning/10' },
          { title: 'System Accuracy', value: '99.8%', change: '+0.1%', icon: ShieldCheck, color: 'text-success', bg: 'bg-success/10' },
        ].map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border hover:border-primary/50 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs flex items-center mt-1 text-muted-foreground">
                  {stat.change.startsWith('+') ? (
                    <ArrowUpRight className="h-4 w-4 text-destructive mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-success mr-1" />
                  )}
                  <span className={stat.change.startsWith('+') ? 'text-destructive' : 'text-success'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur-xl border-border">
          <CardHeader>
            <CardTitle>Threat Trajectory</CardTitle>
            <CardDescription>
              Volume of detected fraud attempts vs high-risk alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#16213E', borderColor: '#1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="frauds" fill="#5B5FEF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alerts" fill="#00E5FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-card/50 backdrop-blur-xl border-border">
          <CardHeader>
            <CardTitle>Recent High-Risk Alerts</CardTitle>
            <CardDescription>
              Live feed from the Digital Arrest AI module.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 mins ago', type: 'CBI Impersonation', location: 'Mumbai, MH', risk: 'Critical' },
                { time: '15 mins ago', type: 'Customs Parcel Scam', location: 'Delhi, DL', risk: 'High' },
                { time: '1 hour ago', type: 'Video Call Coercion', location: 'Bengaluru, KA', risk: 'Critical' },
                { time: '2 hours ago', type: 'Fake Arrest Warrant', location: 'Hyderabad, TS', risk: 'Medium' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/50 hover:bg-background/60 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">{alert.type}</span>
                    <span className="text-xs text-muted-foreground">{alert.location} • {alert.time}</span>
                  </div>
                  <Badge variant="outline" className={
                    alert.risk === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                    alert.risk === 'High' ? 'bg-warning/10 text-[#FFC857] border-warning/20' : 'bg-primary/10 text-primary border-primary/20'
                  }>
                    {alert.risk}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
