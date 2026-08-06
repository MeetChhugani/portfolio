"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false to prevent SSR hydration mismatches with Three.js Canvas
const CarJourney = dynamic(() => import("./CarJourney"), {
  ssr: false,
  loading: () => (
    <div className="h-[100vh] w-full bg-[#030304] flex items-center justify-center font-mono text-xs text-zinc-500">
      <span>LOADING 3D CAR JOURNEY...</span>
    </div>
  )
});

export default function CarJourneyWrapper() {
  return <CarJourney />;
}
