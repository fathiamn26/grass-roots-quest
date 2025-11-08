import { useState } from "react";
import { Camera, Zap, Target, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import arBenchView from "@/assets/ar-bench-view.jpg";

const ARScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedObject, setScannedObject] = useState<string | null>(null);

  const exercises = {
    bench: {
      name: "Park Bench Workout",
      exercises: [
        { name: "Step-ups", sets: "4 x 12", calories: 45 },
        { name: "Tricep Dips", sets: "3 x 10", calories: 35 },
        { name: "Incline Push-ups", sets: "3 x 15", calories: 40 },
      ],
      totalCalories: 120,
      duration: "15 min",
      coins: 25,
    },
    tree: {
      name: "Tree Circuit",
      exercises: [
        { name: "Tree Touches", sets: "5 x 20", calories: 30 },
        { name: "Around Tree Jog", sets: "3 min", calories: 40 },
        { name: "Lean Stretches", sets: "2 x 30s", calories: 15 },
      ],
      totalCalories: 85,
      duration: "10 min",
      coins: 18,
    },
    stairs: {
      name: "Stair Master Challenge",
      exercises: [
        { name: "Stair Sprints", sets: "5 x 1 min", calories: 70 },
        { name: "Step Lunges", sets: "3 x 12", calories: 45 },
        { name: "Calf Raises", sets: "4 x 15", calories: 35 },
      ],
      totalCalories: 150,
      duration: "20 min",
      coins: 35,
    },
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedObject("bench");
      setIsScanning(false);
    }, 2000);
  };

  const handleStartWorkout = () => {
    if (currentExercise) {
      navigate("/workout", { state: currentExercise });
    }
  };

  const currentExercise = scannedObject ? exercises[scannedObject as keyof typeof exercises] : null;

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="h-screen w-full bg-background flex flex-col pb-16">
      {/* AR Camera View */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Background camera view */}
        <img 
          src={arBenchView} 
          alt="AR camera view of park" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {!scannedObject ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-48 h-48 border-4 border-dashed border-primary rounded-lg animate-pulse bg-primary/5" />
                <Target className="w-12 h-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
              </div>
              {isScanning ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground drop-shadow-md">Scanning object...</p>
                  <Progress value={60} className="w-48 mx-auto" />
                </div>
              ) : (
                <p className="text-sm text-foreground drop-shadow-md font-medium">Point camera at park objects</p>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="text-center space-y-4 p-6">
              <div className="relative">
                <div className="w-48 h-48 border-4 border-primary rounded-lg bg-card/90 backdrop-blur-sm shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🪑</span>
                </div>
                <Badge className="absolute -top-2 -right-2 bg-success text-white shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  Bench Detected!
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Scan Button */}
        {!scannedObject && !isScanning && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
            <Button
              size="lg"
              onClick={handleScan}
              className="rounded-full w-20 h-20 shadow-lg"
            >
              <Camera className="w-8 h-8" />
            </Button>
          </div>
        )}
      </div>

      {/* Exercise Recommendations */}
      {currentExercise && (
        <div className="bg-card border-t border-border rounded-t-3xl p-4 space-y-4 max-h-[55vh] overflow-y-auto">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentExercise.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground">{currentExercise.duration}</span>
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {currentExercise.totalCalories} cal
                </Badge>
                <Badge variant="default" className="text-xs bg-accent">
                  <Trophy className="w-3 h-3 mr-1" />
                  {currentExercise.coins} coins
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {currentExercise.exercises.map((exercise, idx) => (
              <Card key={idx} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">{exercise.sets}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exercise.calories} cal
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleStartWorkout}>
              Start Workout
            </Button>
            <Button variant="outline" onClick={() => setScannedObject(null)}>
              Scan Again
            </Button>
          </div>
        </div>
      )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ARScanner;
