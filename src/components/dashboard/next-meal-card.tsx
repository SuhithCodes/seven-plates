import Image from 'next/image';
import { Card } from '@/components/ui/card';

type NextMealCardProps = {
  prepTime?: string;
};

const NextMealCard = ({ prepTime }: NextMealCardProps) => {
  return (
    <Card className="relative w-full h-36 bg-black rounded-2xl overflow-hidden shadow-lg text-white">
      <Image
        src="https://placehold.co/400x160.png"
        alt="Healthy meal"
        data-ai-hint="healthy meal"
        fill
        className="object-cover opacity-30"
      />
      <div className="relative z-10 p-6 flex items-end justify-between h-full bg-black/30">
        <h3 className="text-lg font-semibold">Next Meal</h3>
        {prepTime && (
            <div className="bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full">
            Prep | {prepTime}
            </div>
        )}
      </div>
    </Card>
  );
};

export default NextMealCard;
