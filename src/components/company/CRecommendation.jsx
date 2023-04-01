import React from "react";
import User from "./User";

export default function CRecommendation({ jobName, users, company_id }) {
  users = users[0]
  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap">
      <h5>{jobName}</h5>
      {users.length > 0 &&
        users.map((u, k) => {
          console.log(u);
          return <User info={u} key={k} company_id={company_id} />;
        })}
    </div>
  );
}
