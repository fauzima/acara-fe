"use client"
import React, { useState } from "react";

export default function HoverModal({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
}) {
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {trigger}
      <div
        onClick={() => setVisible(false)}
        className={`${isVisible ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity`}
      >
        {content}
      </div>
    </div>
  );
}
