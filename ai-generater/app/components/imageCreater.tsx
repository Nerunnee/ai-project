"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { imageGen } from "@/lib/service/image-gen";
import { RotateCw, Sparkles, Image, LoaderCircle } from "lucide-react";
import { useState } from "react";

export function ImageCreater() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleImage = async () => {
    setLoading(true);
    const createdImg = await imageGen(prompt);

    if (createdImg) {
      setImage(createdImg);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setImage("");
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="flex text-xl font-semibold gap-2">
            <Sparkles /> Food image creator
          </h1>
          <Button variant="outline" onClick={onRefresh}>
            <RotateCw />
          </Button>
        </div>

        <p>What food image do you want? Describe it briefly.</p>

        <Input
          value={prompt}
          type="text"
          placeholder="Enter food description..."
          onChange={(event) => {
            setPrompt(event.target.value);
          }}
          className="w-100"
        />

        <div className="flex justify-end">
          <Button onClick={onHandleImage} disabled={!prompt || loading}>
            Generate
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex text-xl font-semibold gap-2 items-center">
          <Image /> Result
        </h1>

        {!image && !loading && (
          <p>First, enter your text to generate an image.</p>
        )}

        {loading && <p>Working on your image just wait for moment.</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed h-64 text-muted-foreground animate-pulse">
            <LoaderCircle className="animate-spin w-8 h-8" />
            <p className="text-sm">Generating your image...</p>
          </div>
        )}

        {image && !loading && (
          <div className="border rounded-3xl p-4">
            <p className="text-sm font-semibold mb-2">
              {prompt.toLocaleUpperCase()}
            </p>
            <img src={image} alt="Generated image" className="rounded-3xl" />
          </div>
        )}
      </div>
    </div>
  );
}
