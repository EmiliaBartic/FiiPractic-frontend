import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Companies from "../../components/company/Companies"
import CompaniesR from "../../components/company/CompaniesR"
import NavbarLog from "../../components/user/Navbar-log";
import "../../styles/searchCompany.css";

export default function SearchCompany() {
  const [companies, setCompanies] = useState([]);
  const [searchResultCompanies, setSearchResultCompanies] = useState([]);
  const [companiesRecommended, setCompaniesRecommended] = useState([]);
  const [companiesFollowedByUser, setCompaniesFollowedByUser] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("authToken");
  const [input, setInput] = useState("");

  const searchCompany = () => {
    if (input === null) {
      alert("Type a company name first");
    } else {
        setSearchResultCompanies(
        companies.filter(
          (item) =>
            item.name.toUpperCase() === input.toUpperCase() ||
            item.name.toUpperCase().includes(input.toUpperCase())
        )
      );
    }
  };

  function refetchCompanies() {
    console.log("refetchCompanies");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    axios
      .get(process.env.REACT_APP_BASE_URL+"/api/company/recommend/" , {
        headers,
      })
      .then((response) => {
        if (response.data !== undefined && response.data !== null) {
          console.log("refetch follow by user", response.data);
          setCompaniesRecommended(response.data["notFollows"]);
          setCompaniesFollowedByUser(response.data["follows"]);
        }
      });
  }

  function handleFollowCompany(company_id) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const user__id = user.id;
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
        //trigger la fetch
        refetchCompanies();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUNFollowCompany(company_id) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const user__id = user.id;
    const company__id = company_id;

    axios
      .post(
        process.env.REACT_APP_BASE_URL+"/api/company/unfollowCompany",
        {
          user__id,
          company__id,
        },
        config
      )
      .then((response) => {
        refetchCompanies();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (companies.length === 0) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(process.env.REACT_APP_BASE_URL+"/api/company/companies", { headers })
        .then((response) => {
          if (
            response.data !== undefined &&
            response.data !== null &&
            response.data !== companies
          ) {
            setCompanies(response.data);
          }
        });

     
      axios
        .get(process.env.REACT_APP_BASE_URL+"/api/company/recommend/" , {
          headers,
        })
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            setCompaniesRecommended(response.data["notFollows"]);
            setCompaniesFollowedByUser(response.data["follows"]);
          }
        });
    }
  });

  return (
    <div className="searchCompany">
      <NavbarLog />
      <div className="searchCompany__container">
        <div className="searchCompany__container__search">
          <div className="searchCompany__container__search__searchBar">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="faMagnifyingGlass" />
            <input
              type="text"
              placeholder="Type company name"
              id="SearchCompanyInput"
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </div>
          <Button
            variant="outline-primary"
            id="filterBtn"
            onClick={() => searchCompany()}
          >
            Search Company
          </Button>
        </div>
        <div className="searchCompany__container__results">
          {(companies === null || companies.length === 0) && (
            <p id="companiesNullP">Search for a company to get results here</p>
          )}
          {companies && (
            <Companies
              companies={searchResultCompanies}
              handleFollowCompany={handleFollowCompany}
              handleUNFollowCompany={handleUNFollowCompany}
              companiesFollowedByUser={companiesFollowedByUser}
            />
          )}
        </div>
        <div className="searchCompany__container__recommendations">
          <h3>Companies that you don't follow</h3>
          {companiesRecommended && (
            <CompaniesR companies={companiesRecommended} user_id={user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
