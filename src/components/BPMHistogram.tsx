"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BPMHistogram({ tracks }: { tracks: any[] }) {
  const bucketSize = 3;
  const bpmValues = tracks
    .map((t) => t.bpm)
    .filter((bpm) => typeof bpm === "number");

  const buckets: Record<string, number> = {};

  for (const bpm of bpmValues) {
    const lower = Math.floor(bpm / bucketSize) * bucketSize;
    const upper = lower + bucketSize - 1;
    const label = `${lower}–${upper}`;
    buckets[label] = (buckets[label] || 0) + 1;
  }

  const data = {
    labels: Object.keys(buckets),
    datasets: [
      {
        label: "BPM Range",
        data: Object.values(buckets),
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Tailwind green-500
      },
    ],
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🔢 BPM Histogram</h3>
      <Bar data={data} />
    </div>
  );
}
