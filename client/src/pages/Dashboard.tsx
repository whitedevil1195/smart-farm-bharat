import { usePredictions } from "@/hooks/use-predictions";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Activity, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data: predictions, isLoading } = usePredictions();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Prediction History</h1>
          <p className="text-muted-foreground">View all your past crop disease analyses.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border shadow-sm text-sm font-medium">
          Total Scans: <span className="text-primary font-bold ml-1">{predictions?.length || 0}</span>
        </div>
      </div>

      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {!predictions || predictions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No predictions yet. Go to Detect page to start.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Plant</TableHead>
                  <TableHead>Disease Detected</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Treatment Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.map((pred) => (
                  <TableRow key={pred.id} className="group hover:bg-secondary/30 transition-colors">
                    <TableCell className="font-medium text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 opacity-50" />
                        {pred.createdAt ? format(new Date(pred.createdAt), 'MMM d, yyyy') : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-primary">{pred.plantName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">{pred.diseaseName}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`
                        ${pred.confidence > 90 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}
                      `}>
                        {pred.confidence}%
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate text-muted-foreground group-hover:text-foreground transition-colors">
                        {pred.treatment}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
