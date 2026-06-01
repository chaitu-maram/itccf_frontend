// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted">
//       <div className="text-center">
//         <h1 className="mb-4 text-4xl font-bold">404</h1>
//         <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
//         <a href="/" className="text-primary underline hover:text-primary/90">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;




import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          top: "-200px",
          left: "-200px",
          background:
            "radial-gradient(circle,rgba(196,181,253,0.35),transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          bottom: "-150px",
          right: "-100px",
          background:
            "radial-gradient(circle,rgba(233,213,255,0.35),transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid #DDD6FE",
          borderRadius: "28px",
          padding: "40px 30px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(124,58,237,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 20px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
          }}
        >
          <AlertTriangle size={42} color="#fff" />
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "72px",
            fontWeight: 800,
            color: "#4C1D95",
            lineHeight: 1,
          }}
        >
          404
        </h1>

        <h2
          style={{
            margin: "12px 0 10px",
            fontSize: "24px",
            color: "#2E1065",
            fontWeight: 700,
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#7C3AED",
            fontSize: "15px",
            lineHeight: 1.7,
            marginBottom: "30px",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              borderRadius: "12px",
              border: "1px solid #DDD6FE",
              background: "#fff",
              color: "#6D28D9",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              borderRadius: "12px",
              textDecoration: "none",
              background:
                "linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(124,58,237,0.30)",
            }}
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}