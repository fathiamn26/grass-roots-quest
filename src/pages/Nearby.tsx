import { Search, MapPin, TrendingUp, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Nearby = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const spaces = [
    {
      id: 1,
      name: "Central Park",
      distance: "0.3 km",
      difficulty: "Easy",
      terrain: "Flat grass",
      activities: ["Running", "Yoga", "Walking"],
      elevation: "5m gain",
      weather: "Perfect",
      image: "🌳",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Hill Gardens",
      distance: "0.8 km",
      difficulty: "Moderate",
      terrain: "Hilly trails",
      activities: ["Hiking", "Trail Running"],
      elevation: "45m gain",
      weather: "Good",
      image: "⛰️",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Riverside Walk",
      distance: "1.2 km",
      difficulty: "Easy",
      terrain: "Paved path",
      activities: ["Walking", "Jogging", "Cycling"],
      elevation: "2m gain",
      weather: "Perfect",
      image: "🌊",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Forest Trail",
      distance: "2.1 km",
      difficulty: "Hard",
      terrain: "Rocky paths",
      activities: ["Hiking", "Adventure"],
      elevation: "120m gain",
      weather: "Good",
      image: "🌲",
      rating: 4.5,
    },
  ];

  const popularActivities = [
    "Running",
    "Walking",
    "Yoga",
    "Hiking",
    "Cycling",
    "Trail Running",
  ];

  const filteredSpaces = spaces.filter((space) =>
    searchQuery
      ? space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.activities.some((a) =>
          a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
  );

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="sticky top-0 bg-background pt-2 pb-2 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search activities or places..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Popular Activities */}
        {!searchQuery && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Popular Activities
            </h3>
            <div className="flex gap-2 flex-wrap">
              {popularActivities.map((activity) => (
                <Badge
                  key={activity}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchQuery(activity)}
                >
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {searchQuery ? "Search Results" : "Nearby Spaces"}
          </h2>
          <Badge variant="outline">{filteredSpaces.length} found</Badge>
        </div>

        {/* Spaces List */}
        <div className="space-y-3">
          {filteredSpaces.map((space) => (
            <Card
              key={space.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-3">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-4xl flex-shrink-0">
                  {space.image}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {space.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{space.distance}</span>
                        <span>•</span>
                        <span>⭐ {space.rating}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        space.difficulty === "Easy"
                          ? "secondary"
                          : space.difficulty === "Moderate"
                          ? "default"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {space.difficulty}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {space.terrain} • {space.elevation}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {space.activities.map((activity) => (
                      <Badge
                        key={activity}
                        variant="outline"
                        className="text-xs"
                      >
                        {activity}
                      </Badge>
                    ))}
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        space.weather === "Perfect"
                          ? "bg-success/10 text-success border-success/20"
                          : ""
                      }`}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {space.weather}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Elevation {space.elevation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🌡️ 18°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💨 12 km/h</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No spaces found</p>
            <p className="text-sm text-muted-foreground">
              Try searching for different activities
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nearby;
