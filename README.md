🏠 Real Estate CMS
A modern, full-stack Real Estate Content Management System built with React, Laravel, and MySQL. This platform allows real estate agents to manage property listings, handle client inquiries, and showcase properties with a beautiful, responsive interface.

✨ Features
🏘️ Property Management
Add, Edit, Delete property listings

Multiple Image Upload with progress bars

Advanced Filtering by price, location, bedrooms, amenities

Featured Properties with different priority levels

Property Search with real-time results

👥 User Management
Role-based Access (Admin, Agent, Buyer)

User Registration & Authentication with Laravel Sanctum

Profile Management with user preferences

Favorite Properties system

📊 Admin Dashboard
Property Analytics and insights

User Management panel

Inquiry Management system

Media Library for file management

🎨 Modern UI/UX
Responsive Design for all devices

Dark/Light Mode support

Image Carousels with smooth animations

Toast Notifications for user feedback

Loading States and error handling

🛠️ Tech Stack
Frontend
React 18 - Modern React with hooks

Vite - Fast build tool and dev server

Tailwind CSS - Utility-first CSS framework

shadcn/ui - Beautifully designed components

React Router - Client-side routing

Axios - HTTP client for API calls

Lucide React - Beautiful icons

Sonner - Toast notifications

Backend
Laravel 10/11 - PHP framework

Laravel Sanctum - API authentication

MySQL - Database

Eloquent ORM - Database operations

API Resources - Transform API responses

🚀 Quick Start
Prerequisites
Node.js 18+

PHP 8.1+

Composer

MySQL 8.0+

Installation
Clone the repository

bash
git clone https://github.com/suraj733/real-estate-cms.git
cd real-estate-cms
Backend Setup

bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=real_estate
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate
php artisan db:seed
php artisan serve
Frontend Setup

bash
cd frontend
npm install
cp .env.example .env

# Configure API URL in .env
VITE_API_URL=http://localhost:8000/api

npm run dev
Access the Application

Frontend: http://localhost:5173

Backend API: http://localhost:8000

📁 Project Structure
text
real-estate-cms/
├── backend/
│   ├── app/
│   │   ├── Models/          # Eloquent models
│   │   ├── Http/
│   │   │   ├── Controllers/ # API controllers
│   │   │   └── Resources/   # API resources
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/      # Database migrations
│   │   └── seeders/         # Sample data
│   └── routes/
│       └── api.php          # API routes
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   │   ├── ui/          # shadcn/ui components
    │   │   ├── layout/      # Layout components
    │   │   └── common/      # Common components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── hooks/           # Custom React hooks
    │   ├── routes/          # React Router configuration
    │   └── contexts/        # React contexts
    ├── public/              # Static assets
    └── package.json
🗄️ Database Schema
Core Tables
users - User accounts and authentication

properties - Property listings with details

property_images - Multiple images per property

inquiries - Client inquiries and leads

favorites - User favorite properties

user_preferences - User search preferences

🔐 API Endpoints
Authentication
POST /api/register - User registration

POST /api/login - User login

POST /api/logout - User logout

GET /api/user - Get current user

Properties
GET /api/properties - Get all properties (with filters)

POST /api/properties - Create new property

GET /api/properties/{id} - Get single property

PUT /api/properties/{id} - Update property

DELETE /api/properties/{id} - Delete property

User-specific
GET /api/user/properties - Get user's properties

GET /api/user/favorites - Get user's favorites

POST /api/favorites/{property} - Add to favorites

🎯 Key Features Implementation
Image Upload with Progress
javascript
// Multi-image upload with progress tracking
images.forEach((image, index) => {
  formData.append(`images[${index}]`, image.file);
});
Advanced Filtering
php
public function scopeWithFilters($query, $filters) {
    return $query->when($filters['min_price'], fn($q) => $q->where('price', '>=', $filters['min_price']))
                 ->when($filters['property_type'], fn($q) => $q->where('property_type', $filters['property_type']))
                 ->when($filters['bedrooms'], fn($q) => $q->where('bedrooms', '>=', $filters['bedrooms']));
}
Responsive Design
Mobile-first approach with Tailwind CSS

Grid layouts that adapt to screen size

Touch-friendly interface elements

🚀 Deployment
Backend (Laravel)
bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
Frontend (Vite)
bash
npm run build
🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Suraj - Full Stack Web Developer

GitHub: @suraj733

Portfolio: [Your Portfolio Link]

LinkedIn: [Your LinkedIn]

🙏 Acknowledgments
Laravel - The PHP framework

React - The JavaScript library

Tailwind CSS - CSS framework

shadcn/ui - UI components

Lucide - Beautiful icons

⭐ Star this repo if you found it helpful!

🎉 What's Next?
Add real-time chat between agents and clients

Implement payment integration for premium listings

Add advanced analytics with charts

Create mobile app with React Native

Add multi-language support

Implement advanced search with map integration

Built with ❤️ by Suraj using modern web technologies.
