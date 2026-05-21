export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block">
            Legal
          </span>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">
            Terms of Service
          </h1>
          <p className="text-white/40 text-sm font-light">Last updated: May 20, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-10 text-white/70 text-sm md:text-base leading-relaxed font-light">

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ShipBridge platform, website, and services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use our Services.
            </p>
            <p className="mt-4">
              These Terms constitute a legally binding agreement between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;You&quot;) and ShipBridge Technologies Pvt Ltd (&quot;ShipBridge&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company incorporated under the Companies Act, 2013 in India.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">2. Description of Services</h2>
            <p>
              ShipBridge provides an AI-powered shipping and logistics platform that enables businesses to:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Connect to multiple Indian courier partners through a single interface</li>
              <li>Generate shipping labels and manage orders in bulk</li>
              <li>Track shipments in real time across courier networks</li>
              <li>Manage COD orders, remittance, and reconciliation</li>
              <li>Automate NDR resolution and returns management</li>
              <li>Access AI-powered courier selection and RTO prediction</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">3. User Accounts and Registration</h2>
            <p>
              To use our Services, you must create an account. You agree to:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Provide accurate, current, and complete registration information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activity under your account</li>
            </ul>
            <p className="mt-4">
              You must be at least 18 years old and a resident of India to use our Services. Business accounts must be authorized by an individual with legal capacity to bind the entity.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">4. Fees and Payment</h2>
            <p>
              Our fees are based on per-shipment pricing and any applicable subscription plans. All fees are denominated in Indian Rupees (INR) and are exclusive of applicable taxes including GST.
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Fees are charged based on shipments processed through the platform</li>
              <li>Payment terms are net 15 or as agreed in your service agreement</li>
              <li>Late payments may result in service suspension</li>
              <li>All applicable taxes (GST, etc.) will be added to invoices</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">5. User Obligations</h2>
            <p>You agree not to:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Use the Services for any unlawful purpose or in violation of Indian laws</li>
              <li>Ship prohibited or restricted items as defined by Indian customs and courier regulations</li>
              <li>Provide false or misleading shipment information</li>
              <li>Attempt to circumvent our AI courier selection or pricing logic</li>
              <li>Reverse engineer, copy, or modify our platform without authorization</li>
              <li>Use bots, scrapers, or automated tools beyond our API rate limits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">6. Shipping and Courier Terms</h2>
            <p>
              ShipBridge acts as an intermediary between you and courier partners. Key terms:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li>Shipment delivery timelines are estimates provided by courier partners</li>
              <li>Claims for lost or damaged shipments must follow the respective courier&apos;s policy</li>
              <li>COD remittance timelines vary by courier partner (typically 7-15 days)</li>
              <li>RTO charges and reverse shipping costs are passed through from courier partners</li>
              <li>ShipBridge is not liable for delays or losses caused by courier partners</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">7. Intellectual Property</h2>
            <p>
              All intellectual property rights in the ShipBridge platform, including our AI models, algorithms, software, design, and content, are owned by ShipBridge Technologies Pvt Ltd. You are granted a limited, non-exclusive, non-transferable license to use the Services for your business purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Indian law, ShipBridge shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services. Our total liability for any claim shall not exceed the fees paid by you in the 12 months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">9. Termination</h2>
            <p>
              Either party may terminate this agreement with 30 days written notice. We may suspend or terminate your account immediately for breach of these Terms, fraudulent activity, or violation of applicable laws. Upon termination, you must settle all outstanding fees and your account data will be retained for 90 days per our data retention policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">10. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English in Bangalore, Karnataka. The decision of the arbitrator shall be final and binding.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the platform. Continued use of the Services after changes constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">12. Contact</h2>
            <p>
              For questions about these Terms, please contact us at <a href="mailto:legal@shipbridge.com" className="text-[#00ff87] hover:underline">legal@shipbridge.com</a> or write to us at:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-white font-medium">ShipBridge Technologies Pvt Ltd</p>
              <p>Email: <a href="mailto:legal@shipbridge.com" className="text-[#00ff87] hover:underline">legal@shipbridge.com</a></p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
