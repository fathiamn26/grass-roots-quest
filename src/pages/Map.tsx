import { useState } from "react";
import { MapPin, Cloud, Wind, Droplets, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const nearbySpaces = [
    {
      id: 1,
      name: "Central Park",
      distance: "0.3 km",
      difficulty: "Easy",
      terrain: "Flat grass",
      activities: ["Running", "Yoga", "Walking"],
      lat: 51.505,
      lng: -0.09,
    },
    {
      id: 2,
      name: "Hill Gardens",
      distance: "0.8 km",
      difficulty: "Moderate",
      terrain: "Hilly trails",
      activities: ["Hiking", "Trail Running"],
      lat: 51.508,
      lng: -0.085,
    },
    {
      id: 3,
      name: "Riverside Walk",
      distance: "1.2 km",
      difficulty: "Easy",
      terrain: "Paved path",
      activities: ["Walking", "Jogging", "Cycling"],
      lat: 51.502,
      lng: -0.095,
    },
  ];

  const weather = {
    temp: 18,
    condition: "Partly Cloudy",
    aqi: 42,
    aqiLevel: "Good",
    humidity: 65,
    windSpeed: 12,
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Weather Widget */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <Card className="flex-1 p-3 bg-card/95 backdrop-blur-sm border-border shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-semibold text-foreground">{weather.temp}°C</p>
                <p className="text-xs text-muted-foreground">{weather.condition}</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3" />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3" />
                <span>{weather.humidity}%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-3 bg-card/95 backdrop-blur-sm border-border shadow-md">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">AQI {weather.aqi}</p>
              <p className="text-xs text-muted-foreground">{weather.aqiLevel}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Map Preview */}
      <div className="flex-1 relative bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Map with terrain contours</p>
            <p className="text-xs text-muted-foreground">Your location: 51.505, -0.09</p>
          </div>
        </div>

        {/* Location Markers */}
        {nearbySpaces.map((space, idx) => (
          <div
            key={space.id}
            className="absolute w-10 h-10 cursor-pointer transition-transform hover:scale-110"
            style={{
              left: `${30 + idx * 20}%`,
              top: `${40 + idx * 10}%`,
            }}
            onClick={() => setSelectedLocation(space.id)}
          >
            <div className="w-full h-full bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-background">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet - Nearby Spaces */}
      <div className="bg-card border-t border-border rounded-t-3xl p-4 space-y-3 max-h-[45vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-foreground">Nearby Spaces</h2>
          <Badge variant="secondary" className="text-xs">
            {nearbySpaces.length} found
          </Badge>
        </div>

        {nearbySpaces.map((space) => (
          <Card
            key={space.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedLocation === space.id ? "border-primary shadow-md" : ""
            }`}
            onClick={() => setSelectedLocation(space.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{space.name}</h3>
                <p className="text-sm text-muted-foreground">{space.distance} away</p>
              </div>
              <Badge
                variant={
                  space.difficulty === "Easy"
                    ? "secondary"
                    : space.difficulty === "Moderate"
                    ? "default"
                    : "destructive"
                }
              >
                {space.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{space.terrain}</p>
            <div className="flex gap-1 flex-wrap">
              {space.activities.map((activity) => (
                <Badge key={activity} variant="outline" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Map;
