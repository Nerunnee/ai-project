"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ingredientGen } from "@/lib/service/ingredient-gen";
import { RotateCw, Sparkles, FileText, LoaderCircle } from "lucide-react";
import { useState } from "react";

export function ImageIngredient() {
  const [prompt, setPrompt] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleIngredient = async () => {
    setLoading(true);
    const createdText = await ingredientGen(prompt);

    if (createdText) {
      setIngredient(createdText);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setIngredient("");
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="flex text-xl font-semibold gap-2">
            <Sparkles /> Ingredient recognition
          </h1>
          <Button variant="outline" onClick={onRefresh}>
            <RotateCw />
          </Button>
        </div>

        <p>Describe the food, and AI will detect the ingredients.</p>

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
          <Button onClick={onHandleIngredient}>Generate</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex text-xl font-semibold gap-2">
          <FileText /> Identified Ingredients
        </h1>

        {!ingredient && !loading && (
          <p>First, enter your text to recognize an ingredients.</p>
        )}

        {loading && <p>Working on your image just wait for moment.</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed h-64 text-muted-foreground animate-pulse">
            <LoaderCircle className="animate-spin w-8 h-8" />
            <p className="text-sm">Generating food ingredients...</p>
          </div>
        )}

        {ingredient && !loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border h-64 max-h-100 overflow-scroll max-w-fit p-2">
            <p>{ingredient}</p>
          </div>
        )}
      </div>
    </div>
  );
}
