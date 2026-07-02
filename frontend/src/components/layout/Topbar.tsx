'use client';

import { Bell, Search, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export function Topbar() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Search Initiated', {
      description: 'Querying centralized crime databases...',
    });
  };

  const showNotifications = () => {
    toast('3 New Critical Alerts', {
      description: 'Review the Global Threat Feed for details.',
      action: {
        label: 'View',
        onClick: () => window.location.href = '/live'
      }
    });
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-md">
      <div className="flex flex-1 items-center">
        <form onSubmit={handleSearch} className="w-full max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search cases, suspects, or reports... (Press Enter)" 
            className="w-full pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <Button onClick={showNotifications} variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background animate-pulse"></span>
        </Button>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <Button onClick={() => window.location.href='/settings'} variant="ghost" className="flex items-center gap-3 p-1 hover:bg-transparent focus-visible:ring-0">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-medium text-foreground">Officer Sharma</span>
            <span className="text-xs text-muted-foreground">Cyber Cell H.Q.</span>
          </div>
          <Avatar className="h-9 w-9 border border-border hover:border-primary transition-colors cursor-pointer">
            <AvatarImage src="https://i.pravatar.cc/150?u=sharma" alt="@sharma" />
            <AvatarFallback className="bg-primary/20 text-primary">OS</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
