import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | Detailing Lab',
  description: 'Service terms, liabilities, and legal conditions for Detailing Lab services.',
};

export default function TermsAndConditions() {
  return (
    <>
      <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">Terms & Conditions</h1>
      <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-12">Last Updated: April 2026</p>

      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Detailing Lab</strong> ("we," "us" or "our"), concerning your access to and use of our website as well as any booking or detailing service secured through it.
      </p>

      <h2>2. Vehicle Condition & Inspection</h2>
      <p>
        Prior to commencing any paint correction or ceramic coating service, our technicians will conduct a thorough visual inspection of your vehicle. 
      </p>
      <ul>
        <li><strong>Pre-existing Damage:</strong> We are not liable for any pre-existing damage, clear coat failure, stone chips, deep scratches, or interior wear that is revealed during the heavy decontamination and washing process.</li>
        <li><strong>Right to Refuse:</strong> We reserve the right to refuse service upon physical inspection if the vehicle's paint depth is deemed critically low or unsafe for heavy machine correction.</li>
        <li><strong>Personal Items:</strong> Customers must remove all personal belongings from the vehicle prior to our arrival. We accept no liability for the loss or damage of personal items left within the cabin.</li>
      </ul>

      <h2>3. Pricing & Booking Deposits</h2>
      <p>
        The prices quoted via our online estimator are highly accurate approximations based on vehicle size classifications. However, they may be subject to minor variance depending on the extreme condition of the vehicle upon physical inspection.
      </p>
      <ul>
        <li><strong>Deposits:</strong> To secure a booking for our high-ticket services, a non-refundable deposit may be required. This deposit structurally secures your allocated time slot and covers initial material procurement (e.g., customized graphene/ceramic batches).</li>
        <li><strong>Payment:</strong> Full payment of the remaining balance is required strictly upon completion of the service and final vehicle handover.</li>
      </ul>

      <h2>4. Execution of Services</h2>
      <p>
        We operate an elite mobile detailing laboratory. To successfully execute our services at your location, we require:
      </p>
      <ul>
        <li>Unrestricted access to a safe, off-street working area (driveway, private detailing unit, or large private garage). We cannot perform multi-stage paint correction on public roads due to safety, dust contamination, and legal restrictions.</li>
        <li>Access to a standard mains electrical outlet. (We carry our own ultra-pure DI water supply, but power is strictly required for heavy polishing machinery).</li>
      </ul>

      <h2>5. Warranties and Guarantees</h2>
      <p>
        Our ceramic coatings are rated for multi-year lifespans. However, the durability of any 9H coating is strictly dependent on proper aftercare.
      </p>
      <p>
        <strong>Voiding the Guarantee:</strong> Taking the treated vehicle through an automated mechanical car wash, utilizing high-pH acid-based traffic film removers (TFR) at cheap hand-washes, or failing to decontaminate the vehicle regularly will catastrophically degrade the molecular shield and instantly void any durability guarantees.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These conditions are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. If your habitual residence is in the UK, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country of residence.
      </p>
    </>
  );
}
