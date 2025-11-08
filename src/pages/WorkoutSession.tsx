import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Pause, Check, X, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Exercise {
  name: string;
  sets: string;
  calories: number;
}

interface WorkoutData {
  name: string;
  exercises: Exercise[];
  totalCalories: number;
  duration: string;
  coins: number;
}

const WorkoutSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutData = location.state as WorkoutData;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCompleteExercise = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    
    if (currentExerciseIndex < workoutData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      toast.success("Exercise completed! 🎉");
    } else {
      // All exercises completed
      setIsRunning(false);
      toast.success(`Workout complete! +${workoutData.coins} coins earned! 🏆`);
      setTimeout(() => navigate("/profile"), 2000);
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workoutData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      toast.info("Exercise skipped");
    }
  };

  const handleQuit = () => {
    if (confirm("Are you sure you want to quit this workout?")) {
      navigate("/ar");
    }
  };

  const currentExercise = workoutData.exercises[currentExerciseIndex];
  const progress = ((completedExercises.length) / workoutData.exercises.length) * 100;
  const earnedCalories = completedExercises.reduce(
    (sum, idx) => sum + workoutData.exercises[idx].calories,
    0
  );

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="min-h-screen w-full bg-background p-4 pb-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">{workoutData.name}</h1>
            <Button variant="ghost" size="sm" onClick={handleQuit}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {completedExercises.length} of {workoutData.exercises.length} exercises completed
          </p>
        </div>

        {/* Timer */}
        <Card className="p-6 text-center mb-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-5xl font-bold text-foreground mb-2">{formatTime(seconds)}</div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={isRunning ? "secondary" : "default"}
              size="lg"
              onClick={() => setIsRunning(!isRunning)}
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Current Exercise */}
        <Card className="p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {currentExercise.name}
              </h2>
              <p className="text-2xl font-semibold text-primary">{currentExercise.sets}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              <Zap className="w-3 h-3 mr-1" />
              {currentExercise.calories} cal
            </Badge>
          </div>

          <div className="space-y-2 mt-6">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCompleteExercise}
              disabled={!isRunning && seconds === 0}
            >
              <Check className="w-5 h-5 mr-2" />
              Complete Exercise
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSkipExercise}
              disabled={currentExerciseIndex === workoutData.exercises.length - 1}
            >
              Skip
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-bold text-foreground">{earnedCalories}</p>
            <p className="text-xs text-muted-foreground">Calories Burned</p>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-accent" />
            <p className="text-2xl font-bold text-foreground">
              {Math.floor((completedExercises.length / workoutData.exercises.length) * workoutData.coins)}
            </p>
            <p className="text-xs text-muted-foreground">Coins Earned</p>
          </Card>
        </div>

        {/* Exercise List */}
        <Card className="p-4 mt-4">
          <h3 className="font-semibold text-foreground mb-3">All Exercises</h3>
          <div className="space-y-2">
            {workoutData.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded ${
                  idx === currentExerciseIndex
                    ? "bg-primary/10 border-2 border-primary"
                    : completedExercises.includes(idx)
                    ? "bg-success/10 border border-success/20"
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  {completedExercises.includes(idx) ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : idx === currentExerciseIndex ? (
                    <div className="w-4 h-4 rounded-full border-2 border-primary animate-pulse" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">{exercise.sets}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {exercise.calories} cal
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutSession;
