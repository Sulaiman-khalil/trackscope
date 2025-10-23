"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function TempoProfile({ tracks }: { tracks: any[] }) {
  const bpmValues = tracks
    .map((t) => t.bpm)
    .filter((bpm) => typeof bpm === "number");

  const labels = tracks.map((t, i) => `${i + 1}. ${t.title}`);

  const data = {
    labels,
    datasets: [
      {
        label: "BPM over Track Order",
        data: bpmValues,
        borderColor: "rgba(239, 68, 68, 0.8)", // Tailwind red-500
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">📈 Tempo Profile</h3>
      <Line data={data} />
    </div>
  );
}
