'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Weight, ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const weightData = [
  { date: 'Jul 1', weight: 75.8 },
  { date: 'Jul 2', weight: 75.6 },
  { date: 'Jul 3', weight: 75.7 },
  { date: 'Jul 4', weight: 75.5 },
  { date: 'Jul 5', weight: 75.3 },
  { date: 'Jul 6', weight: 75.2 },
  { date: 'Jul 7', weight: 74.6 },
];

type WeightCardProps = {
  currentWeight: number;
  weightChange: number;
};

const WeightCard = ({ currentWeight, weightChange }: WeightCardProps) => {
  const isLoss = weightChange < 0;
  const patternId = isLoss ? "pattern-loss" : "pattern-gain";
  const strokeColor = isLoss ? "hsl(var(--primary))" : "hsl(var(--destructive))";

  return (
    <>
      {/* Mobile Version */}
      <Card className="flex-1 bg-black rounded-2xl shadow-lg border-border md:hidden">
        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Weight</CardTitle>
          <Button variant="outline" size="icon" className='rounded-full h-6 w-6'>
              <Plus className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-2xl font-bold text-foreground">{currentWeight} kg</div>
          <div className={`flex items-center text-xs ${isLoss ? 'text-primary' : 'text-destructive'}`}>
            {isLoss ? <ArrowDown className="h-4 w-4 mr-1" /> : <ArrowUp className="h-4 w-4 mr-1" />}
            <span>{Math.abs(weightChange)} kg</span>
            <span className="text-muted-foreground ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Version */}
      <Card className="hidden md:block w-full max-w-sm bg-card rounded-2xl shadow-lg border-border relative overflow-hidden">
        <div className="relative z-10">
          <CardHeader className="flex flex-row items-start justify-between">
              <div>
                  <div className='flex items-center gap-2'>
                      <Weight className="h-5 w-5 text-primary" />
                      <CardTitle className='text-lg font-bold'>Weight Trend</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                      Last 7 days
                  </p>
              </div>
              <Button variant="outline" size="icon" className='rounded-full h-8 w-8'>
                  <Plus className="h-4 w-4" />
              </Button>
          </CardHeader>
          <CardContent>
              <div className="h-44 relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weightData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                          <pattern id="pattern-loss" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                              <path d="M 0 0 L 0 8 M 4 0 L 4 8" stroke="hsl(var(--primary))" strokeWidth="1" />
                          </pattern>
                           <pattern id="pattern-gain" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                              <path d="M 0 0 L 0 8 M 4 0 L 4 8" stroke="hsl(var(--destructive))" strokeWidth="1" />
                          </pattern>
                      </defs>
                      <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={value => `${value.toFixed(1)}kg`}
                          domain={['dataMin - 0.5', 'dataMax + 0.5']}
                      />
                      <XAxis
                          dataKey="date"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                      />
                      <Tooltip
                          contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem',
                          }}
                          labelStyle={{
                              color: 'hsl(var(--foreground))'
                          }}
                      />
                      <Area type="monotone" dataKey="weight" stroke={strokeColor} strokeWidth={2} fillOpacity={0.4} fill={`url(#${patternId})`} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between">
              <div>
                  <p className="text-2xl font-bold">{currentWeight}kg</p>
                  <p className="text-sm text-muted-foreground">Current Weight</p>
              </div>
              <div className={`flex items-center font-semibold ${isLoss ? 'text-primary' : 'text-destructive'}`}>
                  {isLoss ? <ArrowDown className="h-4 w-4 mr-1" /> : <ArrowUp className="h-4 w-4 mr-1" />}
                  <span>{weightChange.toFixed(1)}kg this week</span>
              </div>
              </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default WeightCard;
