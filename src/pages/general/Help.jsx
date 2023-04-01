import React from "react";
import CNavBar from "../../components/company/CNavBar-log";
import NavbarLog from "../../components/user/Navbar-log";
import firstImageHelp from "../../images/firstImageHelp.jpg";
import secondImageHelp from "../../images/secondImageHelp.jpg";
import thirdImageHelp from "../../images/thirdImageHelp.jpg";
import companyImageHelp from "../../images/companyImageHelp.jpg";

export default function Help({ isCompany, hasNavbar }) {
  if (isCompany) {
    return (
      <div className="flex flex-col mb-3">
        {isCompany && hasNavbar && <CNavBar />}
        <div className="flex flex-col justify-center items-center ml-11 mr-11">
          <h3 className="text-center">How does this app work?</h3>
          <h2 className="italic font-semibold">For Companies</h2>
          <div className="flex flex-col justify-center items-center p-10 shadow-xl bg-lightGreen border border-green mt-10 mb-10 ml-auto mr-auto rounded-lg">
            <p>
              If you are a <b>company representative</b>, then you’ll create an
              account for this company and you will post jobs. Based on the jobs
              tags, in the company’s profile you can see all the jobs posted and
              users that match them, sorted by a matching score based on their
              skills.
            </p>
          </div>
          <h3>How to add a Job</h3>
          <div className="flex flex-col justify-center items-center p-10 shadow-xl bg-lightGreen border border-green mt-10 mb-10 ml-auto mr-auto rounded-lg">
            <p>
              {" "}
              You’ll go to <b>Add Job</b> from the navbar menu, then fill the
              form's fields and press 'Add Job'. That's it! You got a new job
              posted!
            </p>
          </div>
          <br></br>
          <h3>How does this app work?</h3>
          <h2 className="italic font-semibold">For Users</h2>
          <div className="flex flex-col justify-center items-center p-10 ">
            <p>
              If you are a <b>user</b> and you’re looking for a job, you have to
              create a strong profile. <br></br>
              <br></br>
              <b>First,</b> add your hard skills ( choose from the list ) - Hard
              skills are specific abilities, or capabilities, that an individual
              can possess and demonstrate in a measured way. Possessing a hard
              skill connotes mastery and an expertise within the individual to
              perform a specific task or series of tasks to complete a{" "}
              <b> job</b>. <br></br>
              <br></br>
              Based on your skills, the app will recommend you jobs from the
              companies that you’ll be following. Then, add your
              <b>education, courses, experience, projects and CV.</b>
            </p>
          </div>
          <h3>How to follow a company?</h3>
          <div className="flex flex-col justify-center items-center p-10 ">
            <p>
              You’ll go to <b>Search Company</b> from the navbar menu, then
              you’ll either search for a specific company or follow some
              companies from the suggestion. It it important to follow many
              companies for the app to recommend many jobs for you.
            </p>
          </div>
          <h3>How to search for a Job?</h3>
          <div className="flex flex-col justify-center items-center p-10 ">
            <p>
              You’ll go to <b>Search Job</b> from the navbar menu, then you’ll
              complete the form and press “Filter Jobs”. Based on your
              selections, jobs will be displayed according to them.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col mb-3">
        {isCompany && hasNavbar && <CNavBar />}
        {!isCompany && hasNavbar && <NavbarLog />}

        <div className="flex flex-col justify-center items-center ml-11 mr-11">
          <h3 className="text-center mt-5">How does this app work?</h3>
          <h2 className="italic font-semibold">For Users</h2>
          <div className="flex  flex-col items-center m-auto lg:flex-row  justify-center">
            {/* poza */}
            <div className="flex flex-row w-full m-auto lg:flex-col justify-center items-center lg:self-left lg:w-1/3  lg:p-10 ">
              <img src={firstImageHelp}></img>
            </div>
            {/* textul */}
            <div className="flex flex-row w-full lg:flex-col  justify-center items-center lg:self-right lg:p-10 lg:w-1/2 ">
              <p>
                If you are a <b>user</b> and you’re looking for a job, you have
                to create a strong profile. <br></br>
                <br></br>
                <b>First,</b> add your hard skills ( choose from the list ) -
                Hard skills are specific abilities, or capabilities, that an
                individual can possess and demonstrate in a measured way.
                Possessing a hard skill connotes mastery and an expertise within
                the individual to perform a specific task or series of tasks to
                complete a <b> job</b>. <br></br>
                <br></br>
                Based on your skills, the app will recommend you jobs from the
                companies that you’ll be following. Then, add your
                <b>education, courses, experience, projects and CV.</b>
              </p>
            </div>
          </div>

          <h3 className="text-center mt-7">How to follow a company?</h3>
          <div className="flex  flex-col items-center m-auto lg:flex-row  justify-center">
            <div className="flex flex-row w-full lg:flex-col  justify-center items-center lg:self-right lg:p-10 lg:w-1/2 ">
              <p>
                You’ll go to <b>Search Company</b> from the navbar menu, then
                you’ll either search for a specific company or follow some
                companies from the suggestion. It it important to follow many
                companies for the app to recommend many jobs for you.
              </p>
            </div>
            <div className="flex flex-row w-full m-auto lg:flex-col justify-center items-center lg:self-right lg:w-1/3  lg:p-10 ">
              <img src={secondImageHelp} ></img>
            </div>
          </div>

          <h3 className="text-center mt-7">How to search for a Job?</h3>
          <div className="flex  flex-col items-center m-auto lg:flex-row  justify-center">
            <div className="flex flex-row w-full m-auto lg:flex-col justify-center items-center lg:self-left lg:w-1/3  lg:p-10 ">
              <img src={thirdImageHelp} ></img>
            </div>
            <div className="flex flex-row w-full lg:flex-col  justify-center items-center lg:self-right lg:p-10 lg:w-1/2 ">
              <p>
                You’ll go to <b>Search Job</b> from the navbar menu, then you’ll
                complete the form and press “Filter Jobs”. Based on your
                selections, jobs will be displayed according to them.
              </p>
            </div>
          </div>

          <br></br>
          <h2 className="italic font-semibold">For Companies</h2>
          <div className="flex  flex-col items-center m-auto lg:flex-row  justify-center">
            <div className="flex flex-row w-full lg:flex-col  justify-center items-center lg:self-right lg:p-10 lg:w-1/2 ">
              <p>
                If you are a <b>company representative</b>, then you’ll create
                an account for this company and you will post jobs. Based on the
                jobs tags, in the company’s profile you can see all the jobs
                posted and users that match them, sorted by a matching score
                based on their skills.
              </p>
            </div>
            <div className="flex flex-row w-full m-auto lg:flex-col justify-center items-center lg:self-right lg:w-1/3  lg:p-10">
              <img src={companyImageHelp} ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
