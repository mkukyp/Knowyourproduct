"use client";

interface Brand {
  Brand: string;
  Country: string;
  Contributor?: string;
}

interface BrandItemProps {
  brand: Brand;
  getFlagUrl: (countryName: string) => string;
  showToast: (message: string) => void;
}

export default function BrandItem({ brand, getFlagUrl, showToast }: BrandItemProps) {
  return (
    <div className="brand-item">
      <img src={getFlagUrl(brand.Country)} alt={brand.Country} />
      {brand.Brand} ({brand.Country})
      {brand.Contributor && brand.Contributor.trim().toLowerCase() !== "admin" && (
        <span
          className="contributor-star"
          data-tooltip={`Contributed by ${brand.Contributor}`}
          onClick={(e) => {
            if (window.innerWidth < 768) {
              e.stopPropagation();
              showToast(`⭐ Contributed by ${brand.Contributor}`);
            }
          }}
        >
          ★
        </span>
      )}
    </div>
  );
}
