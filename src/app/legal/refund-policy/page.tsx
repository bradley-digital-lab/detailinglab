import React from 'react';

export const metadata = {
  title: 'Refund Policy | Detailing Lab',
  description: 'Our strict cancellation and service refund policies.',
};

export default function RefundPolicy() {
  return (
    <>
      <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">Refund & Cancellation</h1>
      <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-12">Last Updated: April 2026</p>

      <h2>1. Service-Based Nature</h2>
      <p>
        At <strong>Detailing Lab</strong>, we provide elite, highly-specialized physical labour and utilize premium, non-reusable chemical assets (Ceramic and Graphene coatings, heavy cutting compounds). Because our product is our time, expertise, and applied liquid engineering, our refund policies differ strictly from retail product returns.
      </p>

      <h2>2. Cancellation & Rescheduling</h2>
      <p>
        We understand that circumstances change. However, allocating a full day (or multiple days for heavy correction) to your vehicle completely locks out our ability to service other clients.
      </p>
      <ul>
        <li><strong>48+ Hours Notice:</strong> Bookings can be safely rescheduled with zero penalty if notified more than 48 hours in advance. If you wish to cancel entirely, your deposit (if collected) will be retained to cover administrative and allocated material costs.</li>
        <li><strong>Under 48 Hours Notice:</strong> Cancellations or requests to reschedule made within 48 hours of the appointment time will result in the immediate forfeiture of your deposit. A new deposit will be required to secure a future date.</li>
        <li><strong>Unsuitable Conditions:</strong> If we arrive at the agreed location and and are forced to cancel due to the client failing to provide a safe working environment, legal off-street parking, or power access (as agreed to in our Terms), the minimum call-out fee or deposit will be retained.</li>
      </ul>

      <h2>3. Post-Service Refunds</h2>
      <p>
        Due to the physical nature of paint correction and chemical bonding, we cannot un-polish a car, nor can we physically extract a cured 9H ceramic shield from the clear coat.
      </p>
      <p><strong>Therefore, completed detailing services are strictly non-refundable.</strong></p>

      <h2>4. The Detailing Lab Guarantee (Our Recourse)</h2>
      <p>
        While we do not offer monetary refunds for completed work, we operate strictly on reputation and elite standards. If you inspect the vehicle upon handover and feel the agreed-upon standards of the booked tier have not been met:
      </p>
      <ul>
        <li>You must notify the technician immediately during the final handover walk-around, or within 24 hours of the service completion if minor high-spots from the ceramic coating are noticed under different lighting.</li>
        <li>We will happily arrange a follow-up visit to rectify the specific issue (e.g., leveling a ceramic high-spot, or re-addressing a missed interior crevice) completely free of charge.</li>
      </ul>
      <p>
        Please note: We cannot be held liable for damages, swirl marks, or scratches inflicted by the client, third-party hand car washes, or environmental factors (bird droppings baked into the paint) occurring *after* the vehicle has been handed over. 
      </p>

      <h2>5. Contact</h2>
      <p>
        If you need to urgently reschedule an upcoming booking, please contact us immediately at bookings@detailinglab.co.uk or call the number provided in your booking confirmation text.
      </p>
    </>
  );
}
