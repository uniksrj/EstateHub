// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Real Estate CMS. We are committed to protecting your personal information 
              and your right to privacy. This Privacy Policy explains how we collect, use, and 
              share your personal information when you use our real estate platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">Personal Information You Provide:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Account credentials (username and password)</li>
              <li>Property preferences and search history</li>
              <li>Communication preferences</li>
              <li>Property inquiries and messages to agents</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">Automatically Collected Information:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Usage data and browsing behavior</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our real estate services</li>
              <li>Connect buyers with property agents</li>
              <li>Send property recommendations and updates</li>
              <li>Process property inquiries and showings</li>
              <li>Improve our platform and user experience</li>
              <li>Communicate with you about your account</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Real estate agents and brokers to facilitate property transactions</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties during business transfers or mergers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information 
              from unauthorized access, alteration, or destruction. However, no internet 
              transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> privacy@realestatecms.com
              <br />
              <strong>Phone:</strong> (555) 123-4567
              <br />
              <strong>Address:</strong> 123 Real Estate Drive, Property City, PC 12345
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;