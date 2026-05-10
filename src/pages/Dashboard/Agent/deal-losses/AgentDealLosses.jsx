// pages/agent/AgentDealLosses.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast, Toaster } from 'sonner';
import { propertiesAPI, userAPI } from '@/services/api';

const AgentDealLosses = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [dealLosses, setDealLosses] = useState([]);
    const [buyers, setBuyers] = useState('');

    useEffect(() => {
        fetchAgentProperties();
        fetchDeadDeal();
    }, []);

    const fetchAgentProperties = async () => {
        setLoading(true)
        try {
            const response = await propertiesAPI.getPropertyListByUser();
            setProperties(response?.data?.data || []);
        } catch (error) {
            console.error("Error:", error)
            setProperties([])
        } finally {
            setLoading(false)
        }
    }

    const fetchDeadDeal = async () => {
        setLoading(true)
        try {
            const response = await userAPI.get_deal_losses();
            console.log(response);

            setDealLosses(response?.data || []);
        } catch (error) {
            console.error("Error:", error)
            setDealLosses([])
        } finally {
            setLoading(false)
        }
    }
    console.log("This is property details", dealLosses);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userAPI.store_agent_deal_loss({
                property_id: selectedProperty,
                buyer_id: buyers,
                reason,
                notes,
            });
            toast.success('Deal loss recorded successfully');
            setSelectedProperty('');
            setReason('');
            setNotes('');
        } catch (err) {
            toast.error('Failed to save deal loss', { description: err.response?.data?.message || err.message });
        }
    };

    return (
        <Card>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Record Lost Deal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium">Select Property</Label>
                        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose property" />
                            </SelectTrigger>
                            <SelectContent>
                                {properties?.data?.map((p) => (
                                    <SelectItem key={p.id} value={String(p.id)}>
                                        {p.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium ">Select Buyer</Label>
                        <Select value={buyers} onValueChange={setBuyers}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Buyer" />
                            </SelectTrigger>
                            <SelectContent>
                                {dealLosses?.agent_buyer?.map((p) => (
                                    <SelectItem key={p.id} value={String(p.id)}>
                                        {p.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Label className="text-sm font-medium">Loss Reason</Label>
                        <Select value={reason} onValueChange={setReason}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price_disagreement">Price Disagreement</SelectItem>
                                <SelectItem value="financing_issues">Financing Issues</SelectItem>
                                <SelectItem value="property_condition">Property Condition</SelectItem>
                                <SelectItem value="timing_issues">Timing Issues</SelectItem>
                                <SelectItem value="competitive_offers">Competitive Offers</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Additional Notes</Label>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add optional comments..."
                            className="min-h-[100px] resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AgentDealLosses;
