import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
export default function CompaniesR({ companies, user_id,setCompanies }) {
  const token = localStorage.getItem("authToken");

  function handleFollowCompany(company_id) {
    setCompanies(companies.filter((item) => item[0] != company_id));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const user__id = user_id;
    const company__id = company_id;
    axios
      .post(
        process.env.REACT_APP_BASE_URL+"/api/company/followCompany",
        {
          user__id,
          company__id,
        },
        config
      )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
        alert("Please log in again")
      });
  }
  return (
    <div className="companiesR">
       
      {companies !== null &&
        companies.length > 0 &&
        companies.map((c, i) => (
          <div key={i} className="companiesR__container">
            <h6>{c.name}</h6>
            <Button
              variant="outline-primary"
              id="filterBtn"
              onClick={()=>handleFollowCompany(c.id)}
            >
              Follow
            </Button>
          </div>
        ))}
    </div>
  );
}
