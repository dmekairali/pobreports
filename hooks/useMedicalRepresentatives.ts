import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
        .select(`
          id,
          employee_id,
          name,
          phone,
          email,
          territory,
          manager_name,
          joining_date,
          monthly_target,
          is_active
        `)
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (fetchError) {
        console.error('Error fetching MRs:', fetchError);
        setError(fetchError.message);
      } else {
        setMrList(data || []);
        console.log(`Loaded ${data?.length || 0} active MRs from database`);
      }
    } catch (error) {
      console.error('Unexpected error fetching MRs:', error);
      setError('Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMRs();
    
    // Set up real-time subscription for MR changes
    const mrSubscription = supabase
      .channel('medical_representatives_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'medical_representatives' 
        }, 
        (payload) => {
          console.log('MR data changed:', payload);
          // Refresh the MR list when changes occur
          fetchMRs();
        }
      )
      .subscribe();

    return () => {
      mrSubscription.unsubscribe();
    };
  }, []);

  // Helper function to get MR details by name
  const getMRByName = (name: string) => {
    return mrList.find(mr => mr.name === name);
  };

  // Helper function to get MR details by employee ID
  const getMRByEmployeeId = (employeeId: string) => {
    return mrList.find(mr => mr.employee_id === employeeId);
  };

  // Get MRs by territory
  const getMRsByTerritory = (territory: string) => {
    return mrList.filter(mr => 
      mr.territory.toLowerCase().includes(territory.toLowerCase())
    );
  };

  // Get MRs by manager
  const getMRsByManager = (managerName: string) => {
    return mrList.filter(mr => 
      mr.manager_name && 
      mr.manager_name.toLowerCase().includes(managerName.toLowerCase())
    );
  };

  // Get unique territories
  const getUniqueTerritoriesWithCounts = () => {
    const territoryMap = new Map<string, number>();
    mrList.forEach(mr => {
      const territory = mr.territory;
      territoryMap.set(territory, (territoryMap.get(territory) || 0) + 1);
    });
    return Array.from(territoryMap.entries()).map(([territory, count]) => ({
      territory,
      count,
      mrs: mrList.filter(mr => mr.territory === territory)
    }));
  };

  // Get unique managers
  const getUniqueManagers = () => {
    const managers = [...new Set(mrList.map(mr => mr.manager_name).filter(Boolean))];
    return managers.sort();
  };

  return {
    mrList,
    loading,
    error,
    refetch: fetchMRs,
    getMRByName,
    getMRByEmployeeId,
    getMRsByTerritory,
    getMRsByManager,
    getUniqueTerritoriesWithCounts,
    getUniqueManagers,
    totalMRs: mrList.length
  };
};
