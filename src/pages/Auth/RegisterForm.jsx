"use client"

import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../../components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const RegisterForm = () => {
    const formRef = useRef();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [selectedRole, setSelectedRole] = useState("");

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        // Password confirmation check
        if (data.password !== data.password_confirmation) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Terms agreement check
        if (!data.terms) {
            setError("You must agree to the terms and conditions");
            setLoading(false);
            return;
        }
        if (data.newsletter === 'on') {
            data.newsletter = true;
        } else {
            data.newsletter = false;
        }

        if (data.terms === 'on') {
            data.terms = true;
        } else {
            data.terms = false;
        }

        try {
            const result = await register(data);
            if (result.success) {
                navigate("/");
            } else {
                toast({
                    title: "Registration Notice",
                    description: result.error || "Registration failed. Please try again.",
                    variant: "destructive",
                })
                setError(result.error);
                navigate("/auth/register");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
            navigate("/auth/register");
        } finally {
            setLoading(false);
            navigate("/auth/register");
        }
    };

    const handleRoleChange = (val) => {
        setSelectedRole(val);
    }

    const showBuyerFields = ["buyer", "investor", "renter"].includes(selectedRole);

    const showSellerFields = ['seller'].includes(selectedRole);

    const showAgentFields = ['agent', 'broker'].includes(selectedRole);

    return (
        <div className="h-full flex flex-col p-1 sm:p-2 min-w-0">
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Create Account</h2>
                <p className="text-muted-foreground">Join EstateHub today</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        // value={formData.name}
                        // onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        // value={formData.email}
                        // onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        // value={formData.phone}
                        // onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                {/* New Fields Added Below */}

                <div className="space-y-2">
                    <Label htmlFor="user_type">I am a *</Label>
                    <Select
                        name="user_type"
                        // value={formData.user_type}
                        onValueChange={handleRoleChange}
                        disabled={loading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="buyer">Buyer/Looking to Buy</SelectItem>
                            <SelectItem value="seller">Seller/Looking to Sell</SelectItem>
                            <SelectItem value="investor">Real Estate Investor</SelectItem>
                            <SelectItem value="renter">Looking to Rent</SelectItem>
                            <SelectItem value="agent">Real Estate Agent</SelectItem>
                            <SelectItem value="broker">Broker</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {showBuyerFields && (
                    <div className="space-y-3">
                        <hr />
                        <h3 className="font-semibold text-lg">
                            {selectedRole === 'investor' ? 'Investment Preferences' :
                                selectedRole === 'renter' ? 'Rental Preferences' : 'Buying Preferences'}
                        </h3>
                        <div className="space-y-2">
                            <Label htmlFor="preferred_location">Preferred Location</Label>
                            <Input
                                id="preferred_location"
                                name="preferred_location"
                                type="text"
                                placeholder="City, State, or Neighborhood"
                                // value={formData.preferred_location}
                                // onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="min_budget"> {selectedRole === 'renter' ? 'Minimum Rent ($)' : 'Minimum Budget ($)'}</Label>
                                <Input
                                    id="min_budget"
                                    name="min_budget"
                                    type="number"
                                    placeholder="0"
                                    // value={formData.min_budget}
                                    // onChange={handleChange}
                                    disabled={loading}
                                    min="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max_budget">{selectedRole === 'renter' ? 'Maximum Rent ($)' : 'Maximum Budget ($)'}</Label>
                                <Input
                                    id="max_budget"
                                    name="max_budget"
                                    type="number"
                                    placeholder="0"
                                    // value={formData.min_budget}
                                    // onChange={handleChange}
                                    disabled={loading}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="property_type">{selectedRole === 'renter' ? 'Looking For' : 'Interested In'}</Label>
                            <Select
                                name="property_type"
                                // value={formData.property_type}
                                // onValueChange={(value) => handleChange({ target: { name: 'property_type', value } })}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="house">Single Family Home</SelectItem>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="condo">Condo</SelectItem>
                                    <SelectItem value="townhouse">Townhouse</SelectItem>
                                    <SelectItem value="villa">Villa</SelectItem>
                                    {selectedRole !== 'renter' && (
                                        <SelectItem value="commercial">Commercial Property</SelectItem>
                                    )}
                                    <SelectItem value="land">Land</SelectItem>
                                    <SelectItem value="any">Any Type</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="space-y-2 ">
                                <Label htmlFor="bedrooms">Bedrooms</Label>
                                <Select
                                    name="bedrooms"
                                    // value={formData.bedrooms}
                                    // onValueChange={(value) => handleChange({ target: { name: 'bedrooms', value } })}
                                    disabled={loading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1+</SelectItem>
                                        <SelectItem value="2">2+</SelectItem>
                                        <SelectItem value="3">3+</SelectItem>
                                        <SelectItem value="4">4+</SelectItem>
                                        <SelectItem value="5">5+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bathrooms">Bathrooms</Label>
                                <Select
                                    name="bathrooms"
                                    // value={formData.bathrooms}
                                    // onValueChange={(value) => handleChange({ target: { name: 'bathrooms', value } })}
                                    disabled={loading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1+</SelectItem>
                                        <SelectItem value="2">2+</SelectItem>
                                        <SelectItem value="3">3+</SelectItem>
                                        <SelectItem value="4">4+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="move_in_timeline">{selectedRole === 'renter' ? 'Move-in Date' : 'Timeline'}</Label>
                                <Select
                                    name="move_in_timeline"
                                    // value={formData.move_in_timeline}
                                    // onValueChange={(value) => handleChange({ target: { name: 'move_in_timeline', value } })}
                                    disabled={loading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select timeline" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="immediately">Immediately</SelectItem>
                                        <SelectItem value="1_month">Within 1 Month</SelectItem>
                                        <SelectItem value="3_months">Within 3 Months</SelectItem>
                                        <SelectItem value="6_months">Within 6 Months</SelectItem>
                                        <SelectItem value="1_year">Within 1 Year</SelectItem>
                                        <SelectItem value="flexible">Flexible/Just Browsing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <hr />
                    </div>
                )}
                {/* Seller Specific Fields */}
                {showSellerFields && (
                    <div className="space-y-3 ">
                        <hr />
                        <h3 className="font-semibold text-lg">Seller Information</h3>
                        <div className="space-y-2">
                            <Label htmlFor="property_address">Property Address (if ready to list)</Label>
                            <Input
                                id="property_address"
                                name="property_address"
                                type="text"
                                placeholder="Enter property address"
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="selling_timeline">When do you plan to sell?</Label>
                            <Select name="selling_timeline" disabled={loading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="immediately">Immediately</SelectItem>
                                    <SelectItem value="1_month">Within 1 Month</SelectItem>
                                    <SelectItem value="3_months">Within 3 Months</SelectItem>
                                    <SelectItem value="6_months">Within 6 Months</SelectItem>
                                    <SelectItem value="just_researching">Just Researching</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <hr />
                    </div>
                )}

                {/* Agent/Broker Specific Fields */}
                {showAgentFields && (
                    <div className="space-y-3">
                        <hr />
                        <h3 className="font-semibold text-lg">Professional Information</h3>

                        <div className="space-y-2">
                            <Label htmlFor="license_number">Real Estate License Number</Label>
                            <Input
                                id="license_number"
                                name="license_number"
                                type="text"
                                placeholder="Enter your license number"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brokerage">Brokerage/Company</Label>
                            <Input
                                id="brokerage"
                                name="brokerage"
                                type="text"
                                placeholder="Enter your brokerage name"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="years_experience">Years of Experience</Label>
                            <Select name="years_experience" disabled={loading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-2">0-2 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="6-10">6-10 years</SelectItem>
                                    <SelectItem value="10+">10+ years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <hr />
                    </div>
                )}

                {/* Newsletter & Terms - Always Show */}
                <div className="space-y-2">
                    <Label htmlFor="newsletter">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="newsletter"
                                name="newsletter"
                                // checked={formData.newsletter}
                                // onCheckedChange={(checked) => handleChange({ target: { name: 'newsletter', value: checked } })}
                                disabled={loading}
                            />
                            <span>Send me property recommendations and market updates</span>
                        </div>
                    </Label>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="terms">
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="terms"
                                name="terms"
                                // checked={formData.terms}
                                // onCheckedChange={(checked) => handleChange({ target: { name: 'terms', value: checked } })}
                                required
                                disabled={loading}
                            />
                            <span className="text-sm leading-relaxed">
                                I agree to the{' '}
                                <Link to="/terms" className="text-primary underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-primary underline">
                                    Privacy Policy
                                </Link>
                                *
                            </span>
                        </div>
                    </Label>
                </div>

                {/* Original Password Fields */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            // value={formData.password}
                            // onChange={handleChange}
                            required
                            disabled={loading}
                            minLength={8}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Confirm Password *</Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            // value={formData.password_confirmation}
                            // onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={loading}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
