'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WandSparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const InsightsCard = () => {
  return (
    <Card className="w-full max-w-sm bg-secondary rounded-2xl shadow-lg border-border flex-grow flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center text-lg font-bold">
          <WandSparkles className="h-5 w-5 mr-2 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow py-1">
        <p className="text-sm text-muted-foreground">
          Get personalized meal plans and insights based on your lifestyle and goals.
        </p>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
