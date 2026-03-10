import { useState } from "react";
import logo from "./assets/logo.png";

const GIGS = [
  { id: 1, title: "Design Social Media Posts", company: "Kape ni Mang Jose", category: "Design", pay: "₱500", skills: ["Canva", "Photoshop"], deadline: "3 days", status: "Open" },
  { id: 2, title: "Fix WordPress Website Bug", company: "LagTech Solutions", category: "Tech", pay: "₱800", skills: ["HTML", "CSS", "WordPress"], deadline: "2 days", status: "Open" },
  { id: 3, title: "Write Product Descriptions", company: "CabuyaoMart", category: "Writing", pay: "₱300", skills: ["Copywriting", "SEO"], deadline: "5 days", status: "Open" },
  { id: 4, title: "Data Entry & Excel Reports", company: "Laguna Fabricators Inc.", category: "Admin", pay: "₱400", skills: ["Excel", "Google Sheets"], deadline: "4 days", status: "Open" },
  { id: 5, title: "Setup Google My Business", company: "Rizal St. Bakery", category: "Marketing", pay: "₱600", skills: ["Google Ads", "SEO"], deadline: "1 day", status: "Open" },
  { id: 6, title: "Create Simple Inventory App", company: "Cabuyao Hardware", category: "Tech", pay: "₱1,200", skills: ["Python", "Google Sheets"], deadline: "7 days", status: "Open" },
];

const CATEGORIES = ["All", "Design", "Tech", "Writing", "Admin", "Marketing"];

const categoryColors = {
  Design: "#3B82F6",
  Tech: "#8B5CF6",
  Writing: "#10B981",
  Admin: "#F59E0B",
  Marketing: "#EF4444",
};

export default function SkillSyncMVP() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedGig, setAppliedGig] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = GIGS.filter((g) => {
    const matchCat = selectedCategory === "All" || g.category === selectedCategory;
    const matchSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleApply = (gig) => {
    setAppliedGig(gig);
    setShowModal(true);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#F8FAFC", minHeight: "100vh", color: "#1E293B" }}>
      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={logo} alt="Skill-Sync" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#1E293B" }}>Skill-Sync</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["browse", "profile", "post"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13,
                background: activeTab === tab ? "#F97316" : "transparent",
                color: activeTab === tab ? "#fff" : "#64748B",
                fontWeight: activeTab === tab ? 600 : 400,
              }}
            >
              {tab === "browse" ? "Browse Gigs" : tab === "profile" ? "My Profile" : "Post a Gig"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>
            BA
          </div>
          <span style={{ fontSize: 13, color: "#475569" }}>Benedict Abania</span>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {activeTab === "browse" && (
          <>
            {/* Stats Bar */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {[["Active Gigs", "6"], ["MSMEs", "42"], ["Students", "180"], ["Completed", "312"]].map(([label, val]) => (
                <div key={label} style={{ flex: 1, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#F97316" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <input
                placeholder="Search gigs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: "8px 14px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }}
              />
              <button style={{ padding: "8px 18px", background: "#F97316", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Search
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "5px 14px", border: `1px solid ${selectedCategory === cat ? "#F97316" : "#E2E8F0"}`,
                    borderRadius: 20, fontSize: 12, cursor: "pointer",
                    background: selectedCategory === cat ? "#FFF7ED" : "#fff",
                    color: selectedCategory === cat ? "#F97316" : "#64748B",
                    fontWeight: selectedCategory === cat ? 600 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gig List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((gig) => (
                <div key={gig.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{gig.title}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: `${categoryColors[gig.category]}18`, color: categoryColors[gig.category], fontWeight: 600 }}>
                        {gig.category}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6 }}>{gig.company} · Due in {gig.deadline}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {gig.skills.map((s) => (
                        <span key={s} style={{ fontSize: 11, padding: "2px 8px", background: "#F1F5F9", color: "#475569", borderRadius: 4 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", marginLeft: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1E293B", marginBottom: 8 }}>{gig.pay}</div>
                    <button
                      onClick={() => handleApply(gig)}
                      style={{ padding: "6px 16px", background: "#F97316", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "profile" && (
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 700 }}>BA</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Benedict Abania</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>BS Computer Science · University of Cabuyao</div>
                <div style={{ fontSize: 12, color: "#10B981", marginTop: 2 }}>● Available for gigs</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["Gigs Completed", "7"], ["Total Earned", "₱4,200"], ["Portfolio Score", "82%"], ["Skills Verified", "4"]].map(([label, val]) => (
                <div key={label} style={{ padding: 14, background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#F97316" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Skills</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["React", "Figma", "Canva", "Python", "Copywriting"].map((s) => (
                  <span key={s} style={{ padding: "4px 12px", background: "#FFF7ED", color: "#F97316", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid #FDBA74" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "post" && (
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 24, maxWidth: 560 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Post a Gig</div>
            <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>Connect with skilled students in Cabuyao</div>
            {[["Gig Title", "e.g. Design our store banner"], ["Company Name", "Your business name"], ["Budget (₱)", "e.g. 500"]].map(([label, ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>{label}</label>
                <input placeholder={ph} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>Category</label>
              <select style={{ width: "100%", padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, outline: "none" }}>
                {["Design", "Tech", "Writing", "Admin", "Marketing"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>Description</label>
              <textarea rows={3} placeholder="Describe what needs to be done..." style={{ width: "100%", padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <button style={{ width: "100%", padding: "10px", background: "#F97316", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Post Gig
            </button>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showModal && appliedGig && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, maxWidth: 400, width: "90%" }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Apply to Gig</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>{appliedGig.title} · {appliedGig.company}</div>
            <div style={{ background: "#F8FAFC", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13 }}>
              <div>💰 Pay: <strong>{appliedGig.pay}</strong></div>
              <div>⏰ Deadline: <strong>{appliedGig.deadline}</strong></div>
            </div>
            <textarea rows={3} placeholder="Write a short message to the employer..." style={{ width: "100%", padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, outline: "none", marginBottom: 14, boxSizing: "border-box", resize: "none" }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "9px", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "9px", background: "#F97316", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Submit Application</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}