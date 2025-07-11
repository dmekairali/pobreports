// File: hooks/useMedicalRepresentatives.ts

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface MedicalRepresentative {
  id: string;
  employee_id: string;
  name: string;
  phone: string;
  email: string;
  territory: string;
  manager_name: string;
  joining_date: string;
  monthly_target: number;
  is_active: boolean;
}

export const useMedicalRepresentatives = () => {
  const [mrList, setMrList] = useState<MedicalRepresentative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMRs = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('medical_representatives')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (fetchError) {
        console.error('Error fetching MRs:', fetchError);
        setError(fetchError.message || 'Database error');
        setMrList([]);
      } else {
        const validData = data || [];
        setMrList(validData);
        console.log(`Loaded ${validData.length} MRs`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Connection failed');
      setMrList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMRs();
  }, []);

  const getUniqueTerritoriesWithCounts = () => {
    if (!Array.isArray(mrList) || mrList.length === 0) {
      return [];
    }

    const territoryMap = new Map<string, number>();
    
    mrList.forEach(mr => {
      if (mr && mr.territory) {
        const territory = mr.territory;
        territoryMap.set(territory, (territoryMap.get(territory) || 0) + 1);
      }
    });
    
    return Array.from(territoryMap.entries()).map(([territory, count]) => ({
      territory,
      count,
      mrs: mrList.filter(mr => mr && mr.territory === territory)
    }));
  };

  return {
    mrList: mrList || [],
    loading: Boolean(loading),
    error: error || null,
    refetch: fetchMRs,
    getUniqueTerritoriesWithCounts,
    totalMRs: Array.isArray(mrList) ? mrList.length : 0,
  };
};
