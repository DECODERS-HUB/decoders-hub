import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the API key from Supabase Edge Functions
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { name: 'GOOGLE_MAPS_API_KEY' }
        });

        if (error || !data?.value) {
          console.error('Error fetching Google Maps API key:', error);
          setError('Failed to load API key');
          setLoading(false);
          return;
        }

        const loader = new Loader({
          apiKey: data.value,
          version: 'weekly',
          libraries: ['places', 'marker']
        });

        try {
          await loader.load();
          
          if (mapRef.current && !mapInstanceRef.current) {
            // Kwara State, Nigeria coordinates
            const kwara = { lat: 8.9669, lng: 4.4186 };
            
            mapInstanceRef.current = new google.maps.Map(mapRef.current, {
              zoom: 10,
              center: kwara,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
            });

            // Use AdvancedMarkerElement instead of deprecated Marker
            if (google.maps.marker?.AdvancedMarkerElement) {
              const marker = new google.maps.marker.AdvancedMarkerElement({
                position: kwara,
                map: mapInstanceRef.current,
                title: 'DECODERS HUB - Kwara State, Nigeria',
              });
            } else {
              // Fallback to regular marker if AdvancedMarkerElement is not available
              new google.maps.Marker({
                position: kwara,
                map: mapInstanceRef.current,
                title: 'DECODERS HUB - Kwara State, Nigeria',
              });
            }
            
            setLoading(false);
          }
        } catch (mapError) {
          console.error('Error loading Google Maps:', mapError);
          setError('Maps API not enabled. Please enable Google Maps JavaScript API in your Google Cloud Console.');
          setLoading(false);
        }
      } catch (fetchError) {
        console.error('Error fetching API key:', fetchError);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    initMap();
  }, []);

  if (loading) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-muted ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-muted border rounded-lg ${className}`}>
        <div className="text-center p-6">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Map Unavailable</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error}
          </p>
          <div className="text-sm text-muted-foreground">
            <p><strong>DECODERS HUB</strong></p>
            <p>Kwara State, Nigeria</p>
            <p>Phone: +234 123 456 7890</p>
            <p>Email: info@decodershub.com</p>
          </div>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};

export default GoogleMap;