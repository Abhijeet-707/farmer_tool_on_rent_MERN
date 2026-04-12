import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FarmerLogin from './pages/FarmerLogin';
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminToolManagement from './pages/AdminToolManagement';
import AdminBookingManagement from './pages/AdminBookingManagement';
import TractorCategory from './pages/TractorCategory';
import SowingCategory from './pages/SowingCategory';
import ThresherCategory from './pages/ThresherCategory';
import PruningCategory from './pages/PruningCategory';
import AllEquipment from './pages/AllEquipment';
import ToolDetails from './pages/ToolDetails';
import ToolBooking from './pages/ToolBooking';
import FarmerBookings from './pages/FarmerBookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-tools" element={<AdminToolManagement />} />
        <Route path="/admin-bookings" element={<AdminBookingManagement />} />
        <Route path="/tractor" element={<TractorCategory />} />
        <Route path="/sowing" element={<SowingCategory />} />
        <Route path="/thresher" element={<ThresherCategory />} />
        <Route path="/pruning" element={<PruningCategory />} />
        <Route path="/all-equipment" element={<AllEquipment />} />
        <Route path="/tool-details" element={<ToolDetails />} />
        <Route path="/tool-booking" element={<ToolBooking />} />
        <Route path="/my-bookings" element={<FarmerBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
