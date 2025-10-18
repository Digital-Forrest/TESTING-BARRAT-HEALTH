import { useEffect, useRef } from 'react';
import logo1 from '../assets/1.svg';
import logo2 from '../assets/2.svg';
import logo3 from '../assets/3.svg';
import logo4 from '../assets/4.svg';
import logo5 from '../assets/5.svg';
import logo6 from '../assets/6.svg';
import logo7 from '../assets/7.svg';
import logo8 from '../assets/8.svg';
import logo9 from '../assets/9.svg';
import logo10 from '../assets/10.svg';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

export function LogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed as needed

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when it reaches halfway (since we duplicate the logos)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 20); // Adjust interval for smoothness

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div></div>
  );
}

