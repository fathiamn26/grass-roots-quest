import { useState } from "react";
import { Trophy, Coins, Shirt, Lock, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const [selectedOutfit, setSelectedOutfit] = useState("casual");

  const userStats = {
    coins: 340,
    workoutsCompleted: 24,
    totalCalories: 2840,
    currentStreak: 5,
    level: 7,
    nextLevelXP: 450,
    currentXP: 320,
  };

  const outfits = [
    { id: "casual", name: "Casual", unlocked: true, cost: 0, emoji: "👕" },
    { id: "sport", name: "Sport Pro", unlocked: true, cost: 50, emoji: "🏃" },
    { id: "ninja", name: "Ninja", unlocked: true, cost: 100, emoji: "🥷" },
    { id: "superhero", name: "Superhero", unlocked: false, cost: 200, emoji: "🦸" },
    { id: "space", name: "Astronaut", unlocked: false, cost: 300, emoji: "🧑‍🚀" },
    { id: "royal", name: "Royal", unlocked: false, cost: 500, emoji: "👑" },
  ];

  const achievements = [
    { name: "First Steps", desc: "Complete your first workout", unlocked: true },
    { name: "Week Warrior", desc: "7 day streak", unlocked: true },
    { name: "Calorie Crusher", desc: "Burn 1000 calories", unlocked: true },
    { name: "Explorer", desc: "Visit 10 different spaces", unlocked: false },
    { name: "Marathon Master", desc: "Complete 50 workouts", unlocked: false },
  ];

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="min-h-screen w-full bg-background pb-20">
        <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card className="p-6 text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-7xl shadow-lg">
            {outfits.find((o) => o.id === selectedOutfit)?.emoji}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Alex Runner</h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="text-sm">
              Level {userStats.level}
            </Badge>
            <Badge variant="default" className="text-sm bg-accent">
              <Coins className="w-3 h-3 mr-1" />
              {userStats.coins}
            </Badge>
          </div>
          <Progress
            value={(userStats.currentXP / userStats.nextLevelXP) * 100}
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {userStats.currentXP}/{userStats.nextLevelXP} XP to level {userStats.level + 1}
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-accent" />
            <p className="text-xl font-bold text-foreground">{userStats.workoutsCompleted}</p>
            <p className="text-xs text-muted-foreground">Workouts</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <p className="text-xl font-bold text-foreground">{userStats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-xl font-bold text-foreground">{userStats.totalCalories}</p>
            <p className="text-xs text-muted-foreground">Calories</p>
          </Card>
        </div>

        {/* Wardrobe */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shirt className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Wardrobe</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {outfits.map((outfit) => (
              <button
                key={outfit.id}
                onClick={() => outfit.unlocked && setSelectedOutfit(outfit.id)}
                disabled={!outfit.unlocked}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedOutfit === outfit.id
                    ? "border-primary bg-primary/10"
                    : outfit.unlocked
                    ? "border-border hover:border-primary/50"
                    : "border-border opacity-50"
                }`}
              >
                <div className="text-4xl mb-1">{outfit.emoji}</div>
                <p className="text-xs font-medium text-foreground">{outfit.name}</p>
                {!outfit.unlocked && (
                  <>
                    <Lock className="absolute top-2 right-2 w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline" className="mt-1 text-xs">
                      <Coins className="w-3 h-3 mr-1" />
                      {outfit.cost}
                    </Badge>
                  </>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-foreground">Achievements</h2>
          </div>
          <div className="space-y-2">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.unlocked
                    ? "border-accent/30 bg-accent/5"
                    : "border-border opacity-50"
                }`}
              >
                <div className="text-2xl">
                  {achievement.unlocked ? "🏆" : "🔒"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Premium Upgrade */}
        <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
          <div className="flex items-start gap-3">
            <Crown className="w-6 h-6 text-accent mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Go Premium</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Unlock personalized training plans and 75% better mindfulness results
              </p>
              <Button className="w-full" variant="default">
                Upgrade Now
              </Button>
            </div>
          </div>
        </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
