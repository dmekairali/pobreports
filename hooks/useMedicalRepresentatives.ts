// hooks/useMedicalRepresentatives.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase'; // Corrected import path

// Define a type for the Medical Representative
export interface MedicalRepresentative {
    id: string; // Assuming id is a string (UUID from Supabase)
    employee_id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
    territory: string;
    manager_name?: string | null;
    joining_date?: string | null; // ISO date string
    monthly_target?: number | null;
    is_active: boolean;
}

export const useMedicalRepresentatives = () => {
    const [mrList, setMrList] = useState<MedicalRepresentative[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMRs = useCallback(async () => {
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
                setMrList([]); // Clear list on error
            } else {
                setMrList(data || []);
                console.log(`Loaded ${data?.length || 0} active MRs from database`);
            }
        } catch (err) {
            console.error('Unexpected error fetching MRs:', err);
            const message = err instanceof Error ? err.message : 'Failed to connect to database or unexpected error';
            setError(message);
            setMrList([]); // Clear list on error
        } finally {
            setLoading(false);
        }
    }, []); // useCallback will memoize fetchMRs

    useEffect(() => {
        fetchMRs();

        const channel = supabase
            .channel('medical_representatives_changes')
            .on<MedicalRepresentative>(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'medical_representatives'
                },
                (payload) => {
                    console.log('MR data changed:', payload);
                    // Could be more sophisticated here, e.g., updating only the changed record
                    // For now, refetching the whole list is simplest.
                    fetchMRs();
                }
            )
            .subscribe((status, err) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscribed to MR changes');
                } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
                    console.error(`Subscription error/closed: ${status}`, err);
                    // Optionally set an error state or attempt to resubscribe
                    setError(`Supabase subscription issue: ${status}. Real-time updates might be affected.`);
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchMRs]); // fetchMRs is now a stable dependency

    // Helper function to get MR details by name
    const getMRByName = (name: string): MedicalRepresentative | undefined => {
        return mrList.find(mr => mr.name === name);
    };

    // Helper function to get MR details by employee ID
    const getMRByEmployeeId = (employeeId: string): MedicalRepresentative | undefined => {
        return mrList.find(mr => mr.employee_id === employeeId);
    };

    // Get MRs by territory
    const getMRsByTerritory = (territory: string): MedicalRepresentative[] => {
        if (!territory) return mrList;
        return mrList.filter(mr =>
            mr.territory && mr.territory.toLowerCase().includes(territory.toLowerCase())
        );
    };

    // Get MRs by manager
    const getMRsByManager = (managerName: string): MedicalRepresentative[] => {
        if (!managerName) return mrList;
        return mrList.filter(mr =>
            mr.manager_name &&
            mr.manager_name.toLowerCase().includes(managerName.toLowerCase())
        );
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
        totalMRs: mrList.length
    };
};
