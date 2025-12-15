"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface QBOConnection {
  id: string;
  company_id: string;
  realm_id: string;
  qbo_company_id: string;
  expires_at: string;
  last_sync_at: string | null;
  company_name?: string;
}

export function useQBOConnection() {
  const [connection, setConnection] = useState<QBOConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchConnection() {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        
        // Fetch the user's QBO connections
        const { data, error: fetchError } = await supabase
          .from("qbo_connections")
          .select(`
            id,
            company_id,
            realm_id,
            qbo_company_id,
            expires_at,
            last_sync_at,
            company:companies(name)
          `)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (fetchError) {
          // No connection found is not an error state
          if (fetchError.code === "PGRST116") {
            setConnection(null);
          } else {
            console.error("Error fetching QBO connection:", fetchError);
            setError(fetchError.message);
          }
        } else if (data) {
          setConnection({
            id: data.id,
            company_id: data.company_id,
            realm_id: data.realm_id,
            qbo_company_id: data.qbo_company_id,
            expires_at: data.expires_at,
            last_sync_at: data.last_sync_at,
            company_name: (data.company as any)?.name || (data.company as any)?.[0]?.name,
          });
        }
      } catch (err) {
        console.error("Error in useQBOConnection:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch connection");
      } finally {
        setLoading(false);
      }
    }

    fetchConnection();
  }, [user]);

  const isConnected = !!connection;
  const companyId = connection?.company_id || null;

  return {
    connection,
    isConnected,
    companyId,
    loading,
    error,
  };
}

