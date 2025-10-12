import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
      <Button
        size="icon"
        onClick={scrollToTop}
        className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full h-12 w-12 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}