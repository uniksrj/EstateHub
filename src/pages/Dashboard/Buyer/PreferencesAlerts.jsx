import { useState, useEffect } from 'react';
import { Bell, Filter, Save, Sliders, MapPin, Home, DollarSign, Square, Plus } from 'lucide-react';
import { userAPI } from '@/services/api';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { demoAlerts, demoPreferences } from '@/data/demoData';
import { PreferencesList } from '@/components/common/preference/PreferencesList';
import { Loading } from '@/pages/misc/Loading';

const PreferencesAlerts = () => {
  const [preferences, setPreferences] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePreference, setActivePreference] = useState(null);
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const fetchAllUserData = async () => {
    setIsLoading(true);
    try {
      const [preferencesResponse, alertsResponse] = await Promise.all([
        userAPI.buyer_preferences().catch(error => {
          console.error('Preferences fetch failed:', error);
          return { data: demoPreferences };
        }),
        userAPI.get_alerts().catch(error => {
          console.error('Alerts fetch failed:', error);
          return { data: demoAlerts };
        })
      ]);

      const preferences = preferencesResponse.data || preferencesResponse || [];
      const alerts = alertsResponse.data || alertsResponse || demoAlerts;

      setPreferences(preferences);
      setAlerts(alerts);

      if (preferences.length > 0) {
        setActivePreference(preferences[0]);
        reset(preferences[0]);
      } else {
        createDefaultPreference();
      }
    } catch (error) {
      console.error('Error in fetchAllUserData:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultPreference = async () => {
    try {
      const defaultPref = {
        name: "My Search Criteria",
        min_price: 300000,
        max_price: 500000,
        min_bedrooms: 2,
        min_bathrooms: 2,
        property_type: "condo",
        location: "Downtown",
        min_sqft: 800,
        max_sqft: 1500,
        amenities: ["parking", "gym"],
        alerts_enabled: true,
        alert_frequency: "instant",
        is_default: true
      };

      const newPreference = await userAPI.create_preference(defaultPref);
      setPreferences([newPreference]);
      setActivePreference(newPreference);
      reset(newPreference);
    } catch (error) {
      console.error('Error creating default preference:', error);
    }
  };

  const createNewPreference = async () => {
    const name = prompt('Enter name for new search criteria:');
    if (!name) return;

    try {
      const newPrefData = {
        name: name,
        min_price: null,
        max_price: null,
        min_bedrooms: null,
        min_bathrooms: null,
        property_type: null,
        location: null,
        min_sqft: null,
        max_sqft: null,
        amenities: [],
        alerts_enabled: true,
        alert_frequency: "instant"
      };

      const newPreference = await userAPI.create_preference(newPrefData);
      console.log('New Preference Created:', newPreference);
      setPreferences(prev => [...prev, newPreference.data]);
      setActivePreference(newPreference.data);
      reset(newPreference.data);

      await handleAlertForPreference(newPreference.data);
      toast.success('New search criteria created!');
    } catch (error) {
      console.error('Error creating preference:', error);
      toast.error('Failed to create new search criteria');
    }
  };

  const deletePreference = async (preferenceId) => {
    if (!confirm('Are you sure you want to delete this search criteria?')) return;

    try {
      await userAPI.delete_preference(preferenceId);

      // Update local state
      const updatedPreferences = preferences.filter(p => p.id !== preferenceId);
      setPreferences(updatedPreferences);

      // Set new active preference
      if (updatedPreferences.length > 0) {
        setActivePreference(updatedPreferences[0]);
        reset(updatedPreferences[0]);
      } else {
        createDefaultPreference();
      }

      toast.success('Search criteria deleted');
    } catch (error) {
      console.error('Error deleting preference:', error);
      toast.error('Failed to delete search criteria');
    }
  };

  const onSubmitPreferences = async (data) => {
    console.log("data from use Form :", data);

    if (!activePreference) return;

    setIsLoading(true);
    try {
      const response  = await userAPI.update_preferences(activePreference.id, data);
      const updatedPreference = response?.data || response;

      // Update in local state
      setPreferences(prev =>
        prev.map(p => p.id === updatedPreference.id ? updatedPreference : p)
      );
      setActivePreference(updatedPreference);
      await handleAlertForPreference(updatedPreference);
      toast.success('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAlert = async (alertId, isActive) => {
    try {
      const resToggle = await userAPI.toggle_alert(alertId);
      const updatedAlert = resToggle.data || resToggle;
      setAlerts(prev => prev.map(alert =>
        alert.id === alertId ? updatedAlert : alert
      ));
      toast.success(`Alert ${isActive ? 'enabled' : 'paused'}`);
    } catch (error) {
      console.error('Error updating alert:', error);
      toast.error('Failed to update alert');
    }
  };

  const handleAlertForPreference = async (preference) => {
    try {
      // Check if alerts are enabled for this preference
      if (!preference.alerts_enabled) {
        // If alerts are disabled, find and disable existing alert
        const existingAlert = alerts.find(alert => alert.preference_id === preference.id);
        if (existingAlert) {
          await userAPI.toggle_alert(existingAlert.id, false);
          setAlerts(prev => prev.map(alert =>
            alert.id === existingAlert.id ? { ...alert, is_active: false } : alert
          ));
        }
        return;
      }

      // Check if alert already exists for this preference
      const existingAlert = alerts.find(alert => alert.preference_id === preference.id);

      if (existingAlert) {
        // UPDATE existing alert
        const alertUpdateData = {
          name: `${preference.name} Alert`,
          criteria: {
            min_price: preference.min_price,
            max_price: preference.max_price,
            min_bedrooms: preference.min_bedrooms,
            min_bathrooms: preference.min_bathrooms,
            property_type: preference.property_type,
            location: preference.location,
            min_sqft: preference.min_sqft,
            max_sqft: preference.max_sqft
          },
          frequency: preference.alert_frequency,
          is_active: true
        };

        const response = await userAPI.update_alert(existingAlert.id, alertUpdateData);
        const updatedAlert = response.data || response;

        setAlerts(prev => prev.map(alert =>
          alert.id === existingAlert.id ? updatedAlert : alert
        ));

        console.log('Alert updated:', updatedAlert);
      } else {
        // CREATE new alert
        const alertData = {
          name: `${preference.name} Alert`,
          preference_id: preference.id,
          criteria: {
            min_price: preference.min_price,
            max_price: preference.max_price,
            min_bedrooms: preference.min_bedrooms,
            min_bathrooms: preference.min_bathrooms,
            property_type: preference.property_type,
            location: preference.location,
            min_sqft: preference.min_sqft,
            max_sqft: preference.max_sqft
          },
          is_active: true,
        };

        const response = await userAPI.create_alert(alertData);
        const newAlert = response.data || response;

        setAlerts(prev => [newAlert, ...prev]);
        console.log('New alert created:', newAlert);
      }
    } catch (error) {
      console.error('Error handling alert for preference:', error);
      toast.error('Preferences saved, but failed to update alerts');
    }
  };

  // Watch form values for real-time validation
  const watchMinPrice = watch('min_price');
  const watchMaxPrice = watch('max_price');
  const watchMinSqft = watch('min_sqft');
  const watchMaxSqft = watch('max_sqft');
  const watchAlertsEnabled = watch('alerts_enabled');

  return (
    <div className="min-h-screen bg-background p-6">
      <Toaster position='top-right' />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Criteria & Alerts</h1>
          <p className="text-muted-foreground mt-2">Manage your property search preferences and alerts</p>
        </div>
        <button
          onClick={createNewPreference}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Search
        </button>
      </div>

      {/* Loading State */}
      {isLoading && !activePreference && (
        <Loading loading={isLoading} />
      )}

      {/* Preferences List */}
      <PreferencesList preferences={preferences} activePreference={activePreference} setActivePreference={setActivePreference} reset={reset} deletePreference={deletePreference} />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Criteria Form */}
        {activePreference && (
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">{activePreference.name}</h2>
                <p className="text-sm text-muted-foreground">Set your property preferences</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitPreferences)} className="space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <DollarSign className="w-4 h-4" />
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      {...register("min_price", {
                        min: { value: 0, message: "Must be positive" },
                        max: { value: 10000000, message: "Price too high" }
                      })}
                      type="number"
                      placeholder="Min Price"
                      className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.min_price && (
                      <p className="text-destructive text-xs mt-1">{errors.min_price.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("max_price", {
                        min: { value: 0, message: "Must be positive" },
                        validate: value =>
                          !watchMinPrice ||
                          Number(value) > Number(watchMinPrice) ||
                          "Must be greater than min price"
                      })}
                      type="number"
                      placeholder="Max Price"
                      className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.max_price && (
                      <p className="text-destructive text-xs mt-1">{errors.max_price.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                    <Home className="w-4 h-4" />
                    Bedrooms
                  </label>
                  <select
                    {...register("min_bedrooms")}
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                    <Home className="w-4 h-4" />
                    Bathrooms
                  </label>
                  <select
                    {...register("min_bathrooms")}
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>

              {/* Property Type & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                    <Sliders className="w-4 h-4" />
                    Property Type
                  </label>
                  <select
                    {...register("property_type")}
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any Type</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    {...register("location")}
                    type="text"
                    placeholder="City, Neighborhood, or PIN"
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Square Footage */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Square className="w-4 h-4" />
                  Square Footage
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    {...register("min_sqft", {
                      min: { value: 0, message: "Must be positive" }
                    })}
                    type="number"
                    placeholder="Min SQFT"
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    {...register("max_sqft", {
                      min: { value: 0, message: "Must be positive" },
                      validate: value =>
                        !watchMinSqft ||
                        Number(value) > Number(watchMinSqft) ||
                        "Must be greater than min SQFT"
                    })}
                    type="number"
                    placeholder="Max SQFT"
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {(errors.min_sqft || errors.max_sqft) && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.min_sqft?.message || errors.max_sqft?.message}
                  </p>
                )}
              </div>

              {/* Alert Settings */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium text-card-foreground">Alert Settings</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Enable Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified about new properties</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      {...register("alerts_enabled")}
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary-foreground after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {watchAlertsEnabled && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-card-foreground">Alert Frequency</label>
                    <select
                      {...register("alert_frequency")}
                      className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="instant">Instant</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Digest</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save Criteria & Alerts'}
              </button>
            </form>
          </div>
        )}

        {/* Right Column - Active Alerts */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Active Alerts</h2>
                <p className="text-sm text-muted-foreground">Manage your property alerts</p>
              </div>
            </div>
            {/* <button
              onClick={createNewAlert}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              New Alert
            </button> */}
          </div>

          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No alerts yet</h3>
                <p className="text-muted-foreground mb-4">Create your first alert to get notified about new properties</p>
                {/* <button
                  onClick={createNewAlert}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Create Alert
                </button> */}
              </div>
            ) : (
              console.log('Rendering alerts:', alerts),
              alerts.map(alert => (
                <div key={alert.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">{alert.name}</h3>
                      {/* <p className="text-sm text-muted-foreground">{alert.criteria}</p> */}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.is_active
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground'
                      }`}>
                      {alert.is_active ? 'Active' : 'Paused'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {alert.properties_count} new properties
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAlert(alert.id, !alert.is_active)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${alert.is_active
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                      >
                        {alert.is_active ? 'Pause' : 'Enable'}
                      </button>
                      <button className="text-muted-foreground hover:text-destructive transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Alert Statistics */}
          {alerts.length > 0 && (
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-3">Alert Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Alerts</p>
                  <p className="font-semibold text-card-foreground">{alerts.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Active Alerts</p>
                  <p className="font-semibold text-card-foreground">
                    {alerts.filter(a => a.is_active).length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferencesAlerts;