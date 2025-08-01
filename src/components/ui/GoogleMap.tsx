import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      // Get the API key from Supabase Edge Functions
      const { data, error } = await supabase.functions.invoke('get-secret', {
        body: { name: 'GOOGLE_MAPS_API_KEY' }
      });

      if (error || !data?.value) {
        console.error('Error fetching Google Maps API key:', error);
        return;
      }

      const loader = new Loader({
        apiKey: data.value,
        version: 'weekly',
        libraries: ['places']
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
          });

          // Add a marker for the office location
          new google.maps.Marker({
            position: kwara,
            map: mapInstanceRef.current,
            title: 'DECODERS HUB - Kwara State, Nigeria',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C11.03 2 7 6.03 7 11C7 18.25 16 30 16 30S25 18.25 25 11C25 6.03 20.97 2 16 2ZM16 14.5C14.07 14.5 12.5 12.93 12.5 11S14.07 7.5 16 7.5S19.5 9.07 19.5 11S17.93 14.5 16 14.5Z" fill="#3B82F6"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};

export default GoogleMap;