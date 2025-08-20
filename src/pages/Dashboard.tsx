import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!text.trim() && !file) {
      toast({
        title: "No input provided",
        description: "Please enter text or upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    // For now, show a mock analysis result
    toast({
      title: "Analysis Complete",
      description: "Sentiment analysis has been processed successfully!",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} is ready for analysis.`,
      });
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera feature",
      description: "Camera functionality will be available soon!",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sentiment Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Analyze text sentiment with advanced AI algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Text Analysis
              </CardTitle>
              <CardDescription>
                Enter or paste your text for sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Enter your text</Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter text or paste URL to analyze sentiment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="w-full"
                variant="gradient"
                disabled={!text.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                File Upload
              </CardTitle>
              <CardDescription>
                Upload documents, images, or other files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports text files, images, and documents
                </p>
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
                {file && (
                  <p className="mt-2 text-sm text-primary">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="w-full"
                variant="gradient"
                disabled={!file}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze File
              </Button>
            </CardContent>
          </Card>

          {/* Camera Capture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Camera Capture
              </CardTitle>
              <CardDescription>
                Capture images for text extraction and analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Use Camera</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Capture image to extract and analyze text
                </p>
                <Button onClick={handleCameraCapture} variant="outline">
                  Open Camera
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Statistics</CardTitle>
              <CardDescription>
                Your recent activity overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Analyses Today</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Total Files</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}