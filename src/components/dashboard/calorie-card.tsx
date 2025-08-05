import FireIcon from '@/components/icons/fire-icon';

type CalorieCardProps = {
  caloriesBurned: number;
  caloriesLeft: number;
};

const CalorieCard = ({ caloriesBurned, caloriesLeft }: CalorieCardProps) => {
  const totalCalories = caloriesBurned + caloriesLeft;
  const progressPercentage = totalCalories > 0 ? (caloriesBurned / totalCalories) * 100 : 0;

  return (
    <div className="w-full max-w-sm p-2 bg-primary rounded-2xl shadow-lg space-y-3 flex-grow flex flex-col justify-center">
      <div className="flex justify-between items-center text-black">
        <h2 className="text-4xl font-semibold">Calories</h2>
        <p className="text-sm font-medium">{caloriesLeft.toLocaleString()} kcal left</p>
      </div>

      <div className="relative w-full h-12 bg-lime-200/50 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0, 0, 0, 0.25) 4px, rgba(0, 0, 0, 0.25) 8px)',
          }}
        ></div>

        <div
          className="absolute top-0 left-0 h-full bg-black rounded-full flex items-center transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="flex items-center space-x-2 pl-4">
            <FireIcon />
            <span className="font-bold text-lg text-white">{caloriesBurned.toLocaleString()} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCard;
