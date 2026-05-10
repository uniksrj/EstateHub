import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { superAdminAPI } from "@/services/api";


export function DialogBox({ user = {}, isNew = "" }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role_id: user.role_id || "",
        is_active: user.is_active || "",
        is_verified: user.is_verified || ""
    });
    console.log("details :", form);

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name?.trim() || !form.email?.trim() || !form.role_id || form.is_active === "") {
            toast.error("Please fill in all required fields before saving.");
            return;
        }

        try {
            setSaving(true);
            if (form.id && form.id !== "") {
                await superAdminAPI.updateUser(form.email, form);
                toast.success("User updated successfully");
            } else {
                await superAdminAPI.createUser(form);
                toast.success("User created successfully");
            }
            setOpen(false);
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save user. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>            
                <DialogTrigger asChild>
                    <button className={!isNew ? "p-1 hover:bg-muted rounded" : "bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"} title={!isNew ? "Edit User" : "Add User"}>
                        {!isNew ? (
                            <Edit className="h-4 w-4 text-gray-600" />
                        ) : (
                            "Add New User"
                        )}

                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[520px]">
                <form onSubmit={handleSave} >
                    <DialogHeader>
                        {!isNew ? (
                            <DialogTitle>Edit User Details</DialogTitle>
                        ) : (
                            <DialogTitle>Add New User</DialogTitle>
                        )}
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email"  value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 self-center items-center">
                            <div className="flex items-center gap-3">
                                <Label htmlFor="role_id" className="min-w-20">User Type</Label>
                                <Select name="role_id" value={String(form.role_id)} onValueChange={(val) => setForm({ ...form, role_id: Number(val) })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">Admin</SelectItem>
                                        <SelectItem value="5">Buyer</SelectItem>
                                        <SelectItem value="6">Seller</SelectItem>
                                        <SelectItem value="7">Investor</SelectItem>
                                        <SelectItem value="8">Rent</SelectItem>
                                        <SelectItem value="3">Agent</SelectItem>
                                        <SelectItem value="4">Broker</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-3">
                                <Label htmlFor="is_active" className="min-w-20">Status</Label>
                                <Select name="is_active" value={String(form.is_active)} onValueChange={(val) => setForm({ ...form, is_active: Number(val) })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">In-active</SelectItem>
                                        <SelectItem value="3">Pending</SelectItem>
                                        <SelectItem value="4">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center self-center">
                            <span className="mr-4">Email Verified</span>
                            <Checkbox
                                id="is_verified"
                                name="is_verified"
                                checked={form.is_verified}
                                onCheckedChange={(checked) => setForm({ ...form, is_verified: checked })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={saving}>{!isNew ? "Update Changes" : "Save changes"}</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>            
        </Dialog >
    )
}
