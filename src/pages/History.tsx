import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Search } from "lucide-react";

export default function History() {
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
              />
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Clock className="h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">No Analysis History</CardTitle>
            <CardDescription className="text-center max-w-md">
              Your sentiment analysis history will appear here once you start analyzing text.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}