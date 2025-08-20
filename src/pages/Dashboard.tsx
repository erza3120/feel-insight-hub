import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, FileText, Sparkles, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CameraCapture } from "@/components/Camera/CameraCapture";
import { extractTextFromImage, analyzeSentiment, OCRResult } from "@/utils/ocrProcessor";

interface AnalysisResult {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  summary: string;
  source: 'text' | 'file' | 'camera';
  ocrConfidence?: number;
}

export default function Dashboard() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const performSentimentAnalysis = (textToAnalyze: string, source: 'text' | 'file' | 'camera', ocrResult?: OCRResult) => {
    const analysis = analyzeSentiment(textToAnalyze);
    
    const result: AnalysisResult = {
      text: textToAnalyze,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      summary: analysis.summary,
      source,
      ocrConfidence: ocrResult?.confidence
    };
    
    setAnalysisResult(result);
    
    toast({
      title: "Analysis Complete",
      description: `${analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)} sentiment detected (${analysis.confidence}% confidence)`,
    });
  };

  const handleAnalyzeText = () => {
    if (!text.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter text to analyze.",
        variant: "destructive",
      });
      return;
    }

    performSentimentAnalysis(text.trim(), 'text');
  };

  const handleAnalyzeFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      if (file.type.startsWith('image/')) {
        // Process image with OCR
        const ocrResult = await extractTextFromImage(file);
        
        if (!ocrResult.text.trim()) {
          toast({
            title: "No text found",
            description: "Unable to extract text from the image.",
            variant: "destructive",
          });
          return;
        }
        
        performSentimentAnalysis(ocrResult.text, 'file', ocrResult);
      } else {
        // Process text file
        const textContent = await file.text();
        performSentimentAnalysis(textContent, 'file');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the uploaded file.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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

  const handleCameraCapture = async (imageBlob: Blob) => {
    setIsAnalyzing(true);
    
    try {
      const ocrResult = await extractTextFromImage(imageBlob);
      
      if (!ocrResult.text.trim()) {
        toast({
          title: "No text found",
          description: "Unable to extract text from the captured image.",
          variant: "destructive",
        });
        return;
      }
      
      performSentimentAnalysis(ocrResult.text, 'camera', ocrResult);
    } catch (error) {
      console.error('Error processing camera image:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the captured image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'file': return <Upload className="h-4 w-4" />;
      case 'camera': return <Camera className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
                onClick={handleAnalyzeText} 
                className="w-full"
                variant="gradient"
                disabled={!text.trim() || isAnalyzing}
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
                onClick={handleAnalyzeFile} 
                className="w-full"
                variant="gradient"
                disabled={!file || isAnalyzing}
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
                <Button onClick={() => setIsCameraOpen(true)} variant="outline" disabled={isAnalyzing}>
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

        {/* Analysis Results */}
        {analysisResult && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Sentiment analysis results for your {analysisResult.source} input
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  {getSourceIcon(analysisResult.source)}
                  {analysisResult.source.charAt(0).toUpperCase() + analysisResult.source.slice(1)}
                </Badge>
                <Badge className={getSentimentColor(analysisResult.sentiment)}>
                  {analysisResult.sentiment.charAt(0).toUpperCase() + analysisResult.sentiment.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {analysisResult.confidence}% confident
                </span>
                {analysisResult.ocrConfidence && (
                  <span className="text-sm text-muted-foreground">
                    OCR: {analysisResult.ocrConfidence}% accurate
                  </span>
                )}
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">Analyzed Text</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {analysisResult.text.length > 300 
                    ? `${analysisResult.text.substring(0, 300)}...` 
                    : analysisResult.text
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Camera Capture Modal */}
        <CameraCapture
          isOpen={isCameraOpen}
          onClose={() => setIsCameraOpen(false)}
          onCapture={handleCameraCapture}
        />
      </div>
    </DashboardLayout>
  );
}