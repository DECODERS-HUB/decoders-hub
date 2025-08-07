import React from "react";

const ClientLogosSection = () => {
  // Placeholder logos - these can be replaced with actual client logos
  const clients = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateLab", logo: "IL" },
    { name: "StartupHub", logo: "SH" },
    { name: "GrowthVentures", logo: "GV" },
    { name: "FutureScale", logo: "FS" },
    { name: "DigitalEdge", logo: "DE" }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-lg font-medium text-muted-foreground">
            Trusted by bold startups and organizations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-muted-foreground">
                  {client.logo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;