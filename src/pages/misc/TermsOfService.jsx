// src/pages/TermsOfService/TermsOfService.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using Real Estate CMS, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>You must be at least 18 years old to create an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Property Listings</h2>
            <p className="text-muted-foreground mb-4">
              When listing properties on our platform:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>You must have the legal right to list the property</li>
              <li>All information must be accurate and not misleading</li>
              <li>You must comply with fair housing laws and regulations</li>
              <li>Photos must accurately represent the property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Post false, inaccurate, or misleading information</li>
              <li>Harass, threaten, or discriminate against others</li>
              <li>Use the platform for unauthorized commercial purposes</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this platform, including text, graphics, logos, and software, 
              is the property of Real Estate CMS or its content suppliers and is protected 
              by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our platform may contain links to third-party websites or services. We are not 
              responsible for the content or practices of these third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Real Estate CMS shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or inability 
              to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
            <p className="text-muted-foreground">
              The property information provided on our platform is for general informational 
              purposes only. We do not guarantee the accuracy, completeness, or reliability 
              of any property listings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of our 
              services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms shall be governed by and construed in accordance with the laws of 
              the State of Karnataka, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact us at:
              <br />
              <strong>Email:</strong> legal@realestatecms.com
              <br />
              <strong>Phone:</strong> (555) 987-6543
              <br />
              <strong>Address:</strong> 123 Legal Avenue, Compliance City, CC 54321
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;