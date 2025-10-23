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
import { getTrackStats } from "@/lib/trackStats";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TrackStatsChart({ tracks }: { tracks: any[] }) {
  const stats = getTrackStats(tracks);

  const buildChartData = (data: Record<string, number>, label: string) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label,
        data: Object.values(data),
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind blue-600
      },
    ],
  });

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">📊 Track Charts</h2>

      <div>
        <h3 className="font-semibold mb-2">Genres</h3>
        <Bar data={buildChartData(stats.genreCount, "Genre Count")} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Keys</h3>
        <Bar data={buildChartData(stats.keyCount, "Key Count")} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Artists</h3>
        <Bar data={buildChartData(stats.artistCount, "Artist Count")} />
      </div>
    </div>
  );
}
