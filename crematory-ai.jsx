import React, { useEffect, useMemo, useState } from "react";

const SAMPLE_ITEMS = [
  { id: "urn-rose-gold", title: "Rose Gold Keepsake Urn Necklace", vendor: "Etsy Seller - Willow & Pine", url: "https://example.com/affiliate?product=rose-gold-urn", price: "$38", tags: ["jewelry", "keepsake", "necklace", "women", "gift"], image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop" },
  { id: "fingerprint-charm", title: "Fingerprint Ash Pendant", vendor: "MemorialCo", url: "https://example.com/affiliate?product=fingerprint-charm", price: "$129", tags: ["jewelry", "pendant", "custom", "personalized", "metal"], image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" },
  { id: "biodegradable-urn", title: "Biodegradable Scatter Urn - Wildflower", vendor: "EcoFarewell", url: "https://example.com/affiliate?product=eco-urn", price: "$59", tags: ["urn", "biodegradable", "eco", "environment", "outdoor"], image: "https://images.unsplash.com/photo-1507823690283-48d6bb9ca315?q=80&w=800&auto=format&fit=crop" },
  { id: "memorial-diamond", title: "Memorial Diamond Consultation", vendor: "Everbright", url: "https://example.com/affiliate?product=memorial-diamond", price: "Varies", tags: ["diamond", "service", "custom", "premium", "luxury"], image: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?q=80&w=800&auto=format&fit=crop" },
  { id: "urn-cloth-wrap", title: "Linen Wrap for Urn", vendor: "Handloom House", url: "https://example.com/affiliate?product=linen-wrap", price: "$24", tags: ["cloth", "urn", "textile", "handmade", "eco"], image: "https://images.unsplash.com/photo-1506629082955-511b1add0cf5?q=80&w=800&auto=format&fit=crop" },
  { id: "scattering-tube", title: "Scattering Tube for Ashes", vendor: "GentlePath", url: "https://example.com/affiliate?product=scattering-tube", price: "$35", tags: ["scattering", "tube", "eco", "paper", "lightweight"], image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop" },
  { id: "pet-urn", title: "Small Pet Urn - Ceramic", vendor: "Paws & Memory", url: "https://example.com/affiliate?product=pet-urn", price: "$42", tags: ["pet", "urn", "ceramic", "small", "memorial"], image: "https://images.unsplash.com/photo-1610641813637-d8587b6b1ecb?q=80&w=800&auto=format&fit=crop" }
];

const TAGS = [
  { key: "all", label: "All" },
  { key: "jewelry", label: "Jewelry" },
  { key: "urn", label: "Urns" },
  { key: "biodegradable", label: "Eco" },
  { key: "cloth", label: "Cloths" },
  { key: "service", label: "Services" },
  { key: "scattering", label: "Scattering" },
  { key: "pet", label: "Pet Memorials" },
  { key: "diamond", label: "Diamonds" }
];

export default function CrematoryAI() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [dq, setDq] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => setDq(q), 200);
    return () => clearTimeout(timeoutId);
  }, [q]);

  useEffect(() => {
    const id = "gf-allura-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Allura&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const results = useMemo(() => {
    const query = dq.trim().toLowerCase();
    return SAMPLE_ITEMS.filter((item) => {
      const matchesTag = tag === "all" || item.tags.includes(tag);
      if (!matchesTag) return false;
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.vendor.toLowerCase().includes(query) ||
        item.tags.join(" ").toLowerCase().includes(query)
      );
    });
  }, [dq, tag]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-neutral-700" style={{ fontFamily: "'Allura', cursive" }}>
            Crematory.ai
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Find what you need for a meaningful send off</h2>
            <p className="mt-3 text-[15px] text-neutral-700">
              Search cremation keepsakes, urns, scattering kits, clothing, and services. We compare trusted sellers to surface fair prices quickly so you can focus on what matters. Our search keeps things simple, fast, and memorable.
            </p>
          </div>
        </section>

        <section className="mb-8 text-center">
          <div className="flex flex-col items-center gap-4 w-full">
            <input
              aria-label="Search products"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search keepsakes, urns, scattering kits, services..."
              className="w-full md:w-2/3 lg:w-1/2 rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button
              type="button"
              onClick={() => { setQ(""); setTag("all"); }}
              className="px-4 py-2 rounded-xl border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
            >
              Clear
            </button>
          </div>
        </section>

        <section className="mb-6 flex flex-wrap justify-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTag(t.key)}
              aria-pressed={tag === t.key}
              className={`px-4 py-2 rounded-full text-sm border ${
                tag === t.key
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
              } focus:outline-none focus:ring-2 focus:ring-neutral-900`}
            >
              {t.label}
            </button>
          ))}
          <p className="w-full text-center mt-3 text-sm text-neutral-600">
            Results update live. Showing <span className="font-medium">{results.length}</span> item{results.length !== 1 ? "s" : ""}. Click a card to visit the seller.
          </p>
        </section>

        <section>
          {results.length === 0 ? (
            <div className="p-10 text-center text-neutral-600 bg-white rounded-2xl border border-neutral-200">
              No matches. Try a different term or tag.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-video overflow-hidden bg-neutral-100">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <div className="text-[15px] font-medium leading-snug">{item.title}</div>
                    <div className="mt-1 text-sm text-neutral-600">{item.vendor}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-[15px] font-semibold">{item.price}</div>
                      <div className="flex gap-2">
                        {item.tags.slice(0, 2).map((t) => (
                          <span key={t} className="px-2 py-1 rounded-full text-[11px] bg-neutral-100 text-neutral-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 text-sm text-neutral-700 max-w-3xl mx-auto">
            Crematory.ai is a simple directory of memorial products and services optimized for search engines and AI discovery. We use structured data and trusted affiliate links to help families find what they need faster.
          </p>
          <div className="mt-4 text-xs text-neutral-500">
            Affiliate disclosure: some links are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.
          </div>
        </section>

        <footer className="mt-12 py-8 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Crematory.ai
        </footer>
      </main>
    </div>
  );
}
