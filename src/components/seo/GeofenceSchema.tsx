import React from 'react';
import Script from 'next/script';

export default function GeofenceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "name": "Detailing Lab",
    "url": "https://detailinglab.co.uk",
    "telephone": "+447000000000",
    "priceRange": "£££",
    "description": "Elite Automotive Detailing and Ceramic Coating servicing Yorkshire.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yorkshire",
      "addressRegion": "YKS",
      "addressCountry": "UK"
    },
    // The "Geofenced Extraction" - Explicitly targeting high-net-worth postcodes
    "areaServed": [
      {
        "@type": "City",
        "name": "Harrogate",
        "sameAs": "https://en.wikipedia.org/wiki/Harrogate"
      },
      {
        "@type": "City",
        "name": "Leeds",
        "sameAs": "https://en.wikipedia.org/wiki/Leeds"
      },
      {
         "@type": "City",
         "name": "York",
         "sameAs": "https://en.wikipedia.org/wiki/York"
      },
      {
        "@type": "PostalCode",
        "name": "HG1"
      },
      {
        "@type": "PostalCode",
        "name": "HG2"
      },
      {
        "@type": "PostalCode",
        "name": "LS1"
      }
    ],
    // Lat/Long precise anchoring
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.9921, // Harrogate rough center
      "longitude": -1.5418
    },
    "hasMap": "https://maps.google.com/?cid=YOUR_CID_HERE", // To be filled in production
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <Script
      id="geofence-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
