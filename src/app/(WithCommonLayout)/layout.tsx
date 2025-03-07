import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function CommonLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen">
        {children}
        </div>
        <Footer/>
    </div>
  )
}
