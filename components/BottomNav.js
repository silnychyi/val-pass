"use client";

export default function BottomNav({ activeView, onNavClick }) {
  const navColor = "#d1d1d1";
  const activeColor = "#ffffff";

  const navItems = [
    {
      href: "/alert",
      label: "Alert",
      icon: (
        <svg
          className="w-6 h-6 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
    {
      href: "/calendars",
      label: "Calendars",
      icon: (
        <svg
          className="w-6 h-6 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      href: "/",
      label: "Card",
      icon: (
        <svg
          className="w-6 h-6 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      href: "/menu",
      label: "Menu",
      icon: (
        <svg
          className="w-6 h-6 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full shadow-lg safe-area-inset-bottom"
      style={{ backgroundColor: "#2e2d31" }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center p-2 pb-8">
          {navItems.map((item) => {
            const isActive = activeView === item.href;
            return (
              <button
                key={item.href}
                onClick={() => onNavClick(item.href)}
                className="flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer border-none bg-transparent"
                style={{ color: isActive ? activeColor : navColor }}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
