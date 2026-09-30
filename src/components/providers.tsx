import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persistQueryClient, restoreQueryClient } from "@/lib/offline";
import { ConnectivitySync } from "@/components/connectivity";

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 8_000,
          gcTime: 24 * 60 * 60 * 1000,
          retry: (count) => (typeof navigator === "undefined" || navigator.onLine) && count < 1,
          refetchOnWindowFocus: false,
          networkMode: "offlineFirst",
        },
        mutations: { networkMode: "offlineFirst" },
      },
    });
    restoreQueryClient(qc);
    return qc;
  });

  useEffect(() => persistQueryClient(client), [client]);

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <ConnectivitySync />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
