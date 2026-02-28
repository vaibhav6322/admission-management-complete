import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Institution from "./pages/admin/Institution";
import Campus from "./pages/admin/Campus";
import Department from "./pages/admin/Department";
import Program from "./pages/admin/Program";
import Applicant from "./pages/officer/Applicant";
import DocumentVerification from "./pages/officer/DocumentVerification";
import SeatAllocation from "./pages/officer/SeatAllocation";
import FeeUpdate from "./pages/officer/FeeUpdate";
import AdmissionConfirmation from "./pages/officer/AdmissionConfirmation";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleLayout from "./layout/RoleLayout";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

      //LOGIN
        <Route path="/" element={<Login />} />

      //  ADMIN
        <Route
          path="/institution"
          element={
            <ProtectedRoute role="Admin">
              <RoleLayout>
                <Institution />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campus"
          element={
            <ProtectedRoute role="Admin">
              <RoleLayout>
                <Campus />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/department"
          element={
            <ProtectedRoute role="Admin">
              <RoleLayout>
                <Department />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/program"
          element={
            <ProtectedRoute role="Admin">
              <RoleLayout>
                <Program />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        //OFFICER

        <Route
          path="/applicant"
          element={
            <ProtectedRoute role="AdmissionOfficer">
              <RoleLayout>
                <Applicant />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify"
          element={
            <ProtectedRoute role="AdmissionOfficer">
              <RoleLayout>
                <DocumentVerification />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/allocate"
          element={
            <ProtectedRoute role="AdmissionOfficer">
              <RoleLayout>
                <SeatAllocation />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/fee"
          element={
            <ProtectedRoute role="AdmissionOfficer">
              <RoleLayout>
                <FeeUpdate />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirm"
          element={
            <ProtectedRoute role="AdmissionOfficer">
              <RoleLayout>
                <AdmissionConfirmation />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

      //MANAGEMENT
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="Management">
              <RoleLayout>
                <Dashboard />
              </RoleLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}