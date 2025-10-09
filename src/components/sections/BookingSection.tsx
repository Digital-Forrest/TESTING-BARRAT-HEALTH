import { Button } from "@/components/ui/button";

export function BookingSection() {
  return (
    <section className="bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Nurturing Mental Wellness for All Ages
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Neurodivergent care for children, adolescents, and adults across the lifespan.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Psychology Today Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-lg" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }}>
                  Psychology Today
                </span>
              </div>
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap"
              >
                <a 
                  href="https://www.psychologytoday.com/us/psychiatrists/kadija-conteh-barrat-stafford-va/1164659" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Book appointment on Psychology Today"
                >
                  Book An Appointment
                </a>
              </Button>
            </div>

            {/* Headway Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Headway</span>
                </div>
              </div>
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap"
              >
                <a 
                  href="https://care.headway.co/providers/kadija-conteh-barrat?utm_source=website&utm_medium=direct_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Book appointment on Headway"
                >
                  Book An Appointment
                </a>
              </Button>
            </div>

            {/* Growtherapy Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <span className="font-bold text-gray-900 text-lg lowercase">
                  growtherapy
                </span>
              </div>
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap"
              >
                <a 
                  href="https://growtherapy.com/book-appointment?id=25415&utm_source=website&utm_medium=booking-link&utm_campaign=provider-dashboard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Book appointment on Growtherapy"
                >
                  Book An Appointment
                </a>
              </Button>
            </div>

            {/* HelloAlma Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <span className="font-bold text-gray-900 text-lg">
                  HelloAlma
                </span>
              </div>
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap"
              >
                <a 
                  href="https://secure.helloalma.com/providers/kadija-conteh-barrat/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Book appointment on HelloAlma"
                >
                  Book An Appointment
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
