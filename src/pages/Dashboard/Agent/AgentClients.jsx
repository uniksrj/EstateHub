
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { userAPI } from '@/services/api';
import Loading from '@/pages/SearchPage/Loading';

const AgentClients = () => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDeadDeal();
    }, []);

    const fetchDeadDeal = async () => {
        setLoading(true)
        try {
            const response = await userAPI.get_agent_buyers();
            setClients(response?.data || []);
        } catch (error) {
            console.error("Error:", error)
            setClients([])
        } finally {
            setLoading(false)
        }
    }

    console.log("this is client data",clients);
    
    const filteredClients = clients?.buyers?.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <Loading loading={loading} isLineLoader={true} />
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">My Clients</CardTitle>
                        <CardDescription>Buyers and leads you’re currently managing</CardDescription>
                    </div>
                    <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <Input
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-4 w-1/3"
                    />

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Phone</th>
                                    <th className="px-4 py-2 text-left">Role</th>
                                    <th className="px-4 py-2 text-left">Inquiries</th>
                                    <th className="px-4 py-2 text-left">Deals</th>
                                    <th className="px-4 py-2 text-left">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients?.map(client => (
                                    <tr key={client.id} className="border-b hover:bg-muted/20">
                                        <td className="px-4 py-2 font-medium">{client.name}</td>
                                        <td className="px-4 py-2">{client.email}</td>
                                        <td className="px-4 py-2">{client.phone || '-'}</td>
                                        <td className="px-4 py-2">
                                            <Badge variant={client.role_id === 5 ? 'default' : 'secondary'}>
                                                {client.role_id === 5 ? "Buyer" : "Lead"}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2">{client.inquiries_count}</td>
                                        <td className="px-4 py-2">{client.deals_count}</td>
                                        <td className="px-4 py-2">{new Date(client.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredClients?.length === 0 && (
                            <p className="text-center text-muted-foreground py-6">No clients found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AgentClients;
