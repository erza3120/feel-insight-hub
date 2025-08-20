import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, FileText, Camera, Upload, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Analysis",
    description: "State-of-the-art machine learning algorithms for accurate sentiment detection"
  },
  {
    icon: FileText,
    title: "Multiple Input Methods",
    description: "Analyze text, upload files, or capture images with built-in OCR"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Get instant results with our optimized processing pipeline"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and processed with enterprise-grade security"
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Sashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Unlock the Power of
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Sentiment Analysis
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Analyze text sentiment with advanced AI algorithms. Upload files, capture images, 
              or paste text to get instant insights into emotional tone and meaning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="gradient">
                  Start Analyzing
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for comprehensive sentiment analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-smooth">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Input Methods Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multiple Ways to Analyze</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the input method that works best for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <FileText className="h-16 w-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">Text Input</CardTitle>
              <CardDescription className="text-base">
                Paste or type your text directly for instant analysis
              </CardDescription>
            </Card>
            <Card className="text-center p-8">
              <Upload className="h-16 w-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">File Upload</CardTitle>
              <CardDescription className="text-base">
                Upload documents, PDFs, or text files for batch processing
              </CardDescription>
            </Card>
            <Card className="text-center p-8">
              <Camera className="h-16 w-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">Camera Capture</CardTitle>
              <CardDescription className="text-base">
                Capture images with text for OCR and sentiment analysis
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who trust Sashboard for their sentiment analysis needs
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Sashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}