// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Loader2,
//   LogOut,
//   ShieldCheck,
//   Users,
//   Briefcase,
//   Building2,
// } from "lucide-react";

// export default function HRDashboard() {

//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);

//   const [hrData, setHrData] = useState<any>(null);

//   // =========================================
//   // CHECK LOGIN
//   // =========================================
//   useEffect(() => {

//     const userType = localStorage.getItem("user_type");

//     const hrId = localStorage.getItem("hr_id");

//     if (userType !== "hr" || !hrId) {

//       navigate("/");

//       return;
//     }

//     setHrData({
//       hr_id: hrId,
//       name: localStorage.getItem("name") || "HR User",
//       email: localStorage.getItem("email") || "",
//     });

//     setLoading(false);

//   }, [navigate]);

//   // =========================================
//   // LOGOUT
//   // =========================================
//   const logout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user_type");
//     localStorage.removeItem("hr_id");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");

//     navigate("/");
//   };

//   // =========================================
//   // SAMPLE TABLE DATA
//   // =========================================
//   const students = [
//     {
//       id: 1,
//       name: "Rahul Kumar",
//       course: "B.Tech CSE",
//       score: "92%",
//       status: "Selected",
//     },
//     {
//       id: 2,
//       name: "Sneha Reddy",
//       course: "MBA",
//       score: "88%",
//       status: "Pending",
//     },
//     {
//       id: 3,
//       name: "Arjun Patel",
//       course: "BCA",
//       score: "81%",
//       status: "Rejected",
//     },
//   ];

//   // =========================================
//   // LOADING SCREEN
//   // =========================================
//   if (loading) {

//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background:
//             "linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#FAF5FF 100%)",
//         }}
//       >
//         <style>{`
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//         `}</style>

//         <Loader2
//           style={{
//             width: 40,
//             height: 40,
//             color: "#7C3AED",
//             animation: "spin 1s linear infinite",
//           }}
//         />
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         *{
//           box-sizing:border-box;
//           font-family:Arial,sans-serif;
//         }

//         body{
//           margin:0;
//           padding:0;
//         }

//         table{
//           width:100%;
//           border-collapse:collapse;
//         }

//         th{
//           background:#F3E8FF;
//           color:#6D28D9;
//           font-size:14px;
//           padding:14px;
//           text-align:left;
//         }

//         td{
//           padding:14px;
//           border-top:1px solid #E9D5FF;
//           font-size:14px;
//           color:#444;
//         }

//         tr:hover{
//           background:#FAF5FF;
//         }
//       `}</style>

//       <div
//         style={{
//           minHeight: "100vh",
//           background:
//             "linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#FAF5FF 100%)",
//         }}
//       >

//         {/* =========================================
//             HEADER
//         ========================================= */}
//         <header
//           style={{
//             background: "rgba(255,255,255,0.85)",
//             backdropFilter: "blur(18px)",
//             borderBottom: "1px solid #DDD6FE",
//             padding: "15px 30px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           }}
//         >

//           {/* LEFT */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >

//             <div
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: 14,
//                 background: "linear-gradient(135deg,#4C1D95,#7C3AED)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#fff",
//                 fontWeight: 800,
//               }}
//             >
//               HR
//             </div>

//             <div>

//               <div
//                 style={{
//                   fontSize: 11,
//                   color: "#A855F7",
//                   fontWeight: 700,
//                   letterSpacing: "0.1em",
//                 }}
//               >
//                 CONNECT PORTAL
//               </div>

//               <div
//                 style={{
//                   fontSize: 20,
//                   color: "#2E1065",
//                   fontWeight: 800,
//                 }}
//               >
//                 HR Dashboard
//               </div>

//             </div>

//           </div>

//           {/* RIGHT */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//             }}
//           >

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "#F3E8FF",
//                 border: "1px solid #D8B4FE",
//                 padding: "8px 14px",
//                 borderRadius: 30,
//               }}
//             >
//               <ShieldCheck size={16} color="#7C3AED" />

//               <span
//                 style={{
//                   fontSize: 13,
//                   fontWeight: 700,
//                   color: "#6D28D9",
//                 }}
//               >
//                 {hrData?.hr_id}
//               </span>
//             </div>

//             <button
//               onClick={logout}
//               style={{
//                 border: "none",
//                 background: "#FEE2E2",
//                 color: "#B91C1C",
//                 padding: "10px 16px",
//                 borderRadius: 10,
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 fontWeight: 700,
//               }}
//             >
//               <LogOut size={15} />
//               Logout
//             </button>

//           </div>

//         </header>

//         {/* =========================================
//             MAIN
//         ========================================= */}
//         <main
//           style={{
//             maxWidth: 1250,
//             margin: "0 auto",
//             padding: "40px 24px",
//           }}
//         >

//           {/* WELCOME CARD */}
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: 24,
//               padding: 40,
//               boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//               marginBottom: 30,
//             }}
//           >

//             <h1
//               style={{
//                 margin: 0,
//                 color: "#2E1065",
//                 fontSize: 30,
//               }}
//             >
//               Welcome, {hrData?.name}
//             </h1>

//             <p
//               style={{
//                 color: "#7C3AED",
//                 marginTop: 10,
//                 fontWeight: 600,
//               }}
//             >
//               Logged in as {hrData?.hr_id}
//             </p>

//             <p
//               style={{
//                 color: "#666",
//                 marginTop: 4,
//               }}
//             >
//               {hrData?.email}
//             </p>

//           </div>

//           {/* =========================================
//               STATS CARDS
//           ========================================= */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
//               gap: 20,
//               marginBottom: 35,
//             }}
//           >

//             {/* CARD 1 */}
//             <div
//               style={{
//                 background: "#fff",
//                 borderRadius: 20,
//                 padding: 24,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Users size={32} color="#7C3AED" />

//               <h2
//                 style={{
//                   marginTop: 18,
//                   marginBottom: 6,
//                   color: "#2E1065",
//                 }}
//               >
//                 120
//               </h2>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#666",
//                 }}
//               >
//                 Total Students
//               </p>
//             </div>

//             {/* CARD 2 */}
//             <div
//               style={{
//                 background: "#fff",
//                 borderRadius: 20,
//                 padding: 24,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Briefcase size={32} color="#7C3AED" />

//               <h2
//                 style={{
//                   marginTop: 18,
//                   marginBottom: 6,
//                   color: "#2E1065",
//                 }}
//               >
//                 35
//               </h2>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#666",
//                 }}
//               >
//                 Interviews Scheduled
//               </p>
//             </div>

//             {/* CARD 3 */}
//             <div
//               style={{
//                 background: "#fff",
//                 borderRadius: 20,
//                 padding: 24,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Building2 size={32} color="#7C3AED" />

//               <h2
//                 style={{
//                   marginTop: 18,
//                   marginBottom: 6,
//                   color: "#2E1065",
//                 }}
//               >
//                 12
//               </h2>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#666",
//                 }}
//               >
//                 Companies Connected
//               </p>
//             </div>

//           </div>

//           {/* =========================================
//               TABLE
//           ========================================= */}
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: 22,
//               overflow: "hidden",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
//             }}
//           >

//             <div
//               style={{
//                 padding: "22px 24px",
//                 borderBottom: "1px solid #E9D5FF",
//               }}
//             >

//               <h2
//                 style={{
//                   margin: 0,
//                   color: "#2E1065",
//                 }}
//               >
//                 Recent Student Applications
//               </h2>

//             </div>

//             <div style={{ overflowX: "auto" }}>

//               <table>

//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Student Name</th>
//                     <th>Course</th>
//                     <th>Score</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {students.map((student) => (

//                     <tr key={student.id}>

//                       <td>{student.id}</td>

//                       <td>{student.name}</td>

//                       <td>{student.course}</td>

//                       <td>{student.score}</td>

//                       <td>
//                         <span
//                           style={{
//                             padding: "6px 12px",
//                             borderRadius: 30,
//                             fontSize: 12,
//                             fontWeight: 700,
//                             background:
//                               student.status === "Selected"
//                                 ? "#DCFCE7"
//                                 : student.status === "Pending"
//                                 ? "#FEF3C7"
//                                 : "#FEE2E2",
//                             color:
//                               student.status === "Selected"
//                                 ? "#166534"
//                                 : student.status === "Pending"
//                                 ? "#92400E"
//                                 : "#B91C1C",
//                           }}
//                         >
//                           {student.status}
//                         </span>
//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </main>

//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  LogOut,
  ShieldCheck,
  Users,
  Briefcase,
  Building2,
  Plus,
} from "lucide-react";

export default function HRDashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [hrData, setHrData] = useState<any>(null);

  // =========================================
  // TABLE DATA
  // =========================================
  const [students, setStudents] = useState<any[]>([]);
useEffect(() => {
  const userType = localStorage.getItem("user_type");
  const hrId     = localStorage.getItem("hr_id");

  if (userType !== "hr" || !hrId) {
    navigate("/");
    return;
  }

  const name  = localStorage.getItem("hr_name")  || "HR User";
  const email = localStorage.getItem("hr_email") || "";

  setHrData({ hr_id: hrId, name, email });

  fetch(`http://192.168.0.7:8000/api/students/?hr_id=${hrId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Raw data:", data);
      setStudents(Array.isArray(data) ? data : data.results ?? []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch students:", err);
      setLoading(false);
    });

}, [navigate]);

  // =========================================
  // LOGOUT
  // =========================================
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("hr_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/");
  };

  // =========================================
  // LOADING SCREEN
  // =========================================
  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#FAF5FF 100%)",
        }}
      >
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <Loader2
          style={{
            width: 40,
            height: 40,
            color: "#7C3AED",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          margin:0;
          padding:0;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th{
          background:#F3E8FF;
          color:#6D28D9;
          font-size:14px;
          padding:14px;
          text-align:left;
        }

        td{
          padding:14px;
          border-top:1px solid #E9D5FF;
          font-size:14px;
          color:#444;
        }

        tr:hover{
          background:#FAF5FF;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#FAF5FF 100%)",
        }}
      >

        {/* =========================================
            HEADER
        ========================================= */}
        <header
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid #DDD6FE",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >

            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "linear-gradient(135deg,#4C1D95,#7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              HR
            </div>

            <div>

              <div
                style={{
                  fontSize: 11,
                  color: "#A855F7",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                CONNECT PORTAL
              </div>

              <div
                style={{
                  fontSize: 20,
                  color: "#2E1065",
                  fontWeight: 800,
                }}
              >
                HR Dashboard
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >

            {/* ADD EMPLOYEE BUTTON */}
            <button
              onClick={() => navigate("/studentprofile")}
              style={{
                border: "none",
                background: "#7C3AED",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(124,58,237,0.25)",
              }}
            >
              <Plus size={16} />
              Add Employee
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#F3E8FF",
                border: "1px solid #D8B4FE",
                padding: "8px 14px",
                borderRadius: 30,
              }}
            >
              <ShieldCheck size={16} color="#7C3AED" />

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#6D28D9",
                }}
              >
                {hrData?.hr_id}
              </span>
            </div>

            <button
              onClick={logout}
              style={{
                border: "none",
                background: "#FEE2E2",
                color: "#B91C1C",
                padding: "10px 16px",
                borderRadius: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 700,
              }}
            >
              <LogOut size={15} />
              Logout
            </button>

          </div>

        </header>

        {/* =========================================
            MAIN
        ========================================= */}
        <main
          style={{
            maxWidth: 1250,
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >

          {/* WELCOME CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 40,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              marginBottom: 30,
            }}
          >

            <h1
              style={{
                margin: 0,
                color: "#2E1065",
                fontSize: 30,
              }}
            >
              Welcome, {hrData?.name}
            </h1>

            <p
              style={{
                color: "#7C3AED",
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              Logged in as {hrData?.hr_id}
            </p>

            <p
              style={{
                color: "#666",
                marginTop: 4,
              }}
            >
              {hrData?.email}
            </p>

          </div>

          {/* =========================================
              STATS CARDS
          ========================================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 20,
              marginBottom: 35,
            }}
          >

            {/* CARD 1 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Users size={32} color="#7C3AED" />

              <h2
                style={{
                  marginTop: 18,
                  marginBottom: 6,
                  color: "#2E1065",
                }}
              >
                {students.length}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Total Students
              </p>
            </div>

            {/* CARD 2 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Briefcase size={32} color="#7C3AED" />

              <h2
                style={{
                  marginTop: 18,
                  marginBottom: 6,
                  color: "#2E1065",
                }}
              >
                {students.length}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Applications
              </p>
            </div>

            {/* CARD 3 */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Building2 size={32} color="#7C3AED" />

              <h2
                style={{
                  marginTop: 18,
                  marginBottom: 6,
                  color: "#2E1065",
                }}
              >
                Active
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                HR Status
              </p>
            </div>

          </div>

          {/* =========================================
              TABLE
          ========================================= */}
          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >

            <div
              style={{
                padding: "22px 24px",
                borderBottom: "1px solid #E9D5FF",
              }}
            >

              <h2
                style={{
                  margin: 0,
                  color: "#2E1065",
                }}
              >
                Student Records
              </h2>

            </div>

            <div style={{ overflowX: "auto" }}>

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Qualification</th>
                  </tr>
                </thead>

                <tbody>

                  {students.length > 0 ? (

                    students.map((student: any, index: number) => (

                      <tr key={student.id || index}>

                        <td>
                          {student.id}
                        </td>

                        <td>
                          {student.full_name ||
                            student.name ||
                            `${student.first_name || ""} ${student.last_name || ""}`}
                        </td>

                        <td>
  {student.email || "-"}
</td>

<td>
  {student.mobile_personal || "-"}
</td>

<td>
  {student.academic || student.specialization || "-"}
</td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          padding: 30,
                          color: "#777",
                        }}
                      >
                        No student data found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}