'use client';

import { useState, useEffect } from 'react';
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

const PropertiesPage = () => {
  const [propertiesData, setPropertiesData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertiesData = async () => {
      setLoading(true);
      try {
        const response = await superAdminAPI.getAllProperties();
        setPropertiesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertiesData();
  }, []);

  console.log(propertiesData);
  const handleFilter = () => {
    console.log('Open filter modal');
  };

  const handleExport = () => {
    console.log('Export data');
  };

  if (loading) {
    return (
      <Loading loading={loading} isLineLoader={true} />
    );
  }
  if (!propertiesData) {
    return <Loading loading={true} isLineLoader={true} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <PageHeader
        title="Properties Dashboard"
        description="Comprehensive overview of all property listings and performance metrics"
        onFilter={handleFilter}
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