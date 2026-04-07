"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function main() {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt:
              "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme",
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error ?? `Server error: ${res.status}`);
        }

        const data = await res.json();

        if (data.text) setText(data.text);
        if (data.image) {
          setImageSrc(`data:${data.mimeType};base64,${data.image}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    main();
  }, []);

  if (loading) return <p>Generating image...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {text && <p>{text}</p>}
      {imageSrc && <img src={imageSrc} alt="Generated" />}
    </div>
  );
}
