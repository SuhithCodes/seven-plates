
'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { analyzeFood, FoodAnalysisOutput } from '@/ai/flows/food-analysis-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type LogMealModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LogMealModal = ({ isOpen, onClose }: LogMealModalProps) => {
  const [dishName, setDishName] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisOutput | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      };

      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [isOpen, toast]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImageSrc(dataUri);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
            setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imageSrc) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please take a picture or upload an image.' });
      return;
    }
    if (!dishName) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please enter a dish name.' });
        return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeFood({ photoDataUri: imageSrc, dishName });
      setAnalysisResult(result);
      if (!result.isFood) {
        toast({
          variant: 'destructive',
          title: 'Analysis Result',
          description: 'The AI determined this is not food. Please try another image.',
        });
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to analyze the meal. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setDishName('');
    setImageSrc(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setMealType('breakfast');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetState()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log a Meal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dishName">Dish Name</Label>
              <Input id="dishName" value={dishName} onChange={(e) => setDishName(e.target.value)} placeholder="e.g., Chicken Salad" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mealType">Meal</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger id="mealType">
                  <SelectValue placeholder="Select a meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="space-y-2">
            <Label>Take a picture</Label>
            <div className="w-full aspect-video rounded-md bg-secondary overflow-hidden flex items-center justify-center">
                {imageSrc ? (
                    <img src={imageSrc} alt="Captured meal" className="w-full h-full object-cover" />
                ) : (
                    <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                )}
            </div>
            <canvas ref={canvasRef} className="hidden" />

            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature. You can upload a file instead.
                    </AlertDescription>
                </Alert>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={captureImage} disabled={!hasCameraPermission} className="w-full">
              Take Picture
            </Button>
            <div className='relative w-full'>
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="upload-photo" className="cursor-pointer">Upload Photo</label>
              </Button>
              <input type="file" id="upload-photo" accept="image/*" onChange={handleFileChange} className="sr-only" />
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing your meal...</span>
            </div>
          )}

          {analysisResult && analysisResult.isFood && (
            <Alert variant="default">
                <AlertTitle>Macro Estimation</AlertTitle>
                <AlertDescription>
                    <p>Calories: {analysisResult.calories} kcal</p>
                    <p>Protein: {analysisResult.macros.protein}g</p>
                    <p>Carbs: {analysisResult.macros.carbs}g</p>
                    <p>Fat: {analysisResult.macros.fat}g</p>
                </AlertDescription>
            </Alert>
          )}

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetState}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {analysisResult && analysisResult.isFood ? 'Log Meal' : 'Analyze'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogMealModal;
