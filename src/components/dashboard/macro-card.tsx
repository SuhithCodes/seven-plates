'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

type MacroCardProps = {
  name: string;
  current: number;
  total: number;
};

const MacroCard = ({ name, current, total }: MacroCardProps) => {
  const progressPercentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <Card className="relative flex-1 bg-black rounded-2xl overflow-hidden h-48 text-card-foreground shadow-lg border-none">
      <div
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 4px, hsl(var(--primary)) 4px, hsl(var(--primary)) 8px)',
        }}
      ></div>
      <div className="relative z-20 flex flex-col h-full p-0">
        <CardHeader className="text-center p-4">
          <CardTitle className="text-base font-semibold text-gray-300">{name}</CardTitle>
        </CardHeader>
        <div className="flex-grow" />
        <div
          className="bottom-0 left-0 w-full bg-primary rounded-t-xl flex flex-col justify-center items-center p-2 z-10 transition-all duration-500 ease-out"
          style={{ height: `${progressPercentage}%` }}
        >
          {progressPercentage > 25 && (
            <div className="text-black text-center">
              <p className="font-bold text-xl">{current}g</p>
              <p className="text-xs font-medium">of {total}g</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MacroCard;
