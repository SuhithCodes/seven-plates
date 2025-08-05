
'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';

type FoodItemProps = {
    name: string;
    size: string;
    calories: number;
};

const FoodItem = ({ name, size, calories }: FoodItemProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-foreground font-semibold text-lg">{name}</p>
                <p className="text-muted-foreground text-sm">{size}</p>
            </div>
            <p className="text-foreground font-semibold text-lg">{calories} kcal</p>
        </div>
    );
};

type MealCardItemProps = {
    name: string;
    size: string;
    calories: number;
    imageUrl: string;
};

type MealCardProps = {
    title: string;
    items: MealCardItemProps[];
};

const MealCard = ({ title, items }: MealCardProps) => {
    const [isImageError, setIsImageError] = useState(false);
    const totalCalories = useMemo(() => items.reduce((sum, item) => sum + item.calories, 0), [items]);
    const backgroundImageUrl = items.length > 0 ? items[0].imageUrl : '';

    if (items.length === 0) return null;

    const handleImageError = () => {
        setIsImageError(true);
    };

    return (
        <div className={`rounded-3xl w-full max-w-sm font-sans overflow-hidden relative ${isImageError ? 'bg-transparent' : 'bg-secondary'}`}>
            {!isImageError && backgroundImageUrl && (
                <>
                    <Image 
                        src={backgroundImageUrl} 
                        alt=""
                        fill
                        className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </>
            )}
            
            <div className="relative z-10 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white text-2xl font-bold">{title}</h2>
                    <p className="text-white text-2xl font-bold">{totalCalories} kcal</p>
                </div>
                
                <hr className="border-border mb-4" />
                
                <div className="flex flex-col gap-2">
                    {items.map((item, index) => (
                        <FoodItem key={`${item.name}-${index}`} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealCard;
