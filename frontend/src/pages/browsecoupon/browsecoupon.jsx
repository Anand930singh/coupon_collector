import "./browsecoupon.css"
import { useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
  Coins,
  ChevronDown,
  RefreshCw,
  ShoppingBag,
  Utensils,
  Smartphone,
  CreditCard,
  Tag,
} from "lucide-react"

const platforms = ["All Platforms", "Amazon", "Swiggy", "Zomato", "PhonePe", "GPay", "Myntra", "Flipkart"]
const categories = ["All Categories", "Food", "Shopping", "Travel", "Recharge", "Entertainment", "Subscription"]
const discountTypes = ["All Types", "Flat Discount", "Percentage", "Cashback", "BOGO"]
const sortOptions = ["Latest", "Expiring Soon", "Most Popular"]

const dummyCoupons = [
  {
    id: 1,
    platform: "Swiggy",
    title: "Flat ₹120 OFF on Orders Above ₹499",
    category: "Food",
    type: "Flat Discount",
    verified: true,
    successRate: 94,
    redeemCost: 10,
    validity: "Expires in 2 days",
    usersRedeemed: 24,
  },
  {
    id: 2,
    platform: "Amazon",
    title: "10% Cashback on Electronics Orders",
    category: "Shopping",
    type: "Cashback",
    verified: true,
    successRate: 89,
    redeemCost: 15,
    validity: "Valid till 15 Feb 2026",
    usersRedeemed: 156,
  },
  {
    id: 3,
    platform: "PhonePe",
    title: "₹50 Cashback on First Recharge",
    category: "Recharge",
    type: "Cashback",
    verified: true,
    successRate: 97,
    redeemCost: 5,
    validity: "Expires in 5 days",
    usersRedeemed: 342,
  },
  {
    id: 4,
    platform: "Zomato",
    title: "Buy 1 Get 1 Free on Selected Restaurants",
    category: "Food",
    type: "BOGO",
    verified: true,
    successRate: 91,
    redeemCost: 20,
    validity: "Valid till 28 Jan 2026",
    usersRedeemed: 89,
  },
  {
    id: 5,
    platform: "GPay",
    title: "₹100 Cashback on Bill Payments Above ₹500",
    category: "Recharge",
    type: "Cashback",
    verified: false,
    successRate: 85,
    redeemCost: 10,
    validity: "Expires in 7 days",
    usersRedeemed: 67,
  },
  {
    id: 6,
    platform: "Flipkart",
    title: "20% OFF on Fashion & Apparel",
    category: "Shopping",
    type: "Percentage",
    verified: true,
    successRate: 92,
    redeemCost: 12,
    validity: "Valid till 10 Feb 2026",
    usersRedeemed: 203,
  },
  {
    id: 7,
    platform: "Myntra",
    title: "Flat ₹300 OFF on Orders Above ₹1499",
    category: "Shopping",
    type: "Flat Discount",
    verified: true,
    successRate: 88,
    redeemCost: 15,
    validity: "Expires in 4 days",
    usersRedeemed: 178,
  },
  {
    id: 8,
    platform: "Amazon",
    title: "15% OFF on Prime Subscription",
    category: "Subscription",
    type: "Percentage",
    verified: true,
    successRate: 96,
    redeemCost: 25,
    validity: "Valid till 20 Feb 2026",
    usersRedeemed: 412,
  },
]

const platformIcons = {
  Swiggy: Utensils,
  Amazon: ShoppingBag,
  PhonePe: Smartphone,
  Zomato: Utensils,
  GPay: CreditCard,
  Flipkart: ShoppingBag,
  Myntra: Tag,
}

const categoryColors = {
  Food: "category-food",
  Shopping: "category-shopping",
  Travel: "category-travel",
  Recharge: "category-recharge",
  Entertainment: "category-entertainment",
  Subscription: "category-subscription",
}

export function BrowseCoupons() {
  const [filters, setFilters] = useState({
    platform: "All Platforms",
    category: "All Categories",
    discountType: "All Types",
    sortBy: "Latest",
    verifiedOnly: false,
    searchQuery: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      platform: "All Platforms",
      category: "All Categories",
      discountType: "All Types",
      sortBy: "Latest",
      verifiedOnly: false,
      searchQuery: "",
    })
  }

  const filteredCoupons = dummyCoupons.filter((coupon) => {
    if (filters.platform !== "All Platforms" && coupon.platform !== filters.platform) return false
    if (filters.category !== "All Categories" && coupon.category !== filters.category) return false
    if (filters.discountType !== "All Types" && coupon.type !== filters.discountType) return false
    if (filters.verifiedOnly && !coupon.verified) return false
    if (
      filters.searchQuery &&
      !coupon.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !coupon.platform.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="browse-page">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>Browse Verified Discount Coupons & Offers</h1>
            <p>
              Discover verified coupons shared by real users. Earn reward points by listing coupons and redeem the ones
              you need.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-card">
              <div className="filters-top">
                <div className="search-bar">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search coupons or platforms..."
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                  />
                </div>
                <button className="btn btn-secondary btn-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={18} />
                  Filters
                  <ChevronDown size={16} className={showFilters ? "rotated" : ""} />
                </button>
              </div>

              <div className={`filters-grid ${showFilters ? "filters-open" : ""}`}>
                <div className="filter-group">
                  <label>Platform</label>
                  <select value={filters.platform} onChange={(e) => handleFilterChange("platform", e.target.value)}>
                    {platforms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Category</label>
                  <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Discount Type</label>
                  <select
                    value={filters.discountType}
                    onChange={(e) => handleFilterChange("discountType", e.target.value)}
                  >
                    {discountTypes.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Sort By</label>
                  <select value={filters.sortBy} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
                    {sortOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group filter-toggle-group">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={filters.verifiedOnly}
                      onChange={(e) => handleFilterChange("verifiedOnly", e.target.checked)}
                    />
                    <span className="toggle-switch"></span>
                    Verified Only
                  </label>
                </div>

                <button className="btn btn-secondary btn-reset" onClick={resetFilters}>
                  <RefreshCw size={16} />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Coupon Grid */}
        <section className="coupons-section">
          <div className="container">
            {filteredCoupons.length > 0 ? (
              <div className="coupons-grid">
                {filteredCoupons.map((coupon) => {
                  const PlatformIcon = platformIcons[coupon.platform] || ShoppingBag
                  return (
                    <article key={coupon.id} className="coupon-card">
                      <div className="coupon-card-header">
                        <div className="platform-info">
                          <div className="platform-icon">
                            <PlatformIcon size={24} />
                          </div>
                          <span className="platform-name">{coupon.platform}</span>
                        </div>
                        <span className={`category-tag ${categoryColors[coupon.category]}`}>{coupon.category}</span>
                      </div>

                      <h3 className="coupon-title">{coupon.title}</h3>

                      <div className="coupon-meta">
                        <div className="trust-indicators">
                          {coupon.verified && (
                            <span className="verified-badge">
                              <CheckCircle size={14} />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="validity">
                          <Clock size={14} />
                          {coupon.validity}
                        </div>
                      </div>

                      <div className="coupon-footer">
                        <div className="redeem-info">
                          <span className="points-cost">
                            <Coins size={16} />
                            Redeem for {coupon.redeemCost} Points
                          </span>
                          <span className="users-count">
                            <Users size={14} />
                            {coupon.usersRedeemed} redeemed
                          </span>
                        </div>
                        <button className="btn btn-primary btn-view">View Details</button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <Search size={48} />
                </div>
                <h3>No coupons found matching your filters</h3>
                <p>Try removing some filters or search again.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  <RefreshCw size={18} />
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer Note */}
        <section className="footer-note">
          <div className="container">
            <p>
              This is a community-powered coupon marketplace where users can list verified coupons and redeem them using
              reward points. Explore discount offers on food delivery, shopping, travel, recharges, subscriptions and
              more.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
