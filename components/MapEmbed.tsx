type MapEmbedProps = {
  query: string;
  venueName: string;
  mapUrl: string;
};

export function MapEmbed({ query, venueName, mapUrl }: MapEmbedProps) {
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

  return (
    <div className="map-block">
      <div className="map-heading">
        <p className="mini-label">Find us</p>
        <h3>Party location</h3>
      </div>
      <div className="map-frame">
        <iframe
          title={`Map showing ${venueName}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        className="map-open-link"
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open a map for ${venueName} in a new tab`}
      >
        Open in Google Maps
      </a>
    </div>
  );
}
