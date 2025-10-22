"use client";

import { useState } from "react";

export default function TracklistParser({
  onParse,
}: {
  onParse: (tracks: any[]) => void;
}) {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<any[]>([]);
  const [invalidLines, setInvalidLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const parseTracklist = () => {
    const lines = input.split("\n").filter((line) => line.trim());
    const valid: any[] = [];
    const invalid: string[] = [];

    for (const line of lines) {
      const match = line.match(/^(.*)\s+[-–]\s+(.*)$/);
      if (match) {
        const [, artist, title] = match;
        valid.push({ title: title.trim(), artist: artist.trim() });
      } else {
        invalid.push(line);
      }
    }

    setParsed(valid);
    setInvalidLines(invalid);
    onParse(valid);
  };

  const copyJSON = async () => {
    await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste tracklist here (e.g. Recondite – Tide)"
        className="w-full h-40 p-2 border rounded"
      />

      <div className="flex gap-4">
        <button
          onClick={parseTracklist}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Parse Tracklist
        </button>

        {parsed.length > 0 && (
          <button
            onClick={copyJSON}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {copied ? "Copied!" : "Copy JSON"}
          </button>
        )}
      </div>

      {parsed.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      )}

      {invalidLines.length > 0 && (
        <div className="text-red-600 text-sm">
          ⚠️ Ungültige Zeilen:
          <ul className="list-disc ml-6">
            {invalidLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
