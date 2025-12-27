import { useState } from 'react';
import { AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { userAPI } from '@/services/api';
import { formatDate } from '@/utils/userHelpers';

export const DeadlineExtensionPanel = ({
    deal,
    onExtensionAdded,
    className
}) => {
    const [extensionDays, setExtensionDays] = useState('3');
    const [extensionReason, setExtensionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddExtension = async () => {
        if (!extensionReason.trim()) {
            toast.error('Please provide a reason for the extension');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await userAPI.addDeadlineExtension(deal.id, {
                days: parseInt(extensionDays),
                reason: extensionReason.trim()
            });

            if (onExtensionAdded) {
                onExtensionAdded(response.data);
            }

            toast.success(`Added ${extensionDays}-day extension`);

            // Reset form
            setExtensionReason('');

        } catch (error) {
            toast.error('Failed to add extension: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getOriginalDeadline = () => {
        return new Date(deal.acceptedDate).toLocaleDateString();
    };

    return (
        <div className={`border border-red-300 bg-red-50 rounded-lg p-4 mb-4 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold text-red-700">⚠️ Deadline Missed</h4>
                </div>
                <Badge variant="destructive">Action Required</Badge>
            </div>

            <div className="space-y-3">
                <div className="text-sm">
                    <p>Original deadline: <strong>{getOriginalDeadline()}</strong> has passed.</p>
                    <p className="mt-1">You must add an extension to continue.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="extension-days">Extension Length</Label>
                        <Select
                            value={extensionDays}
                            onValueChange={setExtensionDays}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger id="extension-days">
                                <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 day</SelectItem>
                                <SelectItem value="3">3 days</SelectItem>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="14">14 days</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Priority After Extension</Label>
                        <div className="text-sm font-medium text-red-600">HIGH PRIORITY</div>
                        <div className="text-xs text-muted-foreground">
                            Auto-set when extending missed deadline
                        </div>
                    </div>
                </div>

                <div className="text-sm">
                    <p>Deadline missed on: <strong>{formatDate(deal.deadline)}</strong></p>
                    <p className="mt-1">
                        {extensionDays > 0 ? (
                            <>Extension: <strong>{extensionDays} days from today</strong></>
                        ) : (
                            <span>Select extension days</span>
                        )}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Selected days will extend from current date
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="extension-reason">
                        Extension Reason <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                        id="extension-reason"
                        value={extensionReason}
                        onChange={(e) => setExtensionReason(e.target.value)}
                        placeholder="Why is the extension needed? (Required)"
                        className="w-full min-h-[80px] rounded-md border border-input bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setExtensionDays('3');
                            setExtensionReason('');
                        }}
                        disabled={isSubmitting}
                        className="flex-1"
                    >
                        Reset
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleAddExtension}
                        disabled={!extensionReason.trim() || isSubmitting}
                        className="flex-1 gap-2"
                    >
                        <Calendar className="h-4 w-4" />
                        {isSubmitting ? 'Adding...' : `Add ${extensionDays} Day Extension`}
                    </Button>
                </div>
            </div>
        </div>
    );
};