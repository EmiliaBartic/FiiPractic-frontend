import React from "react";
import Jobs from "../general/Jobs";

export default function PSavedJobs({
  savedJobs,
  jobsPictures,
  isCompany,
  
  setSavedJobs,
 
}) {
  return (
    <div className="profile-saved-jobs-with-title">
      <h4>Saved Jobs</h4>
      <div className="profile-saved-jobs">
        {(savedJobs === undefined ||
          savedJobs === null ||
          savedJobs.length == 0) && <p>No saved jobs</p>}
        {savedJobs !== undefined &&
          savedJobs !== null &&
          savedJobs.length > 0 && (
            <Jobs
              jobs={savedJobs}
              jobsPictures={jobsPictures}
              isCompany={isCompany}
              is_saved={true}
              loaded_from_db={true}
              setSavedJobs={setSavedJobs}
            />
          )}
      </div>
    </div>
  );
}
