'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Map, 
  Activity, 
  Banknote, 
  Network, 
  LayoutDashboard,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Citizen Shield', href: '/citizen-shield', icon: ShieldCheck },
  { name: 'Crime Heatmap', href: '/heatmap', icon: Map },
  { name: 'Digital Arrest Detection', href: '/digital-arrest', icon: ShieldAlert },
  { name: 'Counterfeit Analysis', href: '/counterfeit', icon: Banknote },
  { name: 'Fraud Network', href: '/network', icon: Network },
  { name: 'Live Intelligence', href: '/live', icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border shadow-2xl">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border bg-background/50 backdrop-blur-md">
        <ShieldAlert className="h-8 w-8 text-primary" />
        <span className="ml-3 text-lg font-bold tracking-wider text-foreground">
          FraudShield<span className="text-primary">AI</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
        <nav className="flex-1 space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground border-l-4 border-transparent',
                  'group flex items-center rounded-r-md px-3 py-3 text-sm font-medium transition-all duration-200'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-border p-4">
        <Link
          href="/settings"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          Settings
        </Link>
      </div>
    </div>
  );
}
