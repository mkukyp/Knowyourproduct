"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import SegmentList from "./components/SegmentList";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwrC37rw6JyZVdUlCKxu_OPwsYvgFRwEQxv7ODcYg_h-ivFahCtsw9dxR5g3b1ODBesbQ/exec";

export default function Home() {
  const [segments, setSegments] = useState<Record<string, any[]>>({});
  const [filtered, setFiltered] = useState<Record<string, any[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);

  useEffect(() => {
    fetch(scriptURL)
      .then((res) => res.json())
      .then((data) => {
        const segs: Record<string, any[]> = {};
        data.forEach((item: any) => {
          if (item.isApproved == 1) {
            if (!segs[item.Segment]) segs[item.Segment] = [];
            segs[item.Segment].push(item);
          }
        });
        setSegments(segs);
        setFiltered(segs);
      })
      .catch(() => console.error("Error loading data"));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered(segments);
    } else {
      const result: Record<string, any[]> = {};
      Object.keys(segments).forEach((seg) => {
        const filteredBrands = segments[seg].filter(
          (b) =>
            seg.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.Brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredBrands.length > 0) result[seg] = filteredBrands;
      });
      setFiltered(result);
    }
  }, [searchTerm, segments]);

  const getFlagUrl = (country: string) =>
    country
      ? `https://flagcdn.com/${country.slice(0, 2).toLowerCase()}.svg`
      : "https://flagcdn.com/un.svg";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <>
      <Header onAboutClick={() => setAboutOpen(true)} />
      <div className="container">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onContributeClick={() => setContributeOpen(true)}
        />
        <div className="info-text">
          Don’t see your brand here? Contribute and it will show up with your
          name!
        </div>
        <SegmentList
          segments={filtered}
          getFlagUrl={getFlagUrl}
          showToast={showToast}
        />
      </div>

      {/* Contribute Modal */}
      <Modal open={contributeOpen} onClose={() => setContributeOpen(false)}>
        <h3>Contribute a Brand</h3>
        <p>Please use this Google Form to submit:</p>
        <a
          href="https://forms.gle/HebmpxmPbeR8iyQj8"
          target="_blank"
          className="btn"
        >
          Open Form
        </a>
      </Modal>

      {/* About Modal */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <h3>About</h3>
        <p>
          In our daily lives, we use many products from different brands.
          Often, we don’t know which country a brand belongs to or what
          alternative options are available in the same segment.
          <br />
          <br />
          The idea behind this page is to make information simple and
          transparent — so that anyone can easily see where a brand comes
          from and explore choices available in the market.
          <br />
          <br />
          This platform is not made to hurt or target any company or product.
          The purpose is to <strong>create awareness</strong> and help people
          make more <strong>informed decisions</strong>.
        </p>
      </Modal>

      <Toast message={toast} />
    </>
  );
}

