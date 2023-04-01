import React, { useState, useMemo } from "react";
import Pagination from "../user/Pagination";
import "../../styles/pagination.css";

import Job from "./Job";
import Message from "./Message";

const Jobs = ({
  jobs,
  jobsPictures,
  isCompany,
  is_saved,
  loaded_from_db,
  setSavedJobs,
}) => {
  // APEL BACKEND
  let PageSize = 4;
  let index = -1;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (jobs !== undefined && jobs.length !== 0)
      return jobs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, jobs]);

  if (jobs!==undefined && jobs.length !== 0) {
    return (
      // aici voi pune Job cu proprietatile necesare
      <div className="jobs__mapped" key={jobs.length}>
        { jobs  && currentTableData.map((item,i) => {
          
          if(loaded_from_db)
            item = item[0];
          index+=1;
          // console.log('item: ',item)
          return (
            <Job
              key={i}
              key_j={item.id}
              title={item.title}
              id={item.id}
              company={item.company}
              companyPicture={jobsPictures[index]}
              city={item.city}
              country={item.country}
              description={item.description}
              level={item.level}
              requirements={item.requirements}
              responsibilities={item.responsibilities}
              skills={item.skills}
              tags={item.tags}
              type={item.type}
              workTime={item.time}
              isCompany={isCompany}
              isSaved={is_saved}
              setSavedJobs={setSavedJobs}
            />
          );
        })}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={jobs.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  }else{
    return(<>{true && <Message message={"No jobs found :("} type={"ok"} />}</>);
  }
};

export default Jobs;
