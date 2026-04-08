"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analysisGen } from "@/lib/service/analysis-gen";
import { RotateCw, Sparkles, FileText, LoaderCircle } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import ReactMarkdown from "react-markdown";

export function ImageAnalysis() {
  const [image, setImage] = useState("");
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const onHandleImage = async () => {
    if (!image) return;
    setLoading(true);
    const createdAnalysis = await analysisGen(image, mimeType); // pass both
    if (createdAnalysis) setAnalysis(createdAnalysis);
    setLoading(false);
  };

  const onRefresh = () => {
    setImage("");
    setAnalysis("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="flex text-xl font-semibold gap-2">
            <Sparkles /> Image analysis
          </h1>
          <Button variant="outline" onClick={onRefresh}>
            <RotateCw />
          </Button>
        </div>

        <p>Upload a food photo, and AI will detect the ingredients.</p>

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-100"
        />

        <div className="flex justify-end">
          <Button onClick={onHandleImage} disabled={!image || loading}>
            Generate
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex text-xl font-semibold gap-2">
          <FileText /> Here is the summary
        </h1>

        {!analysis && !loading && (
          <p>First, enter your image to recognize an ingredients.</p>
        )}

        {loading && <p>Working on your image just wait for moment.</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed h-64 text-muted-foreground animate-pulse">
            <LoaderCircle className="animate-spin w-8 h-8" />
            <p className="text-sm">Analyzing your image...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border h-64 max-h-100 overflow-scroll max-w-fit p-2">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
