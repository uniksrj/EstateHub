import { AlertCircle, Building, Calculator, Calendar, CheckCircle, CheckCircle2, ClipboardCheck, Clock, DollarSign, FileText, Mail, PenTool, Shield, Upload } from "lucide-react";

// demoData/sellerProperties.js
export const demoProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views",
    price: 450000,
    property_type: "apartment",
    status: "for_sale",
    city: "New York",
    state: "NY",
    bedrooms: 2,
    bathrooms: 2,
    sq_ft: 1200,
    view_count: 156,
    inquiries_count: 12,
    created_at: "2024-01-15T10:30:00Z",
    images: [
      "/apartment-1.jpg",
      "/apartment-2.jpg"
    ],
    features: ["City View", "Modern Kitchen", "Balcony", "Parking"],
    recent_views: 5
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    description: "Stunning 4-bedroom villa with private beach access and panoramic ocean views",
    price: 1250000,
    property_type: "villa",
    status: "under_contract",
    city: "Miami",
    state: "FL",
    bedrooms: 4,
    bathrooms: 3.5,
    sq_ft: 3200,
    view_count: 289,
    inquiries_count: 24,
    created_at: "2024-01-10T14:20:00Z",
    images: [
      "/villa-1.jpg",
      "/villa-2.jpg"
    ],
    features: ["Ocean View", "Private Pool", "Beach Access", "Smart Home"],
    recent_views: 2
  },
  {
    id: 3,
    title: "Cozy Garden Condo",
    description: "Charming 1-bedroom condo with private garden in quiet neighborhood",
    price: 275000,
    property_type: "condo",
    status: "for_sale",
    city: "Portland",
    state: "OR",
    bedrooms: 1,
    bathrooms: 1,
    sq_ft: 850,
    view_count: 89,
    inquiries_count: 8,
    created_at: "2024-01-08T09:15:00Z",
    images: [
      "/condo-1.jpg"
    ],
    features: ["Garden", "Pet Friendly", "Updated Kitchen", "Storage"],
    recent_views: 8
  },
  {
    id: 4,
    title: "Suburban Family Home",
    description: "Spacious 5-bedroom family home in excellent school district",
    price: 750000,
    property_type: "house",
    status: "sold",
    city: "Austin",
    state: "TX",
    bedrooms: 5,
    bathrooms: 3,
    sq_ft: 2800,
    view_count: 342,
    inquiries_count: 31,
    created_at: "2024-01-05T11:45:00Z",
    sold_at: "2024-01-25T16:30:00Z",
    images: [
      "/house-1.jpg",
      "/house-2.jpg"
    ],
    features: ["Large Yard", "Garage", "Updated Bathrooms", "Open Floor Plan"],
    recent_views: 15
  },
  {
    id: 5,
    title: "Downtown Commercial Space",
    description: "Prime commercial space ideal for retail or office use",
    price: 850000,
    property_type: "commercial",
    status: "draft",
    city: "Chicago",
    state: "IL",
    sq_ft: 2200,
    view_count: 0,
    inquiries_count: 0,
    created_at: "2024-01-20T13:10:00Z",
    images: [],
    features: ["High Foot Traffic", "Street Parking", "Modern HVAC", "Flexible Layout"],
    recent_views: 20
  },
  {
    id: 6,
    title: "Mountain View Townhouse",
    description: "Beautiful 3-bedroom townhouse with mountain views and community amenities",
    price: 520000,
    property_type: "townhouse",
    status: "for_sale",
    city: "Denver",
    state: "CO",
    bedrooms: 3,
    bathrooms: 2.5,
    sq_ft: 1800,
    view_count: 167,
    inquiries_count: 15,
    created_at: "2024-01-12T08:30:00Z",
    images: [
      "/townhouse-1.jpg"
    ],
    features: ["Mountain View", "Community Pool", "Garage", "Updated"],
    recent_views: 4
  },
  {
    id: 7,
    title: "Historic City Center Loft",
    description: "Renovated historic loft with original features and modern amenities",
    price: 680000,
    property_type: "loft",
    status: "under_contract",
    city: "Boston",
    state: "MA",
    bedrooms: 2,
    bathrooms: 2,
    sq_ft: 1600,
    view_count: 234,
    inquiries_count: 19,
    created_at: "2024-01-07T15:20:00Z",
    images: [
      "/loft-1.jpg",
      "/loft-2.jpg"
    ],
    features: ["Historic", "High Ceilings", "Exposed Brick", "City Center"],
    recent_views: 10
  },
  {
    id: 8,
    title: "Lakeside Retreat",
    description: "Peaceful 3-bedroom cabin on private lake with fishing and boating",
    price: 395000,
    property_type: "cabin",
    status: "for_sale",
    city: "Lake Tahoe",
    state: "CA",
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1400,
    view_count: 198,
    inquiries_count: 22,
    created_at: "2024-01-03T12:00:00Z",
    images: [
      "/cabin-1.jpg"
    ],
    features: ["Lake Front", "Private Dock", "Fireplace", "Wooded Lot"],
    recent_views: 12
  }
]


export const demoPropertiesList = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.",
    price: 450000,
    property_type: "apartment",
    status: "for_sale",
    city: "New York",
    state: "NY",
    bedrooms: 2,
    bathrooms: 2,
    sq_ft: 1200,
    year_built: 2018,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"
    ],
    features: ["City View", "Modern Kitchen", "Balcony", "Parking", "Gym"],
    view_count: 156,
    days_on_market: 15,
    is_featured: true
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    description: "Stunning 4-bedroom villa with private beach access, panoramic ocean views, and luxury finishes throughout.",
    price: 1250000,
    property_type: "villa",
    status: "for_sale",
    city: "Miami",
    state: "FL",
    bedrooms: 4,
    bathrooms: 3.5,
    sq_ft: 3200,
    year_built: 2020,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400"
    ],
    features: ["Ocean View", "Private Pool", "Beach Access", "Smart Home", "Garden"],
    view_count: 289,
    days_on_market: 8,
    is_featured: true
  },
  {
    id: 3,
    title: "Cozy Garden Condo",
    description: "Charming 1-bedroom condo with private garden in a quiet, friendly neighborhood close to amenities.",
    price: 275000,
    property_type: "condo",
    status: "for_sale",
    city: "Portland",
    state: "OR",
    bedrooms: 1,
    bathrooms: 1,
    sq_ft: 850,
    year_built: 2015,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400"
    ],
    features: ["Garden", "Pet Friendly", "Updated Kitchen", "Storage"],
    view_count: 89,
    days_on_market: 32,
    is_featured: false
  },
  {
    id: 4,
    title: "Suburban Family Home",
    description: "Spacious 5-bedroom family home in excellent school district with large backyard and modern updates.",
    price: 750000,
    property_type: "house",
    status: "under_contract",
    city: "Austin",
    state: "TX",
    bedrooms: 5,
    bathrooms: 3,
    sq_ft: 2800,
    year_built: 2012,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400"
    ],
    features: ["Large Yard", "Garage", "Updated Bathrooms", "Open Floor Plan"],
    view_count: 342,
    days_on_market: 45,
    is_featured: false
  },
  {
    id: 5,
    title: "Mountain View Townhouse",
    description: "Beautiful 3-bedroom townhouse with mountain views, community amenities, and modern interior.",
    price: 520000,
    property_type: "townhouse",
    status: "for_sale",
    city: "Denver",
    state: "CO",
    bedrooms: 3,
    bathrooms: 2.5,
    sq_ft: 1800,
    year_built: 2019,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"
    ],
    features: ["Mountain View", "Community Pool", "Garage", "Updated"],
    view_count: 167,
    days_on_market: 22,
    is_featured: true
  },
  {
    id: 6,
    title: "Historic City Center Loft",
    description: "Renovated historic loft with original features, high ceilings, exposed brick, and modern amenities.",
    price: 680000,
    property_type: "loft",
    status: "for_sale",
    city: "Boston",
    state: "MA",
    bedrooms: 2,
    bathrooms: 2,
    sq_ft: 1600,
    year_built: 1920,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    ],
    features: ["Historic", "High Ceilings", "Exposed Brick", "City Center"],
    view_count: 234,
    days_on_market: 18,
    is_featured: false
  }
]

// Demo data that will work immediately
export const demoInquiries = [
  {
    id: 1,
    buyerName: "John Smith",
    buyerEmail: "john.smith@email.com",
    buyerPhone: "+1 (555) 123-4567",
    propertyTitle: "Modern Downtown Apartment",
    propertyId: 101,
    message: "I'm very interested in this property. Could you please provide more details about the parking situation and recent renovations?",
    timeline: "1-3 months",
    budget_min: "300000",
    budget_max: "400000",
    status: "new",
    important: true,
    createdAt: "2024-01-15T10:30:00Z",
    responses: []
  },
  {
    id: 2,
    buyerName: "Sarah Johnson",
    buyerEmail: "sarah.j@email.com",
    buyerPhone: "+1 (555) 987-6543",
    propertyTitle: "Luxury Villa with Pool",
    propertyId: 102,
    message: "This villa looks perfect for our family! We'd like to schedule a viewing next week. What are your available times?",
    timeline: "immediate",
    budget_min: "1000000",
    budget_max: "1500000",
    status: "responded",
    important: false,
    createdAt: "2024-01-14T14:20:00Z",
    responses: [
      {
        id: 1,
        message: "Thank you for your interest! I'm available for viewings on Tuesday and Thursday afternoons. Would either of those work for you?",
        timestamp: "2024-01-14T16:45:00Z",
        sender: "seller"
      }
    ]
  },
  {
    id: 3,
    buyerName: "Mike Chen",
    buyerEmail: "mike.chen@email.com",
    buyerPhone: "+1 (555) 456-7890",
    propertyTitle: "Modern Downtown Apartment",
    propertyId: 101,
    message: "Is the apartment pet-friendly? We have two small dogs. Also, what utilities are included in the HOA fees?",
    timeline: "3-6 months",
    budget_min: "350000",
    budget_max: "380000",
    status: "new",
    important: false,
    createdAt: "2024-01-13T09:15:00Z",
    responses: []
  },
  {
    id: 4,
    buyerName: "Emily Davis",
    buyerEmail: "emily.davis@email.com",
    buyerPhone: "+1 (555) 234-5678",
    propertyTitle: "Luxury Villa with Pool",
    propertyId: 102,
    propertyPrice: 1400000,
    propertyCity: "Los Angeles",
    propertyState: "CA",
    propertyBedrooms: 4,
    propertyBathrooms: 3,
    propertySqft: 3200,
    propertyType: "Villa",
    propertyImage: "/api/placeholder/400/250",
    message: "We're very serious buyers and have pre-approval. Could you share the HOA rules and recent utility costs?",
    timeline: "immediate",
    budget_min: "1200000",
    budget_max: "1400000",
    status: "closed",
    important: true,
    createdAt: "2024-01-10T11:45:00Z",
    responses: [
      {
        id: 1,
        message: "Great to hear you're pre-approved! I've sent the HOA documents to your email. The average utilities run about $300-400 monthly.",
        sender: "seller",
        sender_id: 1,
        timestamp: "2024-01-10T13:20:00Z",
        is_read: true
      },
      {
        id: 2,
        message: "Thank you for the information. We've decided to move forward with another property, but appreciate your help!",
        sender: "buyer",
        sender_id: 4,
        timestamp: "2024-01-12T10:30:00Z",
        is_read: true
      }
    ]
  },
  {
    id: 5,
    buyerName: "Robert Wilson",
    buyerEmail: "robert.w@email.com",
    buyerPhone: "+1 (555) 345-6789",
    propertyTitle: "Modern Downtown Apartment",
    propertyId: 101,
    message: "I'm an investor looking for rental properties. What's the current rental market like in this area and potential ROI?",
    timeline: "1-3 months",
    budget_min: "320000",
    budget_max: "360000",
    status: "responded",
    important: false,
    createdAt: "2024-01-12T16:30:00Z",
    responses: [
      {
        id: 1,
        message: "The rental market is very strong in this area. Similar units rent for $2,800-3,200/month. Would you like me to send you a detailed ROI analysis?",
        timestamp: "2024-01-13T09:00:00Z",
        sender: "seller"
      }
    ]
  }
];

export const demoSchedules = [
  {
    id: 1,
    property: { title: "Modern Apartment in Downtown", city: "New York" },
    buyer: { name: "Alice Johnson" },
    agent: { name: "Michael Lee" },
    scheduled_at: "2025-11-07 14:30",
    meeting_type: "in-person",
    status: "pending",
    notes: "Buyer prefers afternoon slot.",
  },
  {
    id: 2,
    property: { title: "Beachfront Cottage", city: "Miami" },
    buyer: { name: "John Smith" },
    agent: { name: "Samantha Davis" },
    scheduled_at: "2025-11-10 10:00",
    meeting_type: "virtual",
    status: "approved",
    notes: "Tour via Zoom link shared.",
  },
  {
    id: 3,
    property: { title: "Luxury Villa in Beverly Hills", city: "Los Angeles" },
    buyer: { name: "Emma Brown" },
    agent: { name: "Michael Lee" },
    scheduled_at: "2025-11-12 16:00",
    meeting_type: "in-person",
    status: "completed",
    notes: "Visit successfully completed.",
  },
  {
    id: 4,
    property: { title: "Luxury Villa in Beverly Hills", city: "Los Angeles" },
    buyer: { name: "Emma Brown" },
    // agent: { name: "Michael Lee" },
    scheduled_at: "2025-11-12 16:00",
    meeting_type: "in-person",
    status: "approved",
    notes: "Visit successfully completed.",
  },
]

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Owner",
    content: "EstateHub helped me find my dream home in just 2 weeks! The process was smooth and professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Investor",
    content: "As an investor, I appreciate the market insights and property analytics. Made my investment decisions much easier.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "First-time Buyer",
    content: "The team was incredibly patient and guided me through every step. Couldn't be happier with my new apartment!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500"
  }
];


export const stats = [
  { number: "10,000+", label: "Properties Listed" },
  { number: "5,000+", label: "Happy Customers" },
  { number: "50+", label: "Cities Covered" },
  { number: "24/7", label: "Customer Support" }
];

// Featured properties data
export const featuredPropertiesData = [
  {
    id: 1,
    title: "Modern Villa",
    location: "Beverly Hills, CA",
    beds: 4,
    baths: 3,
    sqft: 3200,
    price: "$2,500,000",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Manhattan, NY",
    beds: 2,
    baths: 2,
    sqft: 1800,
    price: "$1,800,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470",
    featured: true
  },
  {
    id: 3,
    title: "Beach House",
    location: "Miami, FL",
    beds: 3,
    baths: 2,
    sqft: 2200,
    price: "$1,200,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470",
    featured: true
  },
  {
    id: 4,
    title: "Urban Loft",
    location: "Chicago, IL",
    beds: 2,
    baths: 2,
    sqft: 1600,
    price: "$950,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    beds: 5,
    baths: 4,
    sqft: 3800,
    price: "$3,200,000",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 6,
    title: "City Penthouse",
    location: "San Francisco, CA",
    beds: 3,
    baths: 3,
    sqft: 2400,
    price: "$2,100,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
  }
];

export const heroContent = [
  {
    title: "Discover Your Perfect",
    highlight: "Dream Property",
    description: "Experience seamless property discovery with our AI-powered platform. From luxury estates to strategic investments, find exactly what you're looking for.",
    badge: "AI-Powered Platform",
    image: "https://images.unsplash.com/photo-1560448076-213180fe7d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Luxury Living",
    highlight: "Redefined",
    description: "Access exclusive properties in prime locations. Our curated portfolio features the finest homes with exceptional amenities and investment potential.",
    badge: "Exclusive Collection",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Smart Real Estate",
    highlight: "Investments",
    description: "Make data-driven decisions with comprehensive market analytics and expert guidance. Maximize returns with our strategic investment opportunities.",
    badge: "Market Intelligence",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470"
  }
];

export const demoPreferences = [
  {
    id: 1,
    user_id: 1,
    name: "Downtown Condos",
    min_price: 300000,
    max_price: 500000,
    min_bedrooms: 2,
    min_bathrooms: 2,
    property_type: "condo",
    location: "Downtown",
    min_sqft: 800,
    max_sqft: 1500,
    amenities: ["parking", "gym", "pool"],
    alerts_enabled: true,
    alert_frequency: "instant",
    is_active: true,
    is_default: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    user_id: 1,
    name: "Suburban Family Homes",
    min_price: 500000,
    max_price: 800000,
    min_bedrooms: 3,
    min_bathrooms: 2,
    property_type: "house",
    location: "North Suburbs",
    min_sqft: 1500,
    max_sqft: 2500,
    amenities: ["garage", "garden", "schools"],
    alerts_enabled: true,
    alert_frequency: "daily",
    is_active: true,
    is_default: false,
    created_at: "2024-01-10T14:20:00Z",
    updated_at: "2024-01-12T09:15:00Z"
  },
  {
    id: 3,
    user_id: 1,
    name: "Luxury Waterfront",
    min_price: 1000000,
    max_price: 2500000,
    min_bedrooms: 4,
    min_bathrooms: 3,
    property_type: "house",
    location: "Waterfront",
    min_sqft: 2500,
    max_sqft: 5000,
    amenities: ["pool", "dock", "view", "smart_home"],
    alerts_enabled: false,
    alert_frequency: "weekly",
    is_active: true,
    is_default: false,
    created_at: "2024-01-05T16:45:00Z",
    updated_at: "2024-01-08T11:30:00Z"
  },
  {
    id: 4,
    user_id: 1,
    name: "Starter Apartments",
    min_price: 150000,
    max_price: 300000,
    min_bedrooms: 1,
    min_bathrooms: 1,
    property_type: "apartment",
    location: "University Area",
    min_sqft: 500,
    max_sqft: 900,
    amenities: ["laundry", "parking"],
    alerts_enabled: true,
    alert_frequency: "instant",
    is_active: true,
    is_default: false,
    created_at: "2024-01-20T08:15:00Z",
    updated_at: "2024-01-20T08:15:00Z"
  },
  {
    id: 5,
    user_id: 1,
    name: "Investment Properties",
    min_price: 200000,
    max_price: 400000,
    min_bedrooms: 2,
    min_bathrooms: 1,
    property_type: "townhouse",
    location: "East District",
    min_sqft: 1000,
    max_sqft: 1800,
    amenities: ["rental_ready", "low_maintenance"],
    alerts_enabled: true,
    alert_frequency: "daily",
    is_active: false,
    is_default: false,
    created_at: "2024-01-18T13:40:00Z",
    updated_at: "2024-01-22T10:20:00Z"
  }
];

export const demoAlerts = [
  {
    id: 1,
    user_id: 1,
    preference_id: 1,
    name: "Downtown Luxury Condos",
    criteria: {
      min_price: 300000,
      max_price: 500000,
      min_bedrooms: 2,
      property_type: "condo",
      location: "Downtown"
    },
    status: "active",
    frequency: "instant",
    match_count: 12,
    total_matches: 45,
    last_matched_at: "2024-01-25T14:30:00Z",
    last_notified_at: "2024-01-25T10:15:00Z",
    is_active: true,
    email_notifications: true,
    push_notifications: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-25T14:30:00Z"
  },
  {
    id: 2,
    user_id: 1,
    preference_id: 2,
    name: "Family Suburban Homes",
    criteria: {
      min_price: 500000,
      max_price: 800000,
      min_bedrooms: 3,
      property_type: "house",
      location: "North Suburbs"
    },
    status: "active",
    frequency: "daily",
    match_count: 5,
    total_matches: 23,
    last_matched_at: "2024-01-24T18:45:00Z",
    last_notified_at: "2024-01-24T08:00:00Z",
    is_active: true,
    email_notifications: true,
    push_notifications: false,
    created_at: "2024-01-10T14:20:00Z",
    updated_at: "2024-01-24T18:45:00Z"
  },
  {
    id: 3,
    user_id: 1,
    preference_id: 3,
    name: "Premium Waterfront",
    criteria: {
      min_price: 1000000,
      max_price: 2500000,
      min_bedrooms: 4,
      property_type: "house",
      location: "Waterfront"
    },
    status: "paused",
    frequency: "weekly",
    match_count: 2,
    total_matches: 8,
    last_matched_at: "2024-01-20T11:20:00Z",
    last_notified_at: "2024-01-20T11:20:00Z",
    is_active: false,
    email_notifications: false,
    push_notifications: true,
    created_at: "2024-01-05T16:45:00Z",
    updated_at: "2024-01-22T09:10:00Z"
  },
  {
    id: 4,
    user_id: 1,
    preference_id: 4,
    name: "Student Apartments",
    criteria: {
      min_price: 150000,
      max_price: 300000,
      min_bedrooms: 1,
      property_type: "apartment",
      location: "University Area"
    },
    status: "active",
    frequency: "instant",
    match_count: 8,
    total_matches: 32,
    last_matched_at: "2024-01-25T16:20:00Z",
    last_notified_at: "2024-01-25T12:30:00Z",
    is_active: true,
    email_notifications: true,
    push_notifications: true,
    created_at: "2024-01-20T08:15:00Z",
    updated_at: "2024-01-25T16:20:00Z"
  },
  {
    id: 5,
    user_id: 1,
    preference_id: 1,
    name: "Downtown Studio Deals",
    criteria: {
      min_price: 200000,
      max_price: 350000,
      min_bedrooms: 1,
      property_type: "condo",
      location: "Downtown"
    },
    status: "active",
    frequency: "daily",
    match_count: 15,
    total_matches: 67,
    last_matched_at: "2024-01-25T09:45:00Z",
    last_notified_at: "2024-01-24T08:00:00Z",
    is_active: true,
    email_notifications: true,
    push_notifications: false,
    created_at: "2024-01-12T11:30:00Z",
    updated_at: "2024-01-25T09:45:00Z"
  }
];

export const demoMatchingProperties = [
  {
    id: 101,
    title: "Luxury Downtown Condo with City Views",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "condo",
    location: "Downtown",
    address: "123 Main Street, Downtown",
    image: "/api/placeholder/400/300",
    amenities: ["parking", "gym", "pool", "concierge"],
    listed_at: "2024-01-25T10:00:00Z",
    match_score: 95
  },
  {
    id: 102,
    title: "Modern Suburban Family Home",
    price: 650000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    type: "house",
    location: "North Suburbs",
    address: "456 Oak Avenue, North Suburbs",
    image: "/api/placeholder/400/300",
    amenities: ["garage", "garden", "fireplace", "schools"],
    listed_at: "2024-01-24T14:30:00Z",
    match_score: 88
  },
  {
    id: 103,
    title: "Stunning Waterfront Estate",
    price: 1850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3800,
    type: "house",
    location: "Waterfront",
    address: "789 Beach Road, Waterfront",
    image: "/api/placeholder/400/300",
    amenities: ["pool", "dock", "view", "smart_home", "guest_house"],
    listed_at: "2024-01-23T09:15:00Z",
    match_score: 92
  },
  {
    id: 104,
    title: "Cozy University Apartment",
    price: 220000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    type: "apartment",
    location: "University Area",
    address: "321 College Street, University Area",
    image: "/api/placeholder/400/300",
    amenities: ["laundry", "parking", "campus_proximity"],
    listed_at: "2024-01-25T16:45:00Z",
    match_score: 85
  },
  {
    id: 105,
    title: "Investment Townhouse - Great ROI",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1250,
    type: "townhouse",
    location: "East District",
    address: "654 Pine Street, East District",
    image: "/api/placeholder/400/300",
    amenities: ["rental_ready", "low_maintenance", "community_pool"],
    listed_at: "2024-01-24T11:20:00Z",
    match_score: 78
  }
];

export const mockOffers = [
  {
    id: 1,
    property: {
      id: 101,
      title: "Modern Downtown Condo",
      address: "123 Main St, Downtown, CA",
      price: 485000,
      image: "/api/placeholder/400/300",
      beds: 2,
      baths: 2,
      sqft: 1200
    },
    offerAmount: 475000,
    offerDate: "2024-01-15",
    status: "pending", // pending, accepted, rejected, counter_offer, withdrawn
    expiration: "2024-01-22",
    lastUpdated: "2024-01-15",
    sellerResponse: null,
    counterOffer: null,
    contingencies: ["financing", "inspection"],
    earnestMoney: 10000,
    notes: "Love the natural light in this unit!"
  },
  {
    id: 2,
    property: {
      id: 102,
      title: "Luxury Waterfront Villa",
      address: "456 Beach Rd, Malibu, CA",
      price: 2500000,
      image: "/api/placeholder/400/300",
      beds: 5,
      baths: 4,
      sqft: 3800
    },
    offerAmount: 2450000,
    offerDate: "2024-01-12",
    status: "accepted",
    expiration: "2024-01-19",
    lastUpdated: "2024-01-13",
    sellerResponse: "Accepted your offer! Let's move forward.",
    counterOffer: null,
    contingencies: ["financing", "inspection", "appraisal"],
    earnestMoney: 50000,
    notes: "Perfect for our growing family"
  },
  {
    id: 3,
    property: {
      id: 103,
      title: "Charming Victorian House",
      address: "789 Oak Ave, Heritage, CA",
      price: 650000,
      image: "/api/placeholder/400/300",
      beds: 3,
      baths: 2,
      sqft: 1800
    },
    offerAmount: 620000,
    offerDate: "2024-01-10",
    status: "rejected",
    expiration: "2024-01-17",
    lastUpdated: "2024-01-11",
    sellerResponse: "Received a higher offer from another buyer.",
    counterOffer: null,
    contingencies: ["financing", "inspection"],
    earnestMoney: 15000,
    notes: "Great character but needs some updates"
  },
  {
    id: 4,
    property: {
      id: 104,
      title: "Urban Loft Apartment",
      address: "321 Loft St, Arts District, CA",
      price: 350000,
      image: "/api/placeholder/400/300",
      beds: 1,
      baths: 1,
      sqft: 900
    },
    offerAmount: 340000,
    offerDate: "2024-01-08",
    status: "counter_offer",
    expiration: "2024-01-15",
    lastUpdated: "2024-01-09",
    sellerResponse: "We'd like to counter at $345,000",
    counterOffer: 345000,
    contingencies: ["financing"],
    earnestMoney: 8000,
    notes: "Perfect downtown location"
  },
  {
    id: 5,
    property: {
      id: 105,
      title: "Suburban Family Home",
      address: "654 Pine St, Suburbia, CA",
      price: 750000,
      image: "/api/placeholder/400/300",
      beds: 4,
      baths: 3,
      sqft: 2200
    },
    offerAmount: 730000,
    offerDate: "2024-01-05",
    status: "withdrawn",
    expiration: "2024-01-12",
    lastUpdated: "2024-01-06",
    sellerResponse: null,
    counterOffer: null,
    contingencies: ["financing", "inspection"],
    earnestMoney: 20000,
    notes: "Found another property we liked better"
  }
];


export const processSteps = [
  {
    key: "contract_generation",
    label: "Contract Generation",
    icon: FileText,
    color: "blue",
    requiredDocuments: [
      { type: "purchase_agreement", name: "Purchase Agreement", required: true },
      { type: "counter_offer", name: "Counter Offer Form", required: true },
      { type: "property_disclosures", name: "Property Disclosures", required: true },
      { type: "addendum", name: "Addendums", required: false }
    ],
  },
  {
    key: "earnest_money",
    label: "Earnest Money",
    icon: DollarSign,
    color: "amber",
    requiredDocuments: [
      { type: "emd_receipt", name: "EMD Receipt", required: true },
      { type: "wire_instructions", name: "Wire Instructions", required: true },
      { type: "funds_verification", name: "Proof of Funds", required: true }
    ]
  },
  {
    key: "inspection",
    label: "Property Inspection",
    icon: ClipboardCheck,
    color: "purple",
    requiredDocuments: [
      { type: "home_inspection", name: "Home Inspection Report", required: true },
      { type: "pest_inspection", name: "Pest Inspection", required: true },
      { type: "roof_inspection", name: "Roof Inspection", required: false },
      { type: "repair_addendum", name: "Repair Addendum", required: false }
    ]
  },
  {
    key: "mortgage_processing",
    label: "Mortgage Processing",
    icon: Shield,
    color: "green",
    requiredDocuments: [
      { type: "loan_application", name: "Loan Application", required: true },
      { type: "appraisal_report", name: "Appraisal Report", required: true },
      { type: "underwriting_approval", name: "Underwriting Approval", required: true },
      { type: "title_report", name: "Title Report", required: true }
    ]
  },
  {
    key: "closing_preparation",
    label: "Closing",
    icon: CheckCircle2,
    color: "emerald",
    requiredDocuments: [
      { type: "closing_disclosure", name: "Closing Disclosure", required: true },
      { type: "settlement_statement", name: "Settlement Statement", required: true },
      { type: "deed", name: "Property Deed", required: true },
      { type: "wire_confirmation", name: "Wire Confirmation", required: true }
    ]
  }
];

export const processPostProcessSteps = [
  {
    step: 1,
    title: "Contract Generation",
    status: "active",
    description: "Generate and execute purchase agreement",
    tasks: [
      "Prepare formal contract documents",
      "Review all terms and conditions",
      "Coordinate e-signatures from all parties",
      "Distribute executed copies",
      "Update property status to 'Under Contract'"
    ],
    icon: FileText,
    color: "border-l-blue-500 bg-blue-50",
    iconColor: "text-blue-600",
    duration: "1-2 days",
    responsible: "Agent & Attorney"
  },
  {
    step: 2,
    title: "Earnest Money Deposit",
    status: "pending",
    description: "Collect and verify good faith deposit",
    tasks: [
      "Send EMD instructions to buyer",
      "Verify wire transfer receipt",
      "Confirm with title company",
      "Update system with receipt date",
      "Send confirmation to all parties"
    ],
    icon: DollarSign,
    color: "border-l-amber-500 bg-amber-50",
    iconColor: "text-amber-600",
    duration: "3-5 days",
    responsible: "Buyer & Title Company"
  },
  {
    step: 3,
    title: "Property Inspection",
    status: "pending",
    description: "Schedule and complete property inspections",
    tasks: [
      "Coordinate inspection schedule",
      "Attend inspection with buyer",
      "Review inspection report",
      "Negotiate repairs if needed",
      "Document all findings"
    ],
    icon: ClipboardCheck,
    color: "border-l-purple-500 bg-purple-50",
    iconColor: "text-purple-600",
    duration: "7-10 days",
    responsible: "Agent & Inspector"
  },
  {
    step: 4,
    title: "Mortgage Processing",
    status: "pending",
    description: "Manage buyer's loan approval process",
    tasks: [
      "Connect buyer with preferred lenders",
      "Submit required documentation",
      "Track appraisal schedule",
      "Monitor underwriting progress",
      "Secure final loan commitment"
    ],
    icon: Shield,
    color: "border-l-green-500 bg-green-50",
    iconColor: "text-green-600",
    duration: "21-30 days",
    responsible: "Buyer & Lender"
  },
  {
    step: 5,
    title: "Closing Preparation",
    status: "pending",
    description: "Finalize all closing details",
    tasks: [
      "Schedule closing date with all parties",
      "Review closing disclosure",
      "Coordinate with title company",
      "Prepare for final walkthrough",
      "Confirm all documents are ready"
    ],
    icon: CheckCircle2,
    color: "border-l-emerald-500 bg-emerald-50",
    iconColor: "text-emerald-600",
    duration: "3-5 days",
    responsible: "Agent & Title Company"
  }
];


export const activities = [
  // === DOCUMENT ACTIVITIES ===
  {
    id: 1,
    type: "document_upload",
    message: "Purchase agreement uploaded",
    time: "2 hours ago",
    status: "completed",
    icon: Upload,
    color: "text-green-500",
    property: "123 Main Street",
    user: "John Agent",
    action: "uploaded",
    item: "Purchase Agreement",
    step: "contract_generation"
  },
  {
    id: 2,
    type: "document_signed",
    message: "Disclosure forms signed by buyer",
    time: "5 hours ago",
    status: "completed",
    icon: PenTool,
    color: "text-blue-500",
    property: "456 Oak Avenue",
    user: "Sarah Buyer",
    action: "signed",
    item: "Disclosure Forms",
    step: "contract_generation"
  },
  {
    id: 3,
    type: "document_request",
    message: "Bank statements requested",
    time: "1 day ago",
    status: "pending",
    icon: Clock,
    color: "text-amber-500",
    property: "789 Pine Road",
    user: "Loan Officer",
    action: "requested",
    item: "Bank Statements (6 months)",
    step: "mortgage_processing"
  },

  // === STEP PROGRESS ACTIVITIES ===
  {
    id: 4,
    type: "step_completed",
    message: "Contract generation completed",
    time: "2 days ago",
    status: "completed",
    icon: CheckCircle2,
    color: "text-green-500",
    property: "123 Main Street",
    user: "System",
    action: "completed",
    item: "Contract Generation Step",
    step: "contract_generation"
  },
  {
    id: 5,
    type: "step_started",
    message: "Earnest money step initiated",
    time: "1 day ago",
    status: "active",
    icon: DollarSign,
    color: "text-blue-500",
    property: "456 Oak Avenue",
    user: "System",
    action: "started",
    item: "Earnest Money Step",
    step: "earnest_money"
  },

  // === FINANCIAL ACTIVITIES ===
  {
    id: 6,
    type: "payment_received",
    message: "Earnest money deposit received",
    time: "3 hours ago",
    status: "completed",
    icon: DollarSign,
    color: "text-green-500",
    property: "123 Main Street",
    user: "Escrow Company",
    action: "received",
    item: "Earnest Money - $10,000",
    step: "earnest_money"
  },
  {
    id: 7,
    type: "payment_due",
    message: "Appraisal fee due tomorrow",
    time: "1 day ago",
    status: "urgent",
    icon: AlertCircle,
    color: "text-red-500",
    property: "789 Pine Road",
    user: "System",
    action: "due",
    item: "Appraisal Fee - $500",
    step: "mortgage_processing"
  },

  // === COMMUNICATION ACTIVITIES ===
  {
    id: 8,
    type: "message_sent",
    message: "Inspection schedule sent to buyer",
    time: "4 hours ago",
    status: "completed",
    icon: Mail,
    color: "text-blue-500",
    property: "456 Oak Avenue",
    user: "John Agent",
    action: "sent",
    item: "Inspection Schedule",
    step: "inspection"
  },
  {
    id: 9,
    type: "deadline_approaching",
    message: "Mortgage contingency in 2 days",
    time: "2 days ago",
    status: "urgent",
    icon: AlertCircle,
    color: "text-amber-500",
    property: "123 Main Street",
    user: "System",
    action: "deadline",
    item: "Mortgage Contingency",
    step: "mortgage_processing"
  },

  // === THIRD-PARTY ACTIVITIES ===
  {
    id: 10,
    type: "inspection_scheduled",
    message: "Home inspection scheduled",
    time: "1 day ago",
    status: "pending",
    icon: Calendar,
    color: "text-blue-500",
    property: "789 Pine Road",
    user: "Inspector Pro",
    action: "scheduled",
    item: "Home Inspection - Mar 15, 2:00 PM",
    step: "inspection"
  },
  {
    id: 11,
    type: "appraisal_ordered",
    message: "Property appraisal ordered",
    time: "3 days ago",
    status: "completed",
    icon: Building,
    color: "text-green-500",
    property: "456 Oak Avenue",
    user: "Appraisal Co",
    action: "ordered",
    item: "Property Appraisal",
    step: "mortgage_processing"
  }
]; 
