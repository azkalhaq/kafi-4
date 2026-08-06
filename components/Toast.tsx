"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  visible: boolean;
};

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`toast${visible ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

export function useToast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [visible, message]);

  function showToast(nextMessage: string) {
    setMessage(nextMessage);
    setVisible(true);
  }

  return { message, visible, showToast };
}
