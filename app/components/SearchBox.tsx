"use client";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onContributeClick: () => void;
}

export default function SearchBox({
  searchTerm,
  setSearchTerm,
  onContributeClick,
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search segment or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn" onClick={onContributeClick}>
        Contribute Brand
      </button>
    </div>
  );
}
