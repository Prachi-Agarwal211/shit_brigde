export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block">
            Legal
          </span>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm font-light">Last updated: May 20, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-10 text-white/70 text-sm md:text-base leading-relaxed font-light">

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">1. Introduction</h2>
            <p>
              ShipBridge (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered shipping and logistics platform and website.
            </p>
            <p className="mt-4">
              We comply with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian data protection laws. By using ShipBridge, you consent to the practices described in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, business name, GST number, and billing address.</li>
              <li><strong className="text-white">Shipping Data:</strong> Sender and receiver names, addresses, phone numbers, pincode details, order details, and shipment tracking data.</li>
              <li><strong className="text-white">Account Data:</strong> Login credentials, API keys, integration settings, and communication preferences.</li>
              <li><strong className="text-white">Usage Data:</strong> How you interact with our platform, including pages visited, features used, and dashboard activity.</li>
              <li><strong className="text-white">Device Data:</strong> IP address, browser type, device information, and operating system.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Provide and maintain our shipping and logistics platform</li>
              <li>Process shipments, generate labels, and manage COD and returns</li>
              <li>Improve our AI algorithms for courier selection and RTO prediction</li>
              <li>Send tracking updates and delivery notifications to your customers</li>
              <li>Communicate with you about your account, billing, and support requests</li>
              <li>Comply with legal and regulatory obligations under Indian law</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">4. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li><strong className="text-white">Courier Partners:</strong> To fulfill shipments, we share sender and receiver details with our courier network partners including Delhivery, Blue Dart, DTDC, XpressBees, Ecom Express, India Post, and others.</li>
              <li><strong className="text-white">Service Providers:</strong> Third-party vendors who help us operate our platform, process payments, and send communications.</li>
              <li><strong className="text-white">Legal Authorities:</strong> When required by law or to protect our legal rights.</li>
            </ul>
            <p className="mt-4">We do not sell your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">5. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit (TLS 1.3) and at rest, role-based access controls, regular security audits, and secure APIs. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide services. Shipping data is retained in accordance with Indian legal requirements and our data retention policy. You may request deletion of your data by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">7. Your Rights</h2>
            <p>Under the DPDP Act, 2023, you have the right to:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Access and review the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request erasure of your data, subject to legal obligations</li>
              <li>Withdraw consent previously provided</li>
              <li>Grievance redressal for any violation of data protection obligations</li>
            </ul>
            <p className="mt-4">To exercise these rights, contact our Grievance Officer at <a href="mailto:privacy@shipbridge.com" className="text-[#00ff87] hover:underline">privacy@shipbridge.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">8. Grievance Officer</h2>
            <p>
              In accordance with the DPDP Act, 2023 and Indian IT Rules, 2011, the contact details of our Grievance Officer are:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-white font-medium">Grievance Officer</p>
              <p className="mt-2">ShipBridge Technologies Pvt Ltd</p>
              <p>Email: <a href="mailto:privacy@shipbridge.com" className="text-[#00ff87] hover:underline">privacy@shipbridge.com</a></p>
              <p>Response Time: Within 24 hours acknowledgement, 15 days resolution</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes via email or through our platform. Your continued use of ShipBridge after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at <a href="mailto:contact@shipbridge.com" className="text-[#00ff87] hover:underline">contact@shipbridge.com</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
