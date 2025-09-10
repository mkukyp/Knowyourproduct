"use client";

import { useState } from "react";
import BrandItem from "./BrandItem";

interface Brand {
  Brand: string;
  Country: string;
  Contributor?: string;
}

interface Segments {
  [segmentName: string]: Brand[];
}

interface SegmentListProps {
  segments: Segments;
  getFlagUrl: (countryName: string) => string;
  showToast: (message: string) => void;
}

export default function SegmentList({
  segments,
  getFlagUrl,
  showToast,
}: SegmentListProps) {
  const [openSegment, setOpenSegment] = useState<string | null>(null);

  return (
    <div id="segmentsContainer">
      {Object.keys(segments).map((seg) => (
        <div
          key={seg}
          className="segment"
          onClick={() => setOpenSegment(openSegment === seg ? null : seg)}
        >
          <div className="segment-header">
            {seg} ({segments[seg].length})
          </div>
          <div
            className="brands"
            style={{
              maxHeight: openSegment === seg ? "1000px" : "0",
            }}
          >
            {segments[seg].map((b, i) => (
              <BrandItem
                key={i}
                brand={b}
                getFlagUrl={getFlagUrl}
                showToast={showToast}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

