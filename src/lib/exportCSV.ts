export function exportToCSV(tracks: any[]) {
  const header = ["Title", "Artist", "BPM", "Key", "Genre"];
  const rows = tracks.map((t) =>
    [t.title, t.artist, t.bpm, t.trackKey, t.genre ?? ""].join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "playlist.csv";
  a.click();
  URL.revokeObjectURL(url);
}
