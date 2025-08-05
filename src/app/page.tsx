
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { PersonalizedMealPlanningOutput } from '@/ai/flows/personalized-meal-planning';
import CalorieCard from '@/components/dashboard/calorie-card';
import MacroCard from '@/components/dashboard/macro-card';
import NextMealCard from '@/components/dashboard/next-meal-card';
import StreakCard from '@/components/dashboard/streak-card';
import WaterIntakeCard from '@/components/dashboard/water-intake-card';
import WeightCard from '@/components/dashboard/weight-card';
import DateNavigator from '@/components/dashboard/date-navigator';
import MealCard from '@/components/dashboard/meal-card';


import InsightsCard from '@/components/dashboard/insights-card';
import Header from '@/components/layout/header';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [plan, setPlan] = useState<PersonalizedMealPlanningOutput | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);


  const calorieData = {
    burned: 1540,
    left: 1340,
  };

  const macroData = [
    { name: 'Protein', current: 76, total: 164 },
    { name: 'Carbs', current: 142, total: 190 },
    { name: 'Fat', current: 32, total: 70 },
  ];

  const streakData = {
    days: 7,
  }

  const weightData = {
    current: 185.2,
    change: -1.3,
  }

  const waterIntakeData = {
    current: 6,
    goal: 8,
  }

  const initialMeals = {
    breakfast: [
        { name: 'Breakfast smoothie', size: '320ml', calories: 120, imageUrl: 'https://placehold.co/600x400.png' },
        { name: 'Omelette', size: '250g', calories: 444, imageUrl: 'https://placehold.co/600x400.png' },
    ],
    lunch: [
        { name: 'Chicken Salad', size: '350g', calories: 420, imageUrl: 'https://placehold.co/600x400.png' },
    ],
    dinner: [],
    snack: [
        { name: 'Apple', size: '1 medium', calories: 95, imageUrl: 'https://placehold.co/600x400.png' },
    ],
  };

  const [dailyMeals, setDailyMeals] = useState(initialMeals);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background font-sans p-4 md:p-8 md:pl-28">
      <Header />
      <div className="w-full max-w-7xl mt-4 space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-start">
        <div className="hidden md:flex md:flex-col md:space-y-4">
            <DateNavigator />
            <MealCard title="Breakfast" items={dailyMeals.breakfast} />
            <MealCard title="Lunch" items={dailyMeals.lunch} />
            <MealCard title="Dinner" items={dailyMeals.dinner} />
            <MealCard title="Snacks" items={dailyMeals.snack} />
        </div>
        <div className="w-full max-w-sm space-y-4 self-start mx-auto md:flex md:flex-col md:h-full">
            <div className="md:hidden">
              <StreakCard streak={streakData.days} />
            </div>
            <CalorieCard caloriesBurned={calorieData.burned} caloriesLeft={calorieData.left} />
            <div className="flex justify-between items-center space-x-3">
              {macroData.map(macro => (
                <MacroCard key={macro.name} name={macro.name} current={macro.current} total={macro.total} />
              ))}
            </div>
            <div className="md:hidden">
              <NextMealCard prepTime={plan?.prepTime ?? '1hr'} />
            </div>
            <div className="flex justify-between items-stretch space-x-4 md:hidden">
                <WeightCard currentWeight={weightData.current} weightChange={weightData.change} />
                <WaterIntakeCard currentIntake={waterIntakeData.current} goal={waterIntakeData.goal} />
            </div>
            <div className="pb-24 md:pb-0 flex-grow flex">
                <InsightsCard />
            </div>
        </div>
        <div className="hidden md:flex md:flex-col md:space-y-4">
          <WeightCard currentWeight={weightData.current} weightChange={weightData.change} />
          <WaterIntakeCard currentIntake={waterIntakeData.current} goal={waterIntakeData.goal} />
        </div>
      </div>
    </div>
  );
}
