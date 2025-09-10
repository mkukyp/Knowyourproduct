"use client";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div id="toast" className={`toast ${message ? "show" : ""}`}>
      {message}
    </div>
  );
}

