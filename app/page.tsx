// /app/page.tsx (Corrected to use the /stats endpoint)
'use client'

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { LatestScanDisplay } from "@/components/LatestScanDisplay";
import { ClipboardList, Timer, ShieldAlert, Leaf, ArrowRight } from "lucide-react";
import { animate } from "framer-motion";

const API_BASE_URL = 'https://2emj712evi.execute-api.ap-south-1.amazonaws.com';

// Types
interface HerbStandard {
  herb_name: string;
  avg_pH: number;
  avg_tds: number;
  avg_orp: number;
  quality_threshold: number;
}
interface ScanHistory {
  scan_id: string;
  timestamp: number;
  herb_name: string;
  confidence: number;
  adultaration_alert: boolean;
  sensor_data: string;
}
interface Stats {
  totalTests: number;
  recentTests: number;
  adulterationRate: number;
}

// AnimatedNumber component remains the same
function AnimatedNumber({ to, suffix = "" }: { to: number, suffix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node) {
            const controls = animate(0, to, {
                duration: 1.5,
                ease: "easeOut",
                onUpdate(value) { node.textContent = value.toFixed(0) + suffix; },
            });
            return () => controls.stop();
        }
    }, [to, suffix]);
    return <div ref={ref} className="text-3xl font-bold text-white">0</div>;
}

export default function DashboardPage() {
  const [referenceHerbs, setReferenceHerbs] = useState<HerbStandard[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]); // For the recent scans list
  const [stats, setStats] = useState<Stats | null>(null); // For the KPI cards
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [statsRes, standardsRes, historyRes] = await Promise.all([
          fetch(`${API_BASE_URL}/stats`), // <-- NEW API CALL
          fetch(`${API_BASE_URL}/standards`),
          fetch(`${API_BASE_URL}/history?limit=5`),
        ]);

        if (!statsRes.ok) throw new Error(`Failed to fetch stats: ${statsRes.status}`);
        if (!standardsRes.ok) throw new Error(`Failed to fetch standards: ${standardsRes.status}`);
        if (!historyRes.ok) throw new Error(`Failed to fetch history: ${historyRes.status}`);
        
        const statsData = await statsRes.json();
        const standardsData = await standardsRes.json();
        const historyData = await historyRes.json();
        
        setStats(statsData);
        setReferenceHerbs(standardsData.items || []);
        setScanHistory(historyData.items || []);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Data fetching error:", errorMessage);
        // FIX: Use the 'errorMessage' variable to provide a more specific error
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md">{error}</div>}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-slate-400">Total Tests</CardTitle><ClipboardList className="h-5 w-5 text-blue-400" /></CardHeader>
          <CardContent>{loading || !stats ? <Skeleton className="h-8 w-16 bg-slate-700" /> : <AnimatedNumber to={stats.totalTests} />}</CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 hover:border-yellow-500/50 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-slate-400">Recent Tests (24h)</CardTitle><Timer className="h-5 w-5 text-yellow-400" /></CardHeader>
          <CardContent>{loading || !stats ? <Skeleton className="h-8 w-16 bg-slate-700" /> : <AnimatedNumber to={stats.recentTests} />}</CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 hover:border-red-500/50 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-slate-400">Adulteration Rate</CardTitle><ShieldAlert className="h-5 w-5 text-red-400" /></CardHeader>
          <CardContent>{loading || !stats ? <Skeleton className="h-8 w-16 bg-slate-700" /> : <AnimatedNumber to={stats.adulterationRate} suffix="%" />}</CardContent>
        </Card>
      </div>

      <LatestScanDisplay />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Reference Herb Data Table */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-200">Reference Herb Data</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full bg-slate-800" />
                    <Skeleton className="h-10 w-full bg-slate-800" />
                    <Skeleton className="h-10 w-full bg-slate-800" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 uppercase tracking-wider">Herb Name</TableHead>
                      <TableHead className="text-slate-400 uppercase tracking-wider text-right">pH</TableHead>
                      <TableHead className="text-slate-400 uppercase tracking-wider text-right">TDS (ppm)</TableHead>
                      <TableHead className="text-slate-400 uppercase tracking-wider text-right">ORP (mV)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referenceHerbs.map((herb) => (
                      <TableRow key={herb.herb_name} className="border-slate-800 even:bg-slate-800/50 hover:bg-slate-700/50">
                        <TableCell className="font-medium text-white">{herb.herb_name}</TableCell>
                        <TableCell className="text-right text-slate-300">{herb.avg_pH.toFixed(1)}</TableCell>
                        <TableCell className="text-right text-slate-300">{herb.avg_tds}</TableCell>
                        <TableCell className="text-right text-slate-300">{herb.avg_orp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Scan History */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-200">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-slate-800" />
                  <Skeleton className="h-12 w-full bg-slate-800" />
                  <Skeleton className="h-12 w-full bg-slate-800" />
                </div>
              ) : (
                <div className="space-y-2 divide-y divide-slate-800">
                  {scanHistory.map((scan) => (
                    <div key={scan.scan_id} className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <Leaf className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white">{scan.herb_name}</p>
                          <p className="text-xs text-slate-400">{new Date(scan.timestamp * 1000).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 text-xs font-semibold rounded-full ${scan.adultaration_alert ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                        {(scan.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button asChild variant="outline" className="w-full mt-6 bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 hover:text-white text-slate-300 transition-colors">
                <Link href="/history">
                  View Full History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}