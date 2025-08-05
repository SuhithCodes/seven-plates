
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, GlassWater } from 'lucide-react';
import { cn } from '@/lib/utils';

type WaterIntakeCardProps = {
  currentIntake: number;
  goal: number;
};

const WaterGlass = ({ isFilled }: { isFilled: boolean }) => {
  return (
    <div className="text-center">
        <GlassWater
        className={cn(
            "h-16 w-16 mx-auto transition-all duration-300",
            isFilled ? "text-primary fill-primary/20" : "text-secondary"
        )}
        strokeWidth={1.5}
        />
    </div>
  );
};

const WaterIntakeCard = ({ currentIntake: initialIntake, goal }: WaterIntakeCardProps) => {
    const [currentIntake, setCurrentIntake] = useState(initialIntake);
    const progressPercentage = (currentIntake / goal) * 100;
    const currentLiters = (currentIntake * 0.25).toFixed(1);
    const goalLiters = (goal * 0.25).toFixed(1);

    const handleIntake = () => {
        if(currentIntake < goal) {
            setCurrentIntake(currentIntake + 1);
        }
    }

    const handleUndo = () => {
        if (currentIntake > 0) {
            setCurrentIntake(currentIntake - 1);
        }
    }

  return (
    <>
      {/* Mobile Version */}
      <Card className="flex-1 bg-black rounded-2xl shadow-lg border-border md:hidden">
        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Water Intake</CardTitle>
          <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleUndo} disabled={currentIntake === 0} className='rounded-full h-6 w-6'>
                  <Minus className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleIntake} disabled={currentIntake === goal} className='rounded-full h-6 w-6'>
                  <Plus className="h-3 w-3" />
              </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-2xl font-bold text-foreground">{currentIntake}<span className="text-base font-normal text-muted-foreground">/{goal} glasses</span></div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Version */}
      <Card className="hidden md:block w-full max-w-sm bg-card rounded-2xl shadow-lg border-border">
        <CardHeader className="flex flex-row items-start justify-between pb-3">
          <div>
              <div className='flex items-center gap-2'>
                  <GlassWater className="h-5 w-5 text-primary" />
                  <CardTitle className='text-lg'>Water Intake</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                  {currentIntake} of {goal} glasses
              </p>
          </div>
          <div className='flex items-center justify-end gap-2'>
              <Button variant="outline" size="icon" onClick={handleUndo} disabled={currentIntake === 0} className='rounded-full h-8 w-8'>
                  <Minus className='h-4 w-4' />
              </Button>
              <Button variant="default" size="icon" onClick={handleIntake} disabled={currentIntake === goal} className='rounded-full h-8 w-8'>
                  <Plus className='h-4 w-4' />
              </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: goal }).map((_, index) => (
                  <WaterGlass key={index} isFilled={index < currentIntake} />
              ))}
          </div>
          <div className="text-center mt-4">
              <p className="text-lg font-bold text-foreground">{currentLiters}L / {goalLiters}L</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WaterIntakeCard;
