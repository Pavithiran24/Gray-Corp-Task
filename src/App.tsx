import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSecondWelcome, setShowSecondWelcome] = useState(false);
  const [showThirdWelcome, setShowThirdWelcome] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleCloseSecondWelcome = () => {
    setShowSecondWelcome(false);
    setShowThirdWelcome(true);
  };

  const handleCloseThirdWelcome = () => {
    setShowThirdWelcome(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowSecondWelcome(true);
    }, 4000); // Auto-dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-white flex items-center justify-center">
            <Toaster />
            <Sonner />
            <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
              <DialogContent className="welcome-dialog max-w-[95vw] sm:max-w-lg min-h-[300px] sm:min-h-[400px] border-blue-300 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 zoom-in-95 duration-500 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-lg sm:text-2xl md:text-3xl font-bold text-blue-900 mb-4">Welcome Message</DialogTitle>
                </DialogHeader>
                <div className="text-center space-y-4 p-4 sm:p-6">
                  <div className="text-4xl sm:text-5xl animate-bounce">👋</div>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black">Hello Team Gray Corp</p>
                  <p className="text-base sm:text-lg md:text-xl text-black">This is Pavithiran</p>
                  <p className="text-sm sm:text-base md:text-lg text-black">Really sorry for the late submission</p>
                  <Button onClick={handleCloseWelcome} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showSecondWelcome} onOpenChange={setShowSecondWelcome}>
              <DialogContent className="welcome-dialog max-w-[95vw] sm:max-w-lg min-h-[350px] sm:min-h-[500px] border-blue-300 shadow-2xl animate-in fade-in-0 slide-in-from-right-4 zoom-in-95 duration-500 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl sm:text-3xl font-bold text-black mb-4">Additional Message</DialogTitle>
                </DialogHeader>
                <div className="text-center space-y-4 p-6">
                  <div className="text-5xl animate-pulse">🏥</div>
                  <p className="text-xl sm:text-2xl font-semibold text-black">Again sorry for the late submission</p>
                  <p className="text-lg sm:text-xl text-black">I was in the hospital that's why I submitted this submission later</p>
                  <Button onClick={handleCloseSecondWelcome} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {!showWelcome && !showSecondWelcome && <Login onLogin={handleLogin} />}
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user/:uuid" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
