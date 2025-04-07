import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const defaultNovels = [
  { id: 1, title: "Novel Pertama", content: "Ini adalah isi dari Novel Pertama..." },
  { id: 2, title: "Novel Kedua", content: "Isi Novel Kedua dimulai dari sini..." },
];

export default function NovelReader() {
  const [novels, setNovels] = useState(defaultNovels);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const savedId = localStorage.getItem("lastReadId");
    const scrollPos = localStorage.getItem("scrollPos");
    if (savedId) {
      const found = novels.find(n => n.id === parseInt(savedId));
      if (found) setSelectedNovel(found);
      setTimeout(() => {
        if (scrollPos && contentRef.current) {
          contentRef.current.scrollTop = parseInt(scrollPos);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleScroll = () => {
    if (contentRef.current) {
      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      setScrollPercent(percent);
      localStorage.setItem("scrollPos", scrollTop);
    }
  };

  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (novel) => {
    setSelectedNovel(novel);
    localStorage.setItem("lastReadId", novel.id);
    setTimeout(() => {
      const scrollPos = localStorage.getItem("scrollPos");
      if (scrollPos && contentRef.current) {
        contentRef.current.scrollTop = parseInt(scrollPos);
      }
    }, 100);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      setNovels(prev => [
        ...prev,
        {
          id: prev.length + 1,
          title: file.name,
          content,
        },
      ]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-base">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Baca Novel</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="mode">Mode Gelap</Label>
          <Switch id="mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      {!selectedNovel ? (
        <div>
          <Input
            placeholder="Cari novel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4"
          />
          <Input type="file" accept=".txt" onChange={handleUpload} className="mb-4" />
          <div className="grid gap-4">
            {filteredNovels.map(novel => (
              <Card key={novel.id} onClick={() => handleSelect(novel)} className="cursor-pointer hover:bg-muted">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{novel.title}</h2>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => setSelectedNovel(null)} className="mb-4">Kembali</Button>
          <h2 className="text-2xl font-bold mb-2">{selectedNovel.title}</h2>
          <Progress value={scrollPercent} className="mb-4 h-2" />
          <div
            ref={contentRef}
            className="bg-muted p-4 rounded-xl whitespace-pre-wrap max-h-[70vh] overflow-y-auto"
            onScroll={handleScroll}
          >
            {selectedNovel.content}
          </div>
        </div>
      )}
    </div>
  );
}