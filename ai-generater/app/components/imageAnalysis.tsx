"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analysisGen } from "@/lib/service/analysis-gen";
import { RotateCw, Sparkles, FileText, LoaderCircle } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export function ImageAnalysis() {
  const [image, setImage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const imageUrl: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setImage(event.target.value);
  };

  const onHandleImage = async () => {
    setLoading(true);
    const createdAnalysis = await analysisGen(image);

    if (createdAnalysis) {
      setAnalysis(createdAnalysis);
    }
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
          value={image}
          type="file"
          onChange={imageUrl}
          className="w-100"
        />

        <div className="flex justify-end">
          <Button onClick={onHandleImage}>Generate</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex text-xl font-semibold gap-2">
          <FileText /> Here is the summary
        </h1>

        {!analysis && !loading && (
          <p>First, enter your image to recognize an ingredients.</p>
        )}

        {loading && <p>Working...</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed h-64 text-muted-foreground animate-pulse">
            <LoaderCircle className="animate-spin w-8 h-8" />
            <p className="text-sm">Generating your image...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border h-64 max-h-100 overflow-scroll max-w-fit p-2">
            <p>{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}
