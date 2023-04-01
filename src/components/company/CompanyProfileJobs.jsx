import React from "react";

import Jobs from "../general/Jobs";

export default function CompanyProfileJobs({ jobs, jobsPictures, isCompany }) {
  return (
    <div className="profile-available-jobs-with-title">
      <h4>Available jobs</h4>
      <div className="profile-available-jobs">
        {jobs.length > 0 && (
          <Jobs
            jobs={jobs}
            jobsPictures={jobsPictures}
            isCompany={isCompany}
            loaded_from_db={false}
            is_saved={false}
          />
        )}
        {jobs.length <= 0 && (
          <h2 id="title-jobs-for-you">
            Jobs not posted.
          </h2>
        )}
      </div>
    </div>
  );
}
