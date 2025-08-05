
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import SevenPIcon from '@/components/icons/seven-p-logo';
import { LogOut, User, Settings } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [streak, setStreak] = useState(7); // Example streak
  const [greeting, setGreeting] = useState('');

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed Out', description: 'You have been successfully signed out.' });
    router.push('/auth');
  };

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    };
    setGreeting(getGreeting());
  }, []);

  const getStreakAcknowledgement = () => {
    if (streak > 30) return `Awesome ${streak}-day streak!`;
    if (streak > 7) return `Great ${streak}-day streak!`;
    if (streak > 2) return `You're on a ${streak}-day streak!`;
    if (streak > 0) return 'Keep it up!';
    return 'Start your streak today!';
  };

  return (
    <div className="w-full max-w-7xl flex items-center justify-between">
      {/* Mobile Layout */}
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex items-center space-x-3">
          <SevenPIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">{greeting}, {user?.displayName ?? 'User'}!</h1>
            <p className="text-sm text-muted-foreground">{getStreakAcknowledgement()}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src={user?.photoURL ?? 'https://placehold.co/40x40.png'} alt="User avatar" data-ai-hint="user avatar" />
              <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src={user?.photoURL ?? 'https://placehold.co/40x40.png'} alt="User avatar" data-ai-hint="user avatar" />
              <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{greeting}, {user?.displayName ?? 'User'}!</h1>
          <p className="text-muted-foreground">{getStreakAcknowledgement()}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
