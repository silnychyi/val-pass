import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata = {
  title: "MiUPV",
  description: "Digital student ID and access card",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MiUPV",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var pathname = window.location.pathname;
                var basePath = pathname.startsWith('/val-pass') ? '/val-pass' : '';
                
                // Update or create manifest link
                var manifestLink = document.querySelector('link[rel="manifest"]');
                if (!manifestLink) {
                  manifestLink = document.createElement('link');
                  manifestLink.setAttribute('rel', 'manifest');
                  document.head.appendChild(manifestLink);
                }
                manifestLink.setAttribute('href', basePath + '/manifest.json');
                
                // Update apple touch icons
                var updateAppleIcon = function(rel, href) {
                  var link = document.querySelector('link[rel="' + rel + '"]');
                  if (!link) {
                    link = document.createElement('link');
                    link.setAttribute('rel', rel);
                    if (rel.indexOf('apple-touch-icon') !== -1) {
                      link.setAttribute('sizes', '180x180');
                    }
                    document.head.appendChild(link);
                  }
                  link.setAttribute('href', basePath + href);
                };
                
                updateAppleIcon('apple-touch-icon', '/apple-icon-180x180.png');
                updateAppleIcon('apple-touch-icon-precomposed', '/apple-icon-precomposed.png');
                
                // Preserve URL parameters for PWA installation
                (function() {
                  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                                    window.navigator.standalone || 
                                    document.referrer.includes('android-app://');
                  var urlParams = new URLSearchParams(window.location.search);
                  var hasParams = urlParams.toString().length > 0;
                  
                  // If we have URL parameters (and not in standalone mode yet), save them
                  // This captures params when user visits before installing
                  if (hasParams && !isStandalone) {
                    localStorage.setItem('pwa_url_params', urlParams.toString());
                    localStorage.removeItem('pwa_params_restored'); // Reset restore flag
                  }
                  
                  // If we're in standalone mode and have no URL params, restore from localStorage
                  if (isStandalone && !hasParams) {
                    var alreadyRestored = localStorage.getItem('pwa_params_restored');
                    if (!alreadyRestored) {
                      var savedParams = localStorage.getItem('pwa_url_params');
                      if (savedParams) {
                        var newUrl = window.location.pathname + '?' + savedParams;
                        if (window.location.hash) {
                          newUrl += window.location.hash;
                        }
                        // Mark as restored to prevent loops
                        localStorage.setItem('pwa_params_restored', 'true');
                        // Update URL and reload to ensure Next.js picks up the params
                        window.history.replaceState({}, '', newUrl);
                        window.location.reload();
                        return; // Exit early since we're reloading
                      }
                    }
                  }
                })();
              })();
            `,
          }}
        />
      </head>
      <body className={`${sourceCodePro.variable} antialiased`}>
        <div
          className="max-w-md mx-auto w-full min-h-screen"
          style={{ backgroundColor: "#1c1b1f" }}
        >
          {children}
        </div>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
