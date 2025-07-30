import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Main Sidebar
import Dashboard from "./components/Dashboard";
import BulkActions from "./components/BulkActions"; 
import { Navigate } from 'react-router-dom';
import ContactsPage from "./components/ContactsPage";
import Conversation from "./components/Conversation";
import CalendarPage from "./components/CalendarPage";
import { GetStartedPage } from './pages/Auth/GetStartedPage';
import { SignupPage } from './pages/Auth/SignupPage';
import { VerifyCodePage } from './pages/Auth/VerifyCodePage';
import { UserInfoPage } from './pages/Auth/UserInfoPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { PasswordResetOTPPage } from './pages/Auth/PasswordResetOTPPage';
import { ResetPasswordPage } from './pages/Auth/ResetPasswordPage';
import SettingsSidebar from "./pages/settings/Sidebar"; // Settings Sidebar
import ProfileSettings from "./pages/settings/ProfileSettings";
import BillingSettings from "./pages/settings/BillingSettings";
import BusinessSettings from "./pages/settings/BusinessSettings";
import LocalizationSettings from "./pages/settings/LocalizationSettings";
import EmailSettings from "./pages/settings/EmailSettings";
import EmailBuilder from "./pages/EmailBuilder/index.tsx";
import axios from "axios"
// New Section Components
import {Contacts} from "./pages/Contacts";
import {BulkHistory} from "./pages/BulkHistory";
import {RestoreContacts} from "./pages/RestoreContacts";
import {Tasks }from "./pages/Tasks";
import {AddCompany} from "./pages/AddCompany";
import { Navbar } from "./pages/contacts/Navbar";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Email Campaign Components
import EmailLayout from './pages/email/components/Layout';
import EmailDashboard from './pages/email/Dashboard';
import Templates from './pages/email/Templates';
import TemplateBuilder from './pages/email/TemplateBuilder';
import Campaigns from './pages/email/Campaigns';
import Reports from './pages/email/Reports';
import Subscribers from './pages/email/Subscribers';

// Oppurtunities Section Components
import OppLayout from './pages/Opportunities/Layout'

// scrapper section
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Scraper from './pages/Scrapper/Scrapper.jsx'


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // State for active tab in settings
  const [currentPage, setCurrentPage] = useState("getStarted"); // State for authentication flow
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [resetVerificationCode, setResetVerificationCode] = useState("");
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const AuthLayout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
          {children}
        </div>
      </div>
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Routes with Main Sidebar */}
        <Route
          path="/"
          element={
            <PrivateRoute>
            <div className="flex min-h-screen bg-gray-900">
            {/* Main Sidebar */}
            <div
              className={`fixed inset-y-0 left-0 w-60 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 transition duration-200 ease-in-out z-30 bg-gray-800`}
            >
              <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
      
            {/* Mobile Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 p-2 rounded-lg text-white"
            >
              {isSidebarOpen ? "Close" : "Menu"}
            </button>
      
            {/* Main Content */}
            <main className=" flex-1 p-10px overflow-y-auto bg-gray-800 text-white" style={{marginLeft: "240px"}}>
              <Outlet />
            </main>
          </div>
          </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opportunities" element={<OppLayout />} />
          <Route path="bulk-actions" element={<BulkActions />} />
          <Route path="conversation" element={<Conversation />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="/email" element={<EmailLayout />}>
          <Route index element={<EmailDashboard />} />
          <Route path="templates" element={<Templates />} />
          <Route path="templates/create" element={<TemplateBuilder />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="reports" element={<Reports />} />
          <Route path="subscribers" element={<Subscribers />} />
        </Route>

          {/* New Section under Contacts */}
          <Route path="contacts" element={ <>
                <Navbar /> {/* Navbar for Contacts Section */}
                <div className="p-4">
                  <Outlet />
                </div>
              </>}>
            <Route index element={<Contacts />} />
            <Route path="history" element={<BulkHistory />} />
            <Route path="restore" element={<RestoreContacts />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="add-company" element={<AddCompany />} />
          </Route>
          <Route path="/scraper" element={<Scraper />} />

          <Route
            path="/scraper"
            element={
              <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
                <Header />
                <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="container mx-auto px-4 py-8 flex-1">
                  {activeTab === "scraper" && <Scraper />}
                  {activeTab === "csv-history" && <CsvHistory />}
                  {activeTab === "export-manager" && <ExportManager />}
                </main>
                <Footer />
              </div>
            }
          />
        </Route>
        <Route
  path="/email-builder"
  element={
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <EmailBuilder />
    </div>
  }
/>

        {/* Settings Routes with Settings Sidebar */}
        
        <Route
  path="/settings"
  element={
    <PrivateRoute>
      <div className="flex min-h-screen bg-gray-900">
        {/* Fixed Settings Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-50">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 ml-64">
          {/* Fixed Back to Dashboard Button */}
          <div className="fixed top-4 right-4 z-[1000]">
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              Back to Dashboard
            </button>
          </div>
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </PrivateRoute>
  }
>
  {/* Redirect to Profile Settings */}
  <Route index element={<Navigate to="profile" replace />} />

  {/* Settings Sub-Routes */}
  <Route path="profile" element={<div className="max-w-4xl"><ProfileSettings /></div>} />
  <Route path="billing" element={<BillingSettings />} />
  <Route path="business" element={<div className="max-w-4xl"><BusinessSettings /></div>} />
  <Route path="localization" element={<div className="max-w-4xl"><LocalizationSettings /></div>} />
  <Route path="email" element={<div className="max-w-4xl"><EmailSettings /></div>} />
</Route>
        

        {/* Authentication Routes (No Sidebar) */}
        <Route
          path="/get-started"
          element={
            <AuthLayout>
              <GetStartedPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignupPage />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthLayout>
              <VerifyCodePage />
            </AuthLayout>
          }
        />
        <Route
          path="/welcome"
          element={
            <AuthLayout>
              <UserInfoPage />
            </AuthLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-code"
          element={
            <AuthLayout>
              <PasswordResetOTPPage />
            </AuthLayout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPasswordPage />
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;