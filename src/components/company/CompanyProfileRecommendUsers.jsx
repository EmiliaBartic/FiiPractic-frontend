import React, { useCallback, useEffect, useMemo, useState } from "react";

import ContentLoader from "react-content-loader";
import axios from "axios";
import User from "./User";
import CRecommendation from "./CRecommendation";

export default function CompanyProfileRecommendUsers({
  user_id,
  jobs,
  setUserFromCompanyPerspective,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState([]);
  const token = localStorage.getItem("authToken");

  useMemo(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const urlSuggestUsers =
      process.env.REACT_APP_BASE_URL +
      "/api/company/users/suggestUsersByCompanyName";
    axios.get(urlSuggestUsers, { headers }).then((response) => {
      setRecommendation(response.data);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="profile-recom-users-with-title">
        <ContentLoader
          speed={2}
          width={"100%"}
          height={"100%"}
          viewBox="0 0 250 100"
          backgroundColor="#7186eb"
          foregroundColor="#8f9fef"
        >
          <rect x="25" y="88" rx="3" ry="3" width="200" height="6" />
        </ContentLoader>
      </div>
    );
  } else {
    return (
      <div className="profile-recom-users-with-title">
        <h3>Users recommended for your jobs: </h3>
        <div className="users">
          {recommendation.length > 0 &&
            recommendation.map((r, k) => {
              //console.log(k, Object.keys(r),Object.values(r))
              return (
                <CRecommendation
                  key={k}
                  company_id={user_id}
                  jobName={Object.keys(r)}
                  users={Object.values(r)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
