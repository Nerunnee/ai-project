import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageCreater } from "./components/imageCreater";
import { ImageAnalysis } from "./components/imageAnalysis";
import { ImageIngredient } from "./components/imageIngredient";

export default function Home() {
  return (
    <Tabs defaultValue="overview" className="w-100">
      <TabsList className="my-6">
        <TabsTrigger value="text">Image analysis</TabsTrigger>
        <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
        <TabsTrigger value="image">Image creator</TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <ImageAnalysis />
      </TabsContent>
      <TabsContent value="ingredient">
        <ImageIngredient />
      </TabsContent>
      <TabsContent value="image">
        <ImageCreater />
      </TabsContent>
    </Tabs>
  );
}
