import { Card, CardContent } from '@/components/ui/card';
import FireIcon from '@/components/icons/fire-icon';

type StreakCardProps = {
  streak: number;
};

const StreakCard = ({ streak }: StreakCardProps) => {
  return (
    <Card className="w-full max-w-sm bg-secondary rounded-2xl shadow-lg border-border">
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="bg-primary/20 p-3 rounded-full">
                <FireIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
                <p className="text-2xl font-bold text-foreground">{streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
        </div>
        <div className="flex -space-x-2">
            {Array.from({ length: Math.min(streak, 5) }).map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-primary border-2 border-secondary flex items-center justify-center">
                    <FireIcon className="h-5 w-5 text-black" />
                </div>
            ))}
            {streak > 5 && (
                 <div className="h-8 w-8 rounded-full bg-primary border-2 border-secondary flex items-center justify-center font-bold text-black text-xs">
                    +{streak - 5}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
