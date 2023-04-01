import React from "react";
import "../../styles/style.css";
import CompanyHeader from "../../components/company/CompanyHeader";
import CNavBar from "../../components/company/CNavBar-log";
export default function MainC() {
  return (
    <div>
      <CNavBar/>
      <CompanyHeader />
    </div>
  );
}
