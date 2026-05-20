import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "../components/LoginScreen";
import SetupScreen from "../components/SetupScreen";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import Setting from "../components/Setting";
import SignupScreen from "../components/SignupScreen";
import BillSection from "../components/BillSection"
import { useMilkStore } from "../store/useMilkStore";

export default function AppRoutes() {
  const user = useMilkStore((state) => state.user);
 return (
   <Routes>
     <Route
       path="/login"
       element={
         user ? (
           user.hasCompletedSetup ? (
             <Navigate to="/dashboard" replace />
           ) : (
             <Navigate to="/setup" replace />
           )
         ) : (
           <LoginScreen />
         )
       }
     />
     <Route
       path="/signup"
       element={
         user ? (
           user.hasCompletedSetup ? (
             <Navigate to="/dashboard" replace />
           ) : (
             <Navigate to="/setup" replace />
           )
         ) : (
           <SignupScreen />
         )
       }
     />

     <Route
       path="/setup"
       element={!user ? <Navigate to="/login" replace /> : <SetupScreen />}
     />

     <Route
       path="/dashboard"
       element={!user ? <Navigate to="/login" replace /> : <Dashboard />}
     />

     <Route
       path="/profile"
       element={!user ? <Navigate to="/login" replace /> : <Profile />}
     />
     <Route
       path="/bill"
       element={!user ? <Navigate to="/login" replace /> : <BillSection />}
     />

     <Route
       path="/settings"
       element={!user ? <Navigate to="/login" replace /> : <Setting />}
     />

     <Route path="*" element={<Navigate to="/login" replace />} />
   </Routes>
 );
}
