import React from "react";
import "../../styles/job.css";
export default function Tags({ tags, city }) {
  //string to vector
  let my_tags = tags.split(", ");
  if (my_tags.length === 0) {
    my_tags = tags.split(";");
    if (my_tags.length === 0) {
      my_tags = tags.split(",");
    }
    if (my_tags.length === 0) {
      my_tags = tags.split(" ");
    }
  }
  // console.log("ok");
  return (
    <div className="jobs_tag">
      {my_tags.map((tag,k) => {
        //console.log(tag);
        return (
          <h3 className="tag-h3" key={tag}>
            {tag}
          </h3>
        );
      })}
      <h3 className="tag-h3">{city}</h3>
    </div>
  );
}
