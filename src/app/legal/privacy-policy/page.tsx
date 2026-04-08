import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Detailing Lab',
  description: 'Detailed GDPR-compliant privacy and data usage policy.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">Privacy Policy</h1>
      <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-12">Last Updated: April 2026</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>Detailing Lab</strong> ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
      </p>
      <p>
        This policy explicitly adheres to the United Kingdom General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2>2. Important Information and Who We Are</h2>
      <p><strong>Controller</strong></p>
      <p>
        Detailing Lab is the controller and responsible for your personal data.
      </p>
      <p>
        <strong>Contact Details:</strong><br />
        Full name of legal entity: [COMPANY NAME]<br />
        Email address: bookings@detailinglab.co.uk<br />
        Postal address: [HQ ADDRESS LINE 1, CITY, POSTCODE]<br />
      </p>

      <h2>3. The Data We Collect About You</h2>
      <p>
        Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
      </p>
      <ul>
        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title.</li>
        <li><strong>Contact Data</strong> includes billing address, email address, and telephone numbers.</li>
        <li><strong>Vehicle Data</strong> includes vehicle make, model, registration number, and photographic evidence of vehicle condition before and after services.</li>
        <li><strong>Financial Data</strong> includes payment card details (processed securely via Stripe; we do not hold card numbers).</li>
        <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of services you have purchased from us.</li>
        <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
      </ul>

      <h2>4. How We Use Your Personal Data</h2>
      <p>
        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
      </p>
      <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your detailing booking).</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal obligation.</li>
      </ul>

      <h2>5. Cookie Policy & Tracking</h2>
      <p>
        We operate a strict "Opt-In" cookie policy. We do not deploy analytical tracking scripts (such as Google Analytics or Meta Pixel) until you explicitly click "Accept All" on our consent manager. If you click "Essentials Only", we only set strictly necessary session cookies required for the website's booking backend to operate.
      </p>

      <h2>6. Data Security & Localization</h2>
      <p>
        All booking and customer progression data is stored securely in databases located strictly within the European Union (EU) or the United Kingdom (UK) to prevent unlawful cross-border data transfer violations. We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way, altered, or disclosed.
      </p>

      <h2>7. Your Legal Rights</h2>
      <p>
        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
      </p>
      <ul>
        <li>Request access to your personal data (commonly known as a "data subject access request").</li>
        <li>Request correction of the personal data that we hold about you.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>
      <p>
        If you wish to exercise any of the rights set out above, please contact us at bookings@detailinglab.co.uk.
      </p>
    </>
  );
}
