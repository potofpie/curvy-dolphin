import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import NotesConverter from "./pages/NotesConverter";
import PhoneLinkScan from "./pages/PhoneLinkScan";
import SignInPage from "./pages/SignInPage";

const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_a2V5LXRyb2xsLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ";

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 px-4">
          
            <Header />
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/phone" element={<PhoneLinkScan />} />
              <Route
                path="/"
                element={
                  <>
                    <SignedIn>
                      <NotesConverter />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
            </Routes>

        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
