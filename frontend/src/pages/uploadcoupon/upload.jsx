import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import "./upload.css"
import { CouponForm } from "../../components/CouponForm/couponform"

export function Upload() {
  return (
    <div className="upload-page">
      <Navbar />
      <main>
        <CouponForm />
      </main>
      <Footer />
    </div>
  )
}