import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Search, FileText, Upload, Camera, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Analysis {
  id: string;
  text: string;
  sentiment: string;
  confidence: number;
  summary: string;
  source: string;
  ocr_confidence: number | null;
  created_at: string;
}

export default function History() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        fetchAnalyses();
      }
    };
    checkAuthAndFetch();
  }, [navigate]);

  const fetchAnalyses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('sentiment_analyses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error loading history",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setAnalyses(data || []);
      setFilteredAnalyses(data || []);
    }
    setIsLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredAnalyses(analyses);
    } else {
      const filtered = analyses.filter(
        (analysis) =>
          analysis.text.toLowerCase().includes(query.toLowerCase()) ||
          analysis.summary.toLowerCase().includes(query.toLowerCase()) ||
          analysis.sentiment.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAnalyses(filtered);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('sentiment_analyses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting analysis",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Analysis deleted",
        description: "The analysis has been removed from your history.",
      });
      fetchAnalyses();
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
          <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
          <p className="text-muted-foreground text-lg">
            View and search through your past sentiment analyses
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search history..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <p className="text-muted-foreground">Loading history...</p>
            </CardContent>
          </Card>
        ) : filteredAnalyses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Clock className="h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="text-xl mb-2">
                {searchQuery ? "No results found" : "No Analysis History"}
              </CardTitle>
              <CardDescription className="text-center max-w-md">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Your sentiment analysis history will appear here once you start analyzing text."}
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <Card key={analysis.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getSourceIcon(analysis.source)}
                          {analysis.source.charAt(0).toUpperCase() + analysis.source.slice(1)}
                        </Badge>
                        <Badge className={getSentimentColor(analysis.sentiment)}>
                          {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {analysis.confidence}% confident
                        </span>
                        {analysis.ocr_confidence && (
                          <span className="text-sm text-muted-foreground">
                            OCR: {analysis.ocr_confidence}%
                          </span>
                        )}
                      </div>
                      <CardDescription>
                        {format(new Date(analysis.created_at), 'PPpp')}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(analysis.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Summary</h4>
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Analyzed Text</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {analysis.text.length > 200
                        ? `${analysis.text.substring(0, 200)}...`
                        : analysis.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
