// /app/history/page.tsx
'use client';

import { useState, useEffect, Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE_URL = 'https://2emj712evi.execute-api.ap-south-1.amazonaws.com';

// Define the data structure for a single scan history item
interface ScanHistory {
  scan_id: string;
  timestamp: number;
  herb_name: string;
  confidence: number;
  adultaration_alert: boolean;
  sensor_data: string; // The data comes in as a JSON string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch ALL history, so we don't add a limit parameter
        const res = await fetch(`${API_BASE_URL}/history`);
        if (!res.ok) {
          throw new Error(`Failed to fetch scan history: ${res.status}`);
        }
        const data = await res.json();
        setHistory(data.items || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleRowClick = (scanId: string) => {
    // Toggle the expanded row: if it's already open, close it. Otherwise, open it.
    setExpandedRow(prev => (prev === scanId ? null : scanId));
  };

  const renderSkeleton = () => (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full bg-slate-800" />
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in-50 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
        Full Scan History
      </h1>
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          {loading && renderSkeleton()}
          {error && <p className="text-center text-red-400">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-transparent">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="text-slate-400 uppercase tracking-wider">Herb Name</TableHead>
                  <TableHead className="text-slate-400 uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-slate-400 uppercase tracking-wider text-right">Confidence</TableHead>
                  <TableHead className="text-slate-400 uppercase tracking-wider text-right">Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((scan) => {
                  const isExpanded = expandedRow === scan.scan_id;
                  const isAdulterated = scan.adultaration_alert;
                  
                  // Parse sensor data safely
                  let sensorDataParsed: { [key: string]: number } = {};
                  try {
                    sensorDataParsed = JSON.parse(scan.sensor_data);
                  } catch {
                    // Handle cases where sensor_data might not be valid JSON
                  }

                  return (
                    <Fragment key={scan.scan_id}>
                      {/* Main Clickable Row */}
                      <TableRow
                        className="border-slate-800 cursor-pointer even:bg-slate-800/50 hover:bg-slate-700/50"
                        onClick={() => handleRowClick(scan.scan_id)}
                      >
                        <TableCell>
                          {isExpanded ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />}
                        </TableCell>
                        <TableCell className="font-medium text-white">{scan.herb_name}</TableCell>
                        <TableCell className="text-slate-300">{new Date(scan.timestamp * 1000).toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold text-white">
                          {(scan.confidence * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold", 
                            isAdulterated ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                          )}>
                            {isAdulterated ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                            {isAdulterated ? "Adulterated" : "Quality Passed"}
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {/* Collapsible Row with Sensor Details */}
                      {isExpanded && (
                        <TableRow className="bg-slate-950 hover:bg-slate-950">
                          <TableCell colSpan={5} className="p-0">
                            <div className="p-6">
                              <h4 className="text-md font-semibold text-white mb-3">Sensor Data Breakdown</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.entries(sensorDataParsed).map(([key, value]) => (
                                  <div key={key} className="bg-slate-800/80 p-3 rounded-md">
                                    <p className="text-xs text-slate-400 uppercase">{key}</p>
                                    <p className="text-lg font-bold text-white">{value.toFixed(2)}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}