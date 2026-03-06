import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          DEFAULT: "hsl(var(--navy))",
          foreground: "hsl(var(--navy-foreground))",
          muted: "hsl(var(--navy-muted))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          border: "hsl(var(--highlight-border))",
        },
        hover: {
          DEFAULT: "hsl(var(--hover))",
          foreground: "hsl(var(--hover-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        status: {
          confirmed: "hsl(var(--status-confirmed))",
          "confirmed-bg": "hsl(var(--status-confirmed-bg))",
          discussed: "hsl(var(--status-discussed))",
          "discussed-bg": "hsl(var(--status-discussed-bg))",
          unconfirmed: "hsl(var(--status-unconfirmed))",
          "unconfirmed-bg": "hsl(var(--status-unconfirmed-bg))",
          leaked: "hsl(var(--status-leaked))",
          "leaked-bg": "hsl(var(--status-leaked-bg))",
        },
        journey: {
          current: "hsl(var(--journey-current))",
          complete: "hsl(var(--journey-complete))",
          pending: "hsl(var(--journey-pending))",
          confirmed: "hsl(var(--journey-confirmed))",
          discussed: "hsl(var(--journey-discussed))",
          unconfirmed: "hsl(var(--journey-unconfirmed))",
          next: "hsl(var(--journey-next))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95) translateY(20px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      boxShadow: {
        'sm': '0 1px 2px 0 hsl(220 25% 20% / 0.05)',
        'DEFAULT': '0 1px 3px 0 hsl(220 25% 20% / 0.06), 0 1px 2px -1px hsl(220 25% 20% / 0.06)',
        'md': '0 2px 6px -1px hsl(220 25% 20% / 0.07), 0 4px 12px -2px hsl(220 25% 20% / 0.06)',
        'lg': '0 4px 12px -2px hsl(220 25% 20% / 0.08), 0 8px 24px -4px hsl(220 25% 20% / 0.10)',
        'xl': '0 8px 20px -4px hsl(220 25% 20% / 0.10), 0 16px 48px -8px hsl(220 25% 20% / 0.12)',
        'soft': '0 2px 8px -2px hsl(220 25% 20% / 0.08)',
        'warm': '0 6px 20px -6px hsl(16 65% 52% / 0.12)',
        'glow': '0 8px 30px -8px hsl(16 65% 52% / 0.18)',
        'card': '0 1px 2px 0 hsl(220 25% 20% / 0.04), 0 4px 16px -4px hsl(220 25% 20% / 0.08), 0 8px 24px -6px hsl(220 25% 20% / 0.06)',
        'card-hover': '0 2px 4px 0 hsl(220 25% 20% / 0.06), 0 8px 24px -4px hsl(220 25% 20% / 0.12), 0 16px 40px -8px hsl(220 25% 20% / 0.08)',
        'elevated': '0 4px 16px -4px hsl(220 25% 20% / 0.10), 0 12px 40px -8px hsl(220 25% 20% / 0.14), 0 20px 56px -12px hsl(220 25% 20% / 0.06)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
