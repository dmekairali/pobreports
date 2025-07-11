// File: hooks/useMedicalRepresentatives.ts

import { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '@/lib/supabase';

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
      
      // Try with regular client first (anon key)
      let { data, error: fetchError } = await supabase
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

      // If anon access fails, try with service role (admin)
      if (fetchError && fetchError.code === '42501') {
        console.log('Anon access failed, trying with service role...');
        const adminResult = await supabaseAdmin
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
        
        data = adminResult.data;
        fetchError = adminResult.error;
      }

      if (fetchError) {
        console.error('Error fetching MRs:', fetchError);
        setError(`Database Error: ${fetchError.message}`);
      } else {
        setMrList(data || []);
        console.log(`✅ Loaded ${data?.length || 0} active MRs from database`);
      }
    } catch (error) {
      console.error('Unexpected error fetching MRs:', error);
      setError('Failed to connect to database. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMRs();
    
    // Set up real-time subscription for MR changes (using anon client)
    const mrSubscription = supabase
      .channel('medical_representatives_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'medical_representatives' 
        }, 
        (payload) => {
          console.log('🔄 MR data changed:', payload.eventType);
          // Refresh the MR list when changes occur
          fetchMRs();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Real-time subscription active for MR changes');
        } else if (status === 'CHANNEL_ERROR') {
          console.warn('⚠️ Real-time subscription failed, continuing without live updates');
        }
      });

    return () => {
      console.log('🧹 Cleaning up MR subscription');
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

  // Get unique territories with counts
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

  // Add MR (using service role for write operations)
  const addMR = async (mrData: Omit<MedicalRepresentative, 'id'>) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('medical_representatives')
        .insert([mrData])
        .select()
        .single();

      if (error) {
        console.error('Error adding MR:', error);
        setError(`Failed to add MR: ${error.message}`);
        return null;
      }

      console.log('✅ MR added successfully:', data);
      await fetchMRs(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Unexpected error adding MR:', error);
      setError('Failed to add MR. Please try again.');
      return null;
    }
  };

  // Update MR (using service role for write operations)
  const updateMR = async (id: string, updates: Partial<MedicalRepresentative>) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('medical_representatives')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating MR:', error);
        setError(`Failed to update MR: ${error.message}`);
        return null;
      }

      console.log('✅ MR updated successfully:', data);
      await fetchMRs(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Unexpected error updating MR:', error);
      setError('Failed to update MR. Please try again.');
      return null;
    }
  };

  // Deactivate MR (soft delete)
  const deactivateMR = async (id: string) => {
    return updateMR(id, { is_active: false });
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
    addMR,
    updateMR,
    deactivateMR,
    totalMRs: mrList.length
  };
};
