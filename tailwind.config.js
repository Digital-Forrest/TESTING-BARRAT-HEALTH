/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    // Only include files that actually exist and are used
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    // Keep essential classes that might be dynamically generated
    'bg-brand-orange',
    'text-brand-orange',
    'border-brand-orange',
    'bg-brand-orange-dark',
    'hover:bg-brand-orange-dark',
    'bg-brand-blue',
    'text-brand-blue',
    'border-brand-blue',
    'hover:bg-brand-blue',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Merriweather',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Montserrat',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1.1'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem'
  		},
  		maxWidth: {
  			'container': '1200px',
  		},
  		borderRadius: {
  			'oval': '60px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        // Brand Colors
        'brand-orange': '#FF6900',
        'brand-orange-dark': '#e55a00',
        'brand-blue': '#0056A7',
        'brand-orange-soft': '#FFFBEB',
        'light-gray': '#f9f9f9',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			}
  		},
  		boxShadow: {
  			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  			glow: '0 0 20px -5px rgba(99, 102, 241, 0.4)',
  			'glow-lg': '0 0 40px -10px rgba(99, 102, 241, 0.3)',
  			primary: '0 0 20px -5px hsl(var(--primary) / 0.4)',
  			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 0.3s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundImage: {
  			'gradient-primary': 'linear-gradient(135deg, #FF6900, #0056A7)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
}