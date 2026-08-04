import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BannerCarousel from "./components/Banner";
import Services from "./components/Services";
import PromoBanner from "./components/Thatsection";
import ShippingProcess from "./components/Steps";
import AboutUs from "./components/About";
import LogisticsMap from "./components/Map";
import { Partners, Reviews } from "./components/Partners";
import Footer from "./components/Footer";
import TruckCargoPage from "./Pages/TruckCargo";
import TruckParcelPage from "./Pages/TruckParcel";
import AirPage from "./Pages/Air";
import SeaPage from "./Pages/Sea";
import DomesticShippingPage from "./Pages/DomesticShipping";
import ShipNowPage from "./Pages/ShipNow";
import DiscountsPage from "./Pages/DiscountsPage";
import Location from "./Pages/Location";
import ContactPage from "./Pages/Contact";
import ServicesHead from "./Pages/ServicesHead";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import FAQPage from "./Pages/FAQ";
import SupportPage from "./Pages/Support";
import NewsPage from "./Pages/NewsPage";
import ShippingMethodsPage from "./Pages/ShippingMethod";
import OnlineStoresPage from "./Pages/OnlineStores";
import AboutUsPage from "./Pages/AboutUs";
import ProhibitedItemsPage from "./Pages/Prohibited";
import { CalculatePage, CreateShipmentPage, ShipmentDetailsPage } from "./Pages/shipment";
import ProfilePage from "./Pages/Profile";
import { AuthPage, ResetPasswordPage } from "./Pages/auth";
import { NotFoundPage, ServerErrorPage } from "./Pages/errors";
import BackToTopButton from "./components/common/BackToTopButton";
import AirCargoBookingPage from "./air-cargo-booking/page";
import SeaCargoBookingPage from "./sea-cargo-booking/page";
import TruckCargoBookingPage from "./truck-cargo-booking/page";


function HomePage() {
  return (
    <>
      <BannerCarousel />
      <Services />
      <PromoBanner />
      <ShippingProcess />
      <AboutUs />
      <LogisticsMap />
      <Partners />
      <Reviews />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track" element={<TruckParcelPage />} />
        <Route path="/truck" element={<TruckCargoPage />} />
        <Route path="/truck-cargo" element={<TruckCargoPage />} />
        <Route path="/truck-cargo-booking" element={<TruckCargoBookingPage />} />
        <Route path="/air-cargo" element={<AirPage />} />
        <Route path="/air-cargo-booking" element={<AirCargoBookingPage />} />
        <Route path="/sea-cargo" element={<SeaPage />} />
        <Route path="/sea-cargo-booking" element={<SeaCargoBookingPage />} />
        <Route path="/ship-now" element={<ShipNowPage />} />
        <Route path="/domestic-shipping" element={<DomesticShippingPage />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="/location" element={<Location/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/serviceshead" element={<ServicesHead/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/faq" element={<FAQPage/>}/>
        <Route path="/support" element={<SupportPage/>}/>
        <Route path="/discounts" element={<DiscountsPage/>}/>
        <Route path="/shippingmethod" element={<ShippingMethodsPage/>}/>
        <Route path="/online-stores" element={<OnlineStoresPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/prohibited-items" element={<ProhibitedItemsPage />} />
        <Route path="/calculate" element={<CalculatePage />} />
        <Route path="/create-shipment" element={<CreateShipmentPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shipments/:id" element={<ShipmentDetailsPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/505" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BackToTopButton />
    </BrowserRouter>
  );
}

export default App;