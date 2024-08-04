"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = ({ size }: { size: number }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const colours = {
    top: theme === "light" ? "#3F3F46" : "#F4F4F590",
    middle: theme === "light" ? "#18181B" : "#E4E4E790",
    bottom: theme === "light" ? "#52525B" : "#F9FAFB90",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
    >
      {/* top */}
      <path
        fill={colours.top}
        d="M12.5 41.667c0 13.807 11.193 25 25 25 8.062 0 15.232-3.816 19.803-9.74L87.269 21.82c1.731-2.028.29-5.153-2.377-5.153H37.5c-13.807 0-25 11.192-25 25Z"
      />
      {/* bottom */}
      <path
        fill={colours.bottom}
        d="M87.5 58.333c0-13.807-11.193-25-25-25-8.062 0-15.232 3.816-19.803 9.74L12.732 78.18c-1.731 2.028-.29 5.153 2.377 5.153H62.5c13.807 0 25-11.193 25-25Z"
      />
      {/* middle */}
      <path
        fill={colours.middle}
        fillRule="evenodd"
        d="M74.722 36.52A24.887 24.887 0 0 0 62.5 33.332c-8.062 0-15.232 3.816-19.803 9.74L25.277 63.48A24.887 24.887 0 0 0 37.5 66.668c8.062 0 15.232-3.816 19.803-9.74L74.722 36.52Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Logo;
