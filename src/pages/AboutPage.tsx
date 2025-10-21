import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="bg-white">
      <SEO
        title="About Our Practice & Founder"
        description="Meet Dr. Kadija Conteh-Barrat, dual board-certified PMHNP. Learn about our strengths-based, trauma-informed approach to mental health care in Woodbridge, VA."
      />
      {/* Hero Section */}
      <section className="relative bg-light-gray overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="https://media.barratbhandconsulting.com/supporting%20pages%20background.webm" type="video/webm" />
        </video>
        
        {/* Content */}
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
            About Barrat Behavioral Health and Primary Care
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
            Welcome to Barrat Behavioral Health and Primary Care. We're honored that you've chosen us to be part of your wellness journey.
          </p>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-gray-600">
              <p className="text-lg leading-relaxed">
                Our practice is built on the belief that true health means caring for both the mind and body, and we are dedicated to providing care that is compassionate, culturally sensitive, and evidence-based.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you are seeking support for mental health, weight management, or both, you'll find a safe, supportive space where your voice matters and your care is tailored to your unique needs. From your very first visit, our goal is to make you feel heard, respected, and empowered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Approach
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              At Barrat, we view wellness as a partnership. We walk alongside you, offering integrated, whole-person care designed to support lasting health and healing. Every plan is individualized, every patient is valued, and every story is honored.
            </p>
          </div>
        </div>
      </section>

      {/* Led by Expertise Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Led by Expertise and Compassion
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Barrat Behavioral Health and Primary Care was founded by Kadija Conteh-Barrat, DNP, FNP-BC, PMHNP-BC. With over a decade of experience and dual board certification in Family Practice and Psychiatric Mental Health, Kadija brings both expertise and empathy to every encounter. Her vision is simple: to make high-quality, accessible care available to all.
            </p>
          </div>
        </div>
      </section>

      {/* Accessible Care Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Accessible Care, Close to Home
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              We offer both virtual and in-person appointments for residents of Virginia, Washington DC, Maryland, Delaware, and West Virginia—making comprehensive, convenient care within reach.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission and Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Our Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Vision</h3>
                <p className="text-gray-600 mt-2">A community where Adolescents and adults have the tools, support, and confidence to thrive at every stage of their journey.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Mission</h3>
                <p className="text-gray-600 mt-2">We are dedicated to supporting Adolescents and adults in achieving wellness, growth, and resilience, helping them thrive at every stage of life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-lg px-8 py-4 text-base transition-transform hover:scale-105">
              <Link to="/contact" aria-label="Book an appointment">
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}