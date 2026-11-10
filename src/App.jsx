
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import CoffeeGallery from "./components/CoffeeGallery";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminReviews from "./pages/AdminReviews";
import AdminEventEnquiries from "./pages/AdminEventEnquiries";
import CustomerDashboard from "./pages/CustomerDashboard";

// Events pages
import UpcomingEvents from "./pages/UpcomingEvents";
import EventDetails from "./pages/EventDetails";
import EventsGallery from "./pages/EventsGallery";
import HostEvent from "./pages/HostEvent";
import EventBookingGuide from "./pages/EventBookingGuide";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <WhyChooseUs />
        <CoffeeGallery />
        <Events />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />

            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Events */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/upcoming" element={<UpcomingEvents />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/events/gallery" element={<EventsGallery />} />
              <Route path="/events/host" element={<HostEvent />} />
              <Route
                path="/events/booking-guide"
                element={<EventBookingGuide />}
              />

              {/* Cart & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route
                path="/admin/event-enquiries"
                element={<AdminEventEnquiries />}
              />

              {/* Customer */}
              <Route
                path="/customer-dashboard"
                element={<CustomerDashboard />}
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
