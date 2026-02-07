import { useState } from "react";
import { useCreatePrediction } from "@/hooks/use-predictions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, X, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock AI logic (simulated delay and response) since we don't have a real Python backend for image processing here
const SIMULATED_DISEASES = [
  { plant: "Wheat", name: "Wheat Rust", treatment: "Apply fungicides like tebuconazole. Ensure proper spacing between plants." },
  { plant: "Potato", name: "Potato Blight", treatment: "Remove infected leaves immediately. Spray copper-based fungicides." },
  { plant: "Rice", name: "Rice Blast", treatment: "Maintain water level in the field. Use resistant varieties. Apply tricyclazole." },
  { plant: "Tomato", name: "Healthy", treatment: "No treatment needed. Keep maintaining good irrigation and soil nutrition." }
];

export default function Detect() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const { mutate, isPending } = useCreatePrediction();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const handlePredict = () => {
    if (!selectedFile) return;

    // Simulate AI prediction
    // In a real app, we'd upload the file via FormData here
    const randomResult = SIMULATED_DISEASES[Math.floor(Math.random() * SIMULATED_DISEASES.length)];
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%

    mutate({
      imageUrl: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&q=80", // Mock URL
      plantName: randomResult.plant,
      diseaseName: randomResult.name,
      confidence,
      treatment: randomResult.treatment,
    }, {
      onSuccess: (data) => {
        setResult(data);
        toast({
          title: "Analysis Complete",
          description: `Detected ${data.plantName} with ${data.diseaseName}.`,
        });
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold">Crop Disease Detection</h1>
        <p className="text-muted-foreground">Upload a photo of your crop leaf to identify diseases and get treatment advice.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-secondary/20">
          <CardContent 
            className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-lg w-full aspect-[4/3] group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="sm" onClick={clearImage}>
                      <X className="mr-2 h-4 w-4" /> Remove Image
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 w-full">
                  <Button 
                    size="lg" 
                    className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
                    onClick={handlePredict}
                    disabled={isPending || !!result}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                      </>
                    ) : result ? (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Analysis Done
                      </>
                    ) : (
                      "Predict Disease"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Drag & Drop or Click to Upload</h3>
                  <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG (Max 5MB)</p>
                </div>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="image-upload"
                  onChange={handleFileChange}
                />
                <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                  Select Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-2 h-full ${result.diseaseName === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`} />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-1">{result.plantName}</h3>
                      <h2 className="text-2xl font-bold font-display">{result.diseaseName}</h2>
                      <p className="text-muted-foreground text-sm">Detected with AI</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      result.diseaseName === 'Healthy' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {result.confidence}% Confidence
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-xl border border-secondary">
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        Suggested Treatment
                      </h4>
                      <p className="text-foreground/80 leading-relaxed">
                        {result.treatment}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-2">Next Steps</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Monitor affected area daily</li>
                    <li>Isolate healthy plants if possible</li>
                    <li>Follow the recommended treatment schedule</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed border-border rounded-2xl bg-secondary/10">
                <div className="w-16 h-16 rounded-full bg-secondary mb-4 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                <p className="max-w-xs mx-auto">Upload an image and click predict to see the diagnosis and treatment plan here.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
