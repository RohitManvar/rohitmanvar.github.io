"use client";

import React, { useState, useEffect, useRef, Component, memo } from "react";
import { ComposableMap, Geographies, Geography, Sphere, Marker } from "react-simple-maps";
import { MapPin } from "lucide-react";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

class GlobeErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const GlobeMap = memo(function GlobeMap({ rotation }: { rotation: number }) {
  return (
    <ComposableMap
      projection="geoOrthographic"
      projectionConfig={{ rotate: [-rotation, -15, 0], scale: 210 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Sphere stroke="currentColor" strokeWidth={0.5} fill="transparent" id="sphere" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isIndia = geo.properties.name === "India";
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isIndia ? "currentColor" : "transparent"}
                stroke="currentColor"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: isIndia ? "currentColor" : "rgba(100, 100, 100, 0.1)" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
      <Marker coordinates={[73.1812, 22.3072]}>
        <g transform="translate(-4, -4)" className="text-background">
          <circle cx="4" cy="4" r="4" fill="currentColor" className="animate-ping opacity-75" />
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </g>
      </Marker>
    </ComposableMap>
  );
});

// The globe's geography data is expensive to re-process (react-simple-maps
// re-derives paths from the TopoJSON on every render), so we drive rotation
// as a low-frequency state update instead of a per-frame one — a visually
// smooth rotation only needs a handful of steps per second, not 60.
const ROTATION_STEP_MS = 100;

export function Globe3D() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        setRotation((r) => (r + 1) % 360);
      }, ROTATION_STEP_MS);
    };
    const stop = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Pause the animation entirely when the globe is scrolled out of view
    // so it doesn't compete with route/page-transition work elsewhere.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(container);

    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  const locationPin = (
    <div className="absolute -bottom-6 z-10 pointer-events-none flex items-center justify-center">
      <span className="inline-flex items-center gap-2 text-sm font-medium bg-background/80 text-foreground px-4 py-2 rounded-full border shadow-sm transition-transform hover:scale-105 pointer-events-auto cursor-pointer">
        <MapPin className="size-4 text-primary" /> Vadodara, India
      </span>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full relative mt-8 flex flex-col items-center">
      <div className="w-full h-[300px] relative rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
        <div className="w-[450px] h-[450px]">
          <GlobeErrorBoundary fallback={
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              <span>📍 Vadodara, India</span>
            </div>
          }>
            <GlobeMap rotation={rotation} />
          </GlobeErrorBoundary>
        </div>
      </div>
      {locationPin}
    </div>
  );
}
