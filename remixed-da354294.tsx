import React, { useEffect, useRef, useState } from "react";

const LOGO_BASE64 = "data:image/png;base64,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5Pal3QAAABV0RVh0cGhvdG9zaG9wOkNvbG9yTW9kZQAzVgKzQAAAACZ0RVh0cGhvdG9zaG9wOklDQ1Byb2ZpbGUAc1JHQiBJRUM2MTk2Ni0yLjEcL2wLAAAAKHRFWHR4bXA6Q3JlYXRlRGF0ZQAyMDIyLTA4LTIxVDAwOjQxOjM0KzA1OjMwoSjhSQAAADJ0RVh0eG1wOkNyZWF0b3JUb29sAEFkb2JlIElsbHVzdHJhdG9yIDI0LjAgKE1hY2ludG9zaCkiUc2KAAAAKnRFWHR4bXA6TWV0YWRhdGFEYXRlADIwMjItMDgtMjFUMDA6NDE6MzgrMDU6MzDu0uS6AAAAKHRFWHR4bXA6TW9kaWZ5RGF0ZQAyMDIyLTA4LTIxVDAwOjQxOjM4KzA1OjMw0na3BAAAABt0RVh0eG1wTU06RGVyaXZlZEZyb20AcHJvb2Y6cGRmthUt5QAAAEt0RVh0eG1wTU06RG9jdW1lbnRJRABhZG9iZTpkb2NpZDpwaG90b3Nob3A6MThhNTQ3OGItNTE2Ny02ODRkLWE0MWItNWVkYWE4MzY1YTQ3cnSZZQAAAD10RVh0eG1wTU06SW5zdGFuY2VJRAB4bXAuaWlkOjRkYTcyODM4LTJlMGUtNDM3Zi1hMTE3LWRiNWFkYTk2MzJkMFbfDHUAAAA+dEVYdHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRAB1dWlkOkMxQkNDRTE4NzFCOERCMTE5OTMxOTBGQ0Q1MkI0RTlG4DeHtQAAAB50RVh0eG1wTU06UmVuZGl0aW9uQ2xhc3MAcHJvb2Y6cGRmhKbfiQAAAABJRU5ErkJggg==";

const Target = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>🎯</div>
);

const Menu = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>☰</div>
);

const X = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>✕</div>
);

const FileText = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>📄</div>
);

const Layout = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>▣</div>
);

const TrendingUp = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>📈</div>
);

const Store = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>🏪</div>
);

const BarChart2 = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>📊</div>
);

const ChevronDown = ({ className = "", style = {} }) => (
  <div className={className} style={style}>⌄</div>
);

const ChevronLeft = ({ style = {} }) => (
  <div style={style}>‹</div>
);

const ChevronRight = ({ style = {} }) => (
  <div style={style}>›</div>
);

const CheckCircle2 = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>✓</div>
);

const MapPin = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>📍</div>
);

const Mail = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>✉️</div>
);

const Globe = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>🌐</div>
);

const Clock3 = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>🕒</div>
);

const Linkedin = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>in</div>
);

const Instagram = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>◎</div>
);

const ArrowRight = ({ size = 24, style = {} }) => (
  <div style={{ fontSize: size, ...style }}>→</div>
);

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const [counts, setCounts] = useState({
    brands: 0,
    revenue: 0,
    roas: 0,
  });

  const statsRef = useRef(null);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderShadow(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateValue("brands", 50, 1200);
          animateValue("revenue", 2, 1400);
          animateValue("roas", 4.2, 1500);
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animateValue = (key, end, duration) => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCounts((prev) => ({
        ...prev,
        [key]: key === "roas" ? Number(start.toFixed(1)) : Math.floor(start),
      }));
    }, 16);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenu(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    const form = e.target;
    const data = {
      name: form.fullName.value,
      email: form.email.value,
      store: form.store.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/pavanganesh@optimtarget.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "New OptimTarget Inquiry from " + data.name,
          name: data.name,
          email: data.email,
          amazon_store_url: data.store,
          monthly_ad_budget: data.budget,
          message: data.message,
          _captcha: "false",
        }),
      });

      const result = await response.json();
      if (result.success === "true" || response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const services = [
    {
      icon: <Target size={24} />,
      title: "Amazon PPC Management",
      description:
        "Precision-targeted Sponsored Products, Sponsored Brands, and Sponsored Display campaigns. We eliminate wasted spend and scale what converts.",
    },
    {
      icon: <FileText size={24} />,
      title: "Listing Optimization",
      description:
        "Keyword-rich titles, bullet points, and product descriptions that rank higher on Amazon search and convert browsers into buyers.",
    },
    {
      icon: <Layout size={24} />,
      title: "A+ Content & EBC",
      description:
        "Enhanced Brand Content that tells your product story, builds trust, and measurably improves conversion rates and return rates.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Amazon SEO",
      description:
        "Organic ranking strategies built around high-intent keyword research, indexing health, and backend optimization.",
    },
    {
      icon: <Store size={24} />,
      title: "Brand Storefront Design",
      description:
        "Custom Amazon Brand Storefronts that showcase your catalog, drive cross-sell, and turn traffic into loyal customers.",
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Account Health & Reporting",
      description:
        "Weekly performance reports, account health monitoring, and transparent metrics — you always know what's happening and why.",
    },
  ];

  const process = [
    {
      title: "Free Account Audit",
      desc: "We do a deep-dive into your current listings, ad performance, and competitor landscape — completely free, no strings attached.",
    },
    {
      title: "Custom Strategy",
      desc: "We build a focused growth roadmap tailored to your category, budget, and goals — not a copy-paste template.",
    },
    {
      title: "Hands-On Execution",
      desc: "We implement, manage, and optimize everything daily — PPC campaigns, listing copy, content, and more.",
    },
    {
      title: "Weekly Reporting",
      desc: "You get clear, jargon-free reports every week. We show you exactly what changed, what we did, and what's next.",
    },
  ];

  const testimonials = [
    {
      quote:
        "OptimTarget completely turned around our PPC. We were bleeding money on ads with a 60% ACoS. Within two months, they got us to 21% and our sales went up, not down. Genuinely impressed.",
      author: "Sarah M.",
      role: "Supplement Brand Owner",
    },
    {
      quote:
        "As a first-time Amazon seller, I had no idea where to start. The team walked me through everything, launched my product properly, and I hit my first $20K month within 60 days. Worth every penny.",
      author: "James R.",
      role: "Private Label Seller",
    },
    {
      quote:
        "What I appreciated most was the transparency. No fluff, no excuses — just weekly reports that actually explained what was happening. They treated my small business like it mattered.",
      author: "Priya K.",
      role: "Home Décor Seller",
    },
    {
      quote:
        "We had tried two other agencies before OptimTarget. The difference is they actually care about results and don't just set campaigns and forget. Our revenue is up 3x and ROAS is consistently above 4.",
      author: "Mark D.",
      role: "Electronics Reseller",
    },
  ];

  const faqs = [
    {
      q: "Do you work with brand new sellers or only established ones?",
      a: "Both. We help new sellers launch properly and established sellers optimize and scale. The strategies differ, but the commitment is the same.",
    },
    {
      q: "How quickly can I expect to see results?",
      a: "Most clients see meaningful improvements in ACoS and CTR within the first 30 days. Significant revenue and ranking improvements typically show by day 60–90.",
    },
    {
      q: "Will I keep access to my Amazon Seller Central account?",
      a: "Always. You own your account 100%. We only work with the access you grant us and never hold your data or accounts hostage.",
    },
    {
      q: "What's the minimum ad budget you work with?",
      a: "We recommend a minimum of $1,500–$2,000/month in ad spend to run effective campaigns. We'll be honest with you if the budget isn't enough to get meaningful results.",
    },
    {
      q: "Do you offer a free audit before I commit?",
      a: "Yes — always. We do a complimentary account review and give you a real assessment with no obligation. We'd rather earn your trust than pressure you into signing up.",
    },
    {
      q: "How do you report results?",
      a: "You get a weekly performance report covering ROAS, ACoS, revenue, impressions, clicks, and ranking changes — with plain-English commentary, not just raw numbers.",
    },
    {
      q: "Are you a big agency or a small team?",
      a: "We're a specialized freelance team — which means you get senior-level attention on your account, not a junior associate managing 50 clients. Small by design. Sharp by necessity.",
    },
  ];

  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif", scrollBehavior: "smooth" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee { animation: marquee 25s linear infinite; }
      `}</style>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerShadow ? "shadow-lg" : ""}`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <img src={LOGO_BASE64} alt="OptimTarget" style={{ height: 40, width: "auto" }} />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {[
              ["Services", "services"],
              ["Case Studies", "case-studies"],
              ["Why Us", "why-us"],
              ["Pricing", "pricing"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="transition hover:opacity-70"
                style={{ color: "#0D2D6B" }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full text-sm font-semibold transition"
              style={{ backgroundColor: "#0D2D6B", color: "#FFFFFF" }}
            >
              Get Free Audit
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? (
              <X size={28} style={{ color: "#0D2D6B" }} />
            ) : (
              <Menu size={28} style={{ color: "#0D2D6B" }} />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden px-6 pb-6 flex flex-col gap-5 border-t" style={{ borderColor: "#E5E7EB" }}>
            {[
              ["Services", "services"],
              ["Case Studies", "case-studies"],
              ["Why Us", "why-us"],
              ["Pricing", "pricing"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left pt-4 font-medium"
                style={{ color: "#0D2D6B" }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={scrollToContact}
              className="mt-3 px-5 py-3 rounded-full font-semibold"
              style={{ backgroundColor: "#0D2D6B", color: "#FFFFFF" }}
            >
              Get Free Audit
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="pt-40 pb-24 px-6"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(0,229,160,0.08), transparent 30%), #091D45",
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="uppercase tracking-[3px] text-sm mb-6 font-semibold"
              style={{ color: "#00E5A0" }}
            >
              Amazon Marketing Specialists
            </div>

            <h1
              className="font-extrabold leading-tight text-white text-5xl lg:text-6xl"
              style={{ lineHeight: 1.15 }}
            >
              Turn Your Amazon Listings Into Revenue-Generating Machines.
            </h1>

            <p className="mt-8 text-lg leading-8 max-w-2xl" style={{ color: "#CBD5E1" }}>
              We help independent sellers and growing brands maximize visibility, slash wasted ad
              spend, and build long-term profitability on Amazon — with hands-on expert management.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-xl font-bold text-lg transition"
                style={{ backgroundColor: "#00E5A0", color: "#091D45" }}
              >
                Get Your Free Audit
              </button>

              <button
                onClick={() => scrollToSection("case-studies")}
                className="px-8 py-4 rounded-xl border border-white text-white font-semibold text-lg"
              >
                See Our Results →
              </button>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
              <div>
                <div className="text-4xl font-extrabold text-white">{counts.brands}+</div>
                <div className="mt-2" style={{ color: "#00E5A0" }}>Brands Helped</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white">${counts.revenue}M+</div>
                <div className="mt-2" style={{ color: "#00E5A0" }}>Client Revenue Generated</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white">{counts.roas}x</div>
                <div className="mt-2" style={{ color: "#00E5A0" }}>Average ROAS Achieved</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="w-full max-w-2xl rounded-3xl p-6 shadow-2xl"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div
                    className="text-sm font-semibold uppercase tracking-[2px]"
                    style={{ color: "#00E5A0" }}
                  >
                    Amazon Sales Overview
                  </div>
                  <h3 className="text-2xl font-bold mt-2" style={{ color: "#0D2D6B" }}>
                    Revenue Growth Dashboard
                  </h3>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: "rgba(0,229,160,0.12)", color: "#00C48A" }}
                >
                  +38.4% This Month
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ backgroundColor: "#F7F9FC" }}>
                <div className="flex items-end justify-between h-72 gap-3">
                  {[35, 48, 52, 66, 74, 88, 110].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-2xl relative"
                      style={{
                        height: `${height}%`,
                        background: "linear-gradient(to top, #00C48A, #00E5A0)",
                      }}
                    >
                      <div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold"
                        style={{ color: "#0D2D6B" }}
                      >
                        ${idx * 8 + 12}K
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 mt-4 text-center text-sm">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => (
                    <div key={month} style={{ color: "#6B7280" }}>{month}</div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "Ad Spend", value: "$12.4K", growth: "+14%" },
                  { label: "Revenue", value: "$84.7K", growth: "+38%" },
                  { label: "ROAS", value: "4.2x", growth: "+22%" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl p-4" style={{ backgroundColor: "#F7F9FC" }}>
                    <div className="text-sm font-medium" style={{ color: "#6B7280" }}>{item.label}</div>
                    <div className="text-2xl font-bold mt-2" style={{ color: "#0D2D6B" }}>{item.value}</div>
                    <div className="text-sm font-semibold mt-2" style={{ color: "#00C48A" }}>{item.growth}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section
        className="overflow-hidden border-y py-5"
        style={{ backgroundColor: "#F7F9FC", borderColor: "#E5E7EB" }}
      >
        <div className="flex whitespace-nowrap marquee">
          <div className="flex gap-10 pr-10 text-sm font-semibold" style={{ color: "#0D2D6B" }}>
            {Array(2)
              .fill(
                "Amazon PPC · Listing Optimization · A+ Content · Brand Storefront · DSP Advertising · Keyword Research · Competitor Analysis · Inventory Management · Review Strategy · Sponsored Brands · Product Launch · FBA Consulting ·"
              )
              .map((item, i) => (
                <span key={i}>{item}</span>
              ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            What We Do
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            Full-Spectrum Amazon Growth Services
          </h2>
          <p className="mt-6 max-w-3xl text-lg" style={{ color: "#6B7280" }}>
            We handle every lever that drives growth on Amazon — so you can focus on your business.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 transition hover:-translate-y-1"
                style={{ border: "1px solid rgba(13,45,107,0.15)", backgroundColor: "#FFFFFF" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,229,160,0.12)", color: "#00E5A0" }}
                >
                  {service.icon}
                </div>
                <h3 className="mt-6 text-2xl font-semibold" style={{ color: "#0D2D6B" }}>
                  {service.title}
                </h3>
                <p className="mt-4 leading-7" style={{ color: "#6B7280" }}>
                  {service.description}
                </p>
                {/* "Learn More" button removed */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 px-6" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="max-w-7xl mx-auto">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Our Process
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            Simple. Transparent. Results-Driven.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 relative">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: "#0D2D6B", color: "#FFFFFF" }}
                >
                  {index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold" style={{ color: "#0D2D6B" }}>
                  {step.title}
                </h3>
                <p className="mt-4 leading-7" style={{ color: "#6B7280" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="case-studies" className="py-28 px-6" style={{ backgroundColor: "#091D45" }}>
        <div className="max-w-7xl mx-auto">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Case Studies
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
            Real Results for Real Sellers
          </h2>
          <p className="mt-6 text-lg" style={{ color: "#94A3B8" }}>
            Names kept private. Numbers are real.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                tag: "Health & Wellness | PPC + Listing",
                stats: ["ACoS ↓ 54% → 19%", "Revenue +280%", "90 Days"],
                challenge:
                  "Seller was running broad-match-only campaigns with no negative keywords and outdated listing copy.",
                result:
                  "After restructuring campaigns and rewriting listings with high-intent keywords, ACoS dropped to 19% and monthly revenue nearly tripled in 3 months.",
              },
              {
                tag: "Home & Kitchen | Product Launch",
                stats: ["600+ Units Sold", "$58K Revenue", "45 Days"],
                challenge:
                  "Brand-new product with no reviews, no ranking, and a limited launch budget.",
                result:
                  "A structured launch strategy combining Vine reviews, aggressive Sponsored Products, and a keyword-seeded listing drove 600+ sales and a top-20 BSR in 45 days.",
              },
              {
                tag: "Sports & Outdoors | Full Account",
                stats: ["ROAS 5.1x", "Organic +190%", "ACoS 22%"],
                challenge:
                  "Established seller spending heavily on ads with declining organic rank and stagnant revenue.",
                result:
                  "A complete account restructure — new ad architecture, A+ content, and backend SEO — reversed the decline and grew organic sessions by 190% in 60 days.",
              },
            ].map((study, i) => (
              <div
                key={i}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "#0D2D6B",
                  border: "1px solid rgba(0,229,160,0.3)",
                }}
              >
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: "rgba(0,229,160,0.1)", color: "#00E5A0" }}
                >
                  {study.tag}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {study.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl p-4 text-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                      <div className="text-sm font-bold" style={{ color: "#00E5A0" }}>{stat}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="text-white font-semibold mb-3">Challenge</div>
                  <p style={{ color: "#CBD5E1" }}>{study.challenge}</p>
                  <div className="text-white font-semibold mt-6 mb-3">Result</div>
                  <p style={{ color: "#CBD5E1" }}>{study.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Testimonials
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            What Our Clients Are Saying
          </h2>

          <div className="mt-16 relative">
            <div className="text-7xl font-bold" style={{ color: "#00E5A0" }}>"</div>
            <p className="text-2xl italic leading-10 mt-6" style={{ color: "#0D2D6B" }}>
              {testimonials[testimonialIndex].quote}
            </p>
            <div className="mt-8">
              <div className="font-bold text-lg" style={{ color: "#0D2D6B" }}>
                — {testimonials[testimonialIndex].author}
              </div>
              <div className="mt-2" style={{ color: "#6B7280" }}>
                {testimonials[testimonialIndex].role} ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() =>
                  setTestimonialIndex(
                    testimonialIndex === 0 ? testimonials.length - 1 : testimonialIndex - 1
                  )
                }
                className="w-12 h-12 rounded-full flex items-center justify-center border"
                style={{ borderColor: "#E5E7EB" }}
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: idx === testimonialIndex ? "#00E5A0" : "#D1D5DB",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setTestimonialIndex(
                    testimonialIndex === testimonials.length - 1 ? 0 : testimonialIndex + 1
                  )
                }
                className="w-12 h-12 rounded-full flex items-center justify-center border"
                style={{ borderColor: "#E5E7EB" }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          {/* Google/Upwork ratings removed */}
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-28 px-6" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="max-w-7xl mx-auto">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Why Us
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            Why Smart Sellers Choose OptimTarget
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-16">
            <div className="space-y-10">
              {[
                {
                  title: "Amazon-Exclusive Focus",
                  desc: "We only work on Amazon. No distractions, no generalist advice — just deep, current platform expertise that gets results.",
                },
                {
                  title: "Senior-Level Attention on Every Account",
                  desc: "You work directly with experienced specialists, not account coordinators or junior staff. Your business gets expert eyes every single day.",
                },
                {
                  title: "No Lock-In Contracts",
                  desc: "We operate month-to-month because we believe in earning your business every single month — not locking you in.",
                },
                {
                  title: "Full Transparency, Always",
                  desc: "You own all your accounts and all your data. We provide clear weekly reporting so you always understand exactly what's happening.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5">
                  <div
                    className="min-w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: "#0D2D6B", color: "#00E5A0" }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold" style={{ color: "#0D2D6B" }}>
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7" style={{ color: "#6B7280" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="space-y-6">
                {[
                  "Higher organic Amazon search rankings",
                  "Lower ACoS and improved ROAS month-over-month",
                  "Listings that convert, not just rank",
                  "A team that communicates proactively — not just when things go wrong",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 size={24} style={{ color: "#00E5A0" }} />
                    <div className="text-lg" style={{ color: "#0D2D6B" }}>{item}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-14">
                {["Amazon Ads Certified", "Helium 10 Expert", "100% Amazon Focused"].map(
                  (badge, idx) => (
                    <div
                      key={idx}
                      className="px-5 py-3 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: "#FFFFFF", color: "#0D2D6B" }}
                    >
                      {badge}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — replaced with custom section */}
      <section id="pricing" className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Pricing
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            Tailored to Your Business. Always.
          </h2>

          <div
            className="mt-12 rounded-3xl p-10 md:p-16 text-left"
            style={{
              background: "linear-gradient(135deg, #091D45 0%, #0D2D6B 100%)",
              border: "1px solid rgba(0,229,160,0.25)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{ backgroundColor: "rgba(0,229,160,0.12)", color: "#00E5A0" }}
            >
              ✦ No Fixed Packages
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Every engagement we take on is built around your specific goals, category, and stage of growth.
            </h3>

            <p className="mt-6 text-lg leading-8" style={{ color: "#CBD5E1" }}>
              We don't believe in one-size-fits-all pricing. Whether you're a new seller looking to
              launch your first product or an established brand managing a large catalog — your
              strategy, scope of work, and investment will be different. That's intentional.
            </p>

            <p className="mt-4 text-lg leading-8" style={{ color: "#CBD5E1" }}>
              After a brief conversation about your current situation, goals, and ad budget, we'll
              put together a focused proposal that reflects exactly what you need — nothing more,
              nothing less.
            </p>

            <div
              className="mt-10 grid md:grid-cols-3 gap-6"
            >
              {[
                { label: "New Sellers", desc: "Product launch, listing setup, and foundational PPC to build momentum fast." },
                { label: "Growing Brands", desc: "Full PPC management, SEO, and A+ content to scale revenue profitably." },
                { label: "Established Sellers", desc: "Account-wide optimization, storefront design, and competitive intelligence." },
              ].map((tier, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}
                >
                  <div className="font-bold text-lg" style={{ color: "#00E5A0" }}>{tier.label}</div>
                  <p className="mt-3 text-sm leading-6" style={{ color: "#CBD5E1" }}>{tier.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-xl font-bold text-lg transition hover:opacity-90"
                style={{ backgroundColor: "#00E5A0", color: "#091D45" }}
              >
                Let's Talk — Get a Custom Quote
              </button>
              <div className="text-sm" style={{ color: "#94A3B8" }}>
                No obligations. We'll be upfront about what fits your budget.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="uppercase tracking-[3px] text-sm font-semibold text-center"
            style={{ color: "#00E5A0" }}
          >
            FAQ
          </div>
          <h2
            className="mt-5 text-4xl lg:text-5xl font-bold text-center"
            style={{ color: "#0D2D6B" }}
          >
            Questions We Get All the Time
          </h2>

          <div className="space-y-5 mt-16">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-lg font-semibold" style={{ color: "#0D2D6B" }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                    style={{ color: "#0D2D6B" }}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-8">
                    <p className="leading-8" style={{ color: "#6B7280" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-28 px-6"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,160,0.1), transparent 35%), #091D45",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Stop Guessing and Start Growing?
          </h2>
          <p className="mt-8 text-lg leading-8" style={{ color: "#CBD5E1" }}>
            Book your free Amazon account audit. We'll find the gaps, the opportunities, and build
            your custom roadmap — in 48 hours or less.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-xl font-bold text-lg"
              style={{ backgroundColor: "#00E5A0", color: "#091D45" }}
            >
              Claim Your Free Audit
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-xl border border-white text-white font-semibold text-lg"
            >
              Schedule a Discovery Call
            </button>
          </div>
          <div className="mt-8 text-sm" style={{ color: "#CBD5E1" }}>
            🔒 No contracts. No credit card. Results-focused, always.
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="uppercase tracking-[3px] text-sm font-semibold" style={{ color: "#00E5A0" }}>
            Get In Touch
          </div>
          <h2 className="mt-5 text-4xl lg:text-5xl font-bold" style={{ color: "#0D2D6B" }}>
            Let's Talk About Your Amazon Business
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-16">
            <div>
              <div className="space-y-8">
                {[
                  { icon: <MapPin size={22} />, label: "Location", value: "Remote — Serving Sellers Worldwide" },
                  { icon: <Mail size={22} />, label: "Email", value: "contact@optimtarget.com" },
                  { icon: <Globe size={22} />, label: "Website", value: "www.optimtarget.com" },
                  { icon: <Clock3 size={22} />, label: "Working Hours", value: "Monday–Saturday, 9 AM – 6 PM" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div style={{ color: "#00E5A0" }}>{item.icon}</div>
                    <div>
                      <div className="font-semibold" style={{ color: "#0D2D6B" }}>{item.label}</div>
                      <div className="mt-1" style={{ color: "#6B7280" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-lg leading-8" style={{ color: "#6B7280" }}>
                Whether you're just getting started or already selling but not growing the way you
                want — we'd love to hear your situation. No pitch, just an honest conversation.
              </p>
            </div>

            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#F7F9FC", border: "1px solid #E5E7EB" }}
            >
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                  <div className="text-5xl">✅</div>
                  <h3 className="text-2xl font-bold" style={{ color: "#0D2D6B" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "#6B7280" }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="mt-4 px-6 py-3 rounded-xl font-semibold"
                    style={{ backgroundColor: "#00E5A0", color: "#091D45" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="grid gap-5">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      required
                      className="px-5 py-4 rounded-xl outline-none w-full"
                      style={{ border: "1px solid #D1D5DB", backgroundColor: "#FFFFFF" }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="px-5 py-4 rounded-xl outline-none w-full"
                      style={{ border: "1px solid #D1D5DB", backgroundColor: "#FFFFFF" }}
                    />
                    <input
                      type="text"
                      name="store"
                      placeholder="Amazon Store URL"
                      className="px-5 py-4 rounded-xl outline-none w-full"
                      style={{ border: "1px solid #D1D5DB", backgroundColor: "#FFFFFF" }}
                    />
                    <select
                      name="budget"
                      className="px-5 py-4 rounded-xl outline-none w-full"
                      style={{ border: "1px solid #D1D5DB", backgroundColor: "#FFFFFF" }}
                    >
                      <option value="">Monthly Ad Budget</option>
                      <option>Under $2K</option>
                      <option>$2K–$8K</option>
                      <option>$8K–$30K</option>
                      <option>$30K+</option>
                    </select>
                    <textarea
                      rows="4"
                      name="message"
                      placeholder="How can we help?"
                      className="px-5 py-4 rounded-xl outline-none w-full"
                      style={{ border: "1px solid #D1D5DB", backgroundColor: "#FFFFFF" }}
                    />

                    {formStatus === "error" && (
                      <div
                        className="px-5 py-3 rounded-xl text-sm font-medium"
                        style={{ backgroundColor: "#FEF2F2", color: "#DC2626" }}
                      >
                        Something went wrong. Please try again or email us directly at contact@optimtarget.com
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full py-4 rounded-xl font-bold text-lg transition"
                      style={{
                        backgroundColor: formStatus === "sending" ? "#A7F3D0" : "#00E5A0",
                        color: "#091D45",
                        cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                      }}
                    >
                      {formStatus === "sending" ? "Sending..." : "Send Message →"}
                    </button>

                    <div className="text-center text-sm" style={{ color: "#6B7280" }}>
                      Typical response time: within 24 hours
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-20 pb-10 px-6" style={{ backgroundColor: "#091D45" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <img src={LOGO_BASE64} alt="OptimTarget" style={{ height: 44, width: "auto", filter: "brightness(0) invert(1)" }} />
          </div>
          <p className="mt-5" style={{ color: "#CBD5E1" }}>
            Precision Amazon Marketing. Built for Sellers Who Mean Business.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            <div>
              <h4 className="font-bold text-white mb-5">Company</h4>
              <div className="space-y-3" style={{ color: "#CBD5E1" }}>
                {["Home", "Services", "Case Studies", "Why Us", "Pricing", "FAQ"].map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5">Services</h4>
              <div className="space-y-3" style={{ color: "#CBD5E1" }}>
                {["Amazon PPC", "Listing Optimization", "A+ Content", "Amazon SEO", "Brand Storefront", "Account Management"].map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5">Contact</h4>
              <div className="space-y-3" style={{ color: "#CBD5E1" }}>
                <div>contact@optimtarget.com</div>
                <div>www.optimtarget.com</div>
                <div>Mon–Sat 9AM–6PM</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5">Follow Us</h4>
              <div className="flex gap-5">
                <Linkedin size={22} style={{ color: "#00E5A0" }} />
                <Instagram size={22} style={{ color: "#00E5A0" }} />
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#00E5A0" strokeWidth="2">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
          >
            <div>© 2025 OptimTarget. All Rights Reserved.</div>
            <div className="flex gap-6">
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
