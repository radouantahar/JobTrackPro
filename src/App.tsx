import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import JobSearchPage from "./components/job-search/JobSearchPage";
import ProfilePage from "./components/profile/ProfilePage";
import ProcessSelectedJob from "./components/process/ProcessSelectedJob";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-search" element={<JobSearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/process/:jobId"
            element={
              <ProcessSelectedJob
                job={{
                  id: "1",
                  companyName: "Example Corp",
                  role: "Software Engineer",
                }}
              />
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
