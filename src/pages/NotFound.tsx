import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-2 sm:px-0">
      <div className="text-center w-full max-w-xs sm:max-w-md mx-auto">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold">404</h1>
        <p className="mb-4 text-lg sm:text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90 text-base sm:text-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
