import { parseBeatportData } from "@/lib/beatportParser";

type Props = {
  onImport: (tracks: any[]) => void;
};

export default function JSONUploader({ onImport }: Props) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const raw = JSON.parse(reader.result as string);
      const parsed = parseBeatportData(raw);
      onImport(parsed);
    };
    reader.readAsText(file);
  };

  return (
    <input type="file" accept=".json" onChange={handleUpload} className="p-2" />
  );
}
