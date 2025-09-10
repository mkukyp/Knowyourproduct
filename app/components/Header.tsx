"use client";

interface HeaderProps {
  onAboutClick: () => void;
}

export default function Header({ onAboutClick }: HeaderProps) {
  return (
    <header>
      <div className="about-text" onClick={onAboutClick}>
        About
      </div>
      <h1>Know Your Product</h1>
      <div className="sub-title">Choose your brand wisely!</div>
    </header>
  );
}

