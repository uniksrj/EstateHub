'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/admin/properties/PageHeader';
import OverviewCards from '@/components/admin/properties/OverviewCards';
import MonthlyTrendsChart from '@/components/admin/properties/charts/MonthlyTrendsChart';
import PropertyTypesChart from '@/components/admin/properties/charts/PropertyTypesChart';
import LocationDistributionChart from '@/components/admin/properties/charts/LocationDistributionChart';
import RevenueTrendChart from '@/components/admin/properties/charts/RevenueTrendChart';
import PerformanceMetrics from '@/components/admin/properties/charts/PerformanceMetrics';
import QuickActions from '@/components/admin/properties/QuickActions';
import SalesVsListingsChart from '@/components/admin/properties/charts/SalesVsListingsChart';
import { superAdminAPI } from '@/services/api';
import { Loading } from '@/pages/misc/Loading';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const PropertiesPage = () => {
  const [propertiesData, setPropertiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const navigate = useNavigate();

  const fetchPropertiesData = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const response = await superAdminAPI.getAllProperties();
      if (response?.data == null) throw new Error('Property reporting data was empty');
      setPropertiesData(response.data);
    } catch (error) {
      console.error('Error fetching properties data:', error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPropertiesData(); }, [fetchPropertiesData]);

  const handleExport = () => {
    if (!propertiesData) return;
    const data = new Blob([JSON.stringify(propertiesData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `estatehub-properties-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  if (loading) {
    return (
      <Loading loading={loading} isLineLoader={true} />
    );
  }
  if (loadError) {
    return <div className="min-h-[50vh] bg-background p-6" role="alert">
      <p className="mb-4 text-foreground">Property reporting data could not be loaded.</p>
      <Button onClick={fetchPropertiesData}>Try again</Button>
    </div>;
  }
  if (!propertiesData) {
    return <div className="min-h-[50vh] bg-background p-6" role="status">
      <p className="mb-4 text-muted-foreground">No property reporting data is available.</p>
      <Button onClick={fetchPropertiesData}>Refresh</Button>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <PageHeader
        title="Properties Dashboard"
        description="Comprehensive overview of all property listings and performance metrics"
        onManage={() => navigate('/dashboard/manage-properties')}
        onExport={handleExport}
      />

      <OverviewCards data={propertiesData?.metrics?.overview} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-background">
            More Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyTrendsChart data={propertiesData?.charts?.monthlyTrends} />
            <PropertyTypesChart data={propertiesData?.charts?.propertyTypes} />
          </div>
          <LocationDistributionChart data={propertiesData?.charts?.locationDistribution} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueTrendChart data={propertiesData?.charts?.monthlyTrends} />
            <SalesVsListingsChart data={propertiesData?.charts?.monthlyTrends} />
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceMetrics data={propertiesData?.charts?.performanceMetrics} />
            <QuickActions />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPage;
