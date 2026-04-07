// Simulated Supabase Database & Geo-Routing Engine
// In production, this runs as a Vercel Edge Function hitting Supabase PostGIS.

export interface Detailer {
    id: string;
    name: string;
    subscriptionActive: boolean;
    coverageRadiusMiles: number;
    baseLocation: { lat: number; lng: number };
    blockedDates: string[]; // ISO string dates (YYYY-MM-DD)
}

// MOCK SECURE DATABASE
const networkDetailers: Detailer[] = [
    {
        id: "det_1",
        name: "Yorkshire Elite Auto (HQ)",
        subscriptionActive: true,
        coverageRadiusMiles: 50,
        baseLocation: { lat: 53.7997, lng: -1.5492 }, // Leeds
        blockedDates: ["2026-04-10", "2026-04-11"]
    },
    {
        id: "det_2",
        name: "Sheffield Ceramic Specialists",
        subscriptionActive: true, // Has paid Stripe sub
        coverageRadiusMiles: 20,
        baseLocation: { lat: 53.3811, lng: -1.4701 }, // Sheffield
        blockedDates: []
    },
    {
        id: "det_3",
        name: "Harrogate Mobile Detail",
        subscriptionActive: false, // Subscription failed, should never receive leads
        coverageRadiusMiles: 30,
        baseLocation: { lat: 53.9921, lng: -1.5418 }, // Harrogate
        blockedDates: []
    }
];

// FAKE GEO-LOCATION MATRIX (Converts Postcode to roughly lat/lng for simulation)
const mockPostcodeDatabase: Record<string, { lat: number, lng: number }> = {
    "LS1": { lat: 53.7997, lng: -1.5492 }, // Leeds Center
    "S1": { lat: 53.3811, lng: -1.4701 },  // Sheffield Center
    "HG1": { lat: 53.9921, lng: -1.5418 }, // Harrogate
};

// SIMULATE HAVERSINE DISTANCE MATH (Straight line miles)
function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 3958.8; // Radius of earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; 
    return d;
}

/**
 * Core Dispatch Algorithm
 * 1. Requires active Stripe Subscription.
 * 2. Requires requested Date to NOT be blocked.
 * 3. Requires requested Postcode to be within their Coverage Radius.
 * 4. Auto-dispatches to the closest eligible detailer (Uber-style logic).
 */
export async function findAvailableDetailer(dateIso: string, postcodeCode: string): Promise<Detailer | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 1. Simulate Postcode Lookup
            // Just matching the prefix for the mock.
            const prefix = postcodeCode.toUpperCase().substring(0, 3).trim();
            const customerLocation = mockPostcodeDatabase[prefix] || mockPostcodeDatabase["LS1"]; // Default to LEEDS if unknown for demo

            let assignedDetailer: Detailer | null = null;
            let shortestDistance = Infinity;

            for (const detailer of networkDetailers) {
                // RULE 1: Sub must be active
                if (!detailer.subscriptionActive) continue;

                // RULE 2: Detailer cannot be blocked on this date
                if (detailer.blockedDates.includes(dateIso)) continue;

                // RULE 3: Customer must be inside Detailer's coverage radius
                const distance = calculateDistanceMiles(
                    customerLocation.lat, customerLocation.lng, 
                    detailer.baseLocation.lat, detailer.baseLocation.lng
                );

                if (distance <= detailer.coverageRadiusMiles) {
                    // This detailer can take the job! Are they the closest?
                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        assignedDetailer = detailer;
                    }
                }
            }

            resolve(assignedDetailer);
        }, 1500); // Simulate network latency to DB
    });
}
