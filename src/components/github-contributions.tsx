"use client";

import { useEffect, useState } from "react";
import BlurFade from "./magicui/blur-fade";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubContributionsProps {
  username: string;
  delay?: number;
}

// Original GitHub green color function
const getGreenColor = (count: number): string => {
  if (count === 0) return '#ebedf0'; // Light gray for no contributions
  if (count <= 3) return '#9be9a8'; // Very light green
  if (count <= 6) return '#40c463'; // Light green
  if (count <= 9) return '#30a14e'; // Medium green
  return '#216e39'; // Dark green for high activity
};

export const GitHubContributions = ({ username, delay = 0 }: GitHubContributionsProps) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (!data.contributions) {
          setError(true);
          setLoading(false);
          return;
        }

        const allContributions: ContributionDay[] = data.contributions.map(
          (day: { date: string; count: number; level: number }) => ({
            date: day.date,
            contributionCount: day.count,
            color: getGreenColor(day.count),
          })
        );

        setContributions(allContributions);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <BlurFade delay={delay}>
        <div className="space-y-8 w-full py-8 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-muted animate-pulse rounded-md mx-auto" />
              <div className="h-4 w-80 bg-muted animate-pulse rounded-md mx-auto" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-card border rounded-lg p-6 w-full max-w-2xl">
              <div className="flex items-center gap-2 mb-4 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-muted animate-pulse" />
                ))}
              </div>
              <div className="flex gap-1 justify-center flex-wrap">
                {Array.from({ length: 52 }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIdx) => (
                      <div
                        key={dayIdx}
                        className="w-3 h-3 rounded-sm bg-muted animate-pulse"
                        style={{ animationDelay: `${(weekIdx * 7 + dayIdx) * 5}ms` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    );
  }

  if (error) {
    return (
      <BlurFade delay={delay}>
        <div className="space-y-8 w-full py-8 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">
                My GitHub Activity.
              </h2>
              <p className="text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here&apos;s my contribution graph showing my coding activity over the past year.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-card border rounded-lg p-8 w-full max-w-2xl flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Could not load contribution data</p>
                <p className="text-sm text-muted-foreground mt-1">
                  View activity directly on{" "}
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    );
  }

  // Create a simple contribution graph visualization
  const renderContributionGraph = () => {
    const days = contributions.slice(-365); // Last 365 days
    const weeks = [];
    
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: day.contributionCount > 0 ? getGreenColor(day.contributionCount) : '#ebedf0',
                }}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <BlurFade delay={delay}>
      <div className="space-y-8 w-full py-8 md:py-12">
        {/* Title first for both mobile and desktop */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">
              My GitHub Activity.
            </h2>
            <p className="text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here&apos;s my contribution graph showing my coding activity over the past year.
            </p>
          </div>
        </div>
        
        {/* Graph container - different behavior for mobile vs desktop */}
        <div className="flex justify-center">
          {/* Mobile: Fixed width container with scrollable graph */}
          <div className="md:hidden w-full max-w-4xl">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
                  <span className="text-sm text-muted-foreground">Less</span>
                </div>
                <div className="flex items-center gap-1">
                  {['#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">More</span>
              </div>
              <div className="overflow-x-auto">
                <div className="flex justify-center min-w-[600px]">
                  {renderContributionGraph()}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Full width with left-aligned graph */}
          <div className="hidden md:block bg-card border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
                <span className="text-sm text-muted-foreground">Less</span>
              </div>
              <div className="flex items-center gap-1">
                {['#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">More</span>
            </div>
            <div className="flex justify-start">
              {renderContributionGraph()}
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}; 
