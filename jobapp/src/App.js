
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {  useRef, useState } from 'react';

library.add(fas);

let initialJobs = {};

if (typeof window !== 'undefined') {
  
  const data = JSON.parse(localStorage.getItem("jobs"));
  
  if (data === null) {
    localStorage.setItem("jobs", JSON.stringify({}));
  }
  else {
    initialJobs = data;
  }
  
}

function LogoLink({url}) {
  return(
    <div >
      <a href={url}>
        
        {url}
      </a>
    </div>
  );
}


function AddedJob({companyName, jobTitle, rating, url, currJobs, setCurrJobs}) {

  const buttonHandler = () => {
    const key = companyName + jobTitle;
    const jobs = JSON.parse(localStorage.getItem("jobs"));

    delete jobs[key];

    localStorage.setItem("jobs", JSON.stringify(jobs));

    setCurrJobs(jobs);
    
  }

  return (
    <div className="container">
      
        <LogoLink url={url}/>
        <h2>{companyName}</h2>
        <h2>{jobTitle}</h2>
        <h2>{rating}</h2>
        

        <button onClick={buttonHandler}>
          DELETE
        </button>
      
    </div>
  ); 
}

function JobCard({currJobs, setCurrJobs}) {
   

   const existingJobs = [];
   for (let key in currJobs) {
      let value = currJobs[key];
      
      existingJobs.push(<AddedJob 
                         companyName={value.companyName}
                         jobTitle={value.jobTitle}
                         rating={value.rating}
                         url={value.url}
                         key={value.companyName + value.jobTitle}
                         setCurrJobs={setCurrJobs}
                         currJobs={currJobs}
              />)
   }
  
   return (
    <>
      
      <AddJobCard currJobs={currJobs} setCurrJobs={setCurrJobs}/>
      {existingJobs}
    </>  
  );
}

export default function App() {
  const [currJobs, setCurrJobs] = useState(initialJobs);

  return (
    <div>
      <div>
        <h2>{Object.keys(currJobs).length > 1 ? `${Object.keys(currJobs).length} jobs` : `${Object.keys(currJobs).length} job` }</h2>
        <button onClick={()=> {
          localStorage.clear(); 
          localStorage.setItem("jobs", JSON.stringify({})); 
          setCurrJobs({})
        }}
        >CLEAR JOBS
        </button>
      </div> 
      <JobCard currJobs={currJobs} setCurrJobs={setCurrJobs}/>
           
    </div>
  );
}

/********************************ADD NEW JOB COMPONENTS */

function AddNewJob({showForm, setShowForm}) {
  return (
    <div className="container">
      <FontAwesomeIcon 
          className="fontawesomeIcon" 
          icon={["fas", "square-plus"]} 
          size="2xl"
          onClick={()=> setShowForm(!showForm)}
          />
    </div>
  );
}

function JobForm({showForm, setShowForm, currJobs, setCurrJobs}) {
  const companyNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const ratingRef = useRef(null);
  const urlRef= useRef(null);

  
  function handleAddButton() {
    const info = {companyName: companyNameRef.current.value, 
                  jobTitle: jobTitleRef.current.value, 
                  rating: ratingRef.current.value,
                  url: urlRef.current.value
    }
    const key = info.companyName + info.jobTitle;
    const newJobs = JSON.parse(localStorage.getItem("jobs"));
    
    newJobs[key] = info;
    localStorage.setItem("jobs", JSON.stringify(newJobs));
    

    setShowForm(!showForm);
    setCurrJobs(newJobs);
      
  }

  return (
    <div className="container">
      <button style={{display: "block"}}onClick={() => setShowForm(!showForm)} >Go Back</button>
      
      
      <label htmlFor="companyName">
        Company Name
        <input ref={companyNameRef} 
                type="text" 
                required={true}
                autoFocus/>
      </label>
      <label htmlFor="jobTitle">
        Job Title
        <input ref={jobTitleRef}
                type="text" />
      </label>
      <label htmlFor="rating">
        Rating
        <input ref={ratingRef}
                type="text"/>
      </label>
      <label htmlFor="url">
        URL
        <input ref={urlRef}
                type="text"/>
      </label>
      <button onClick={handleAddButton}>Submit</button>
        
      

        
        
        
    </div>
  );
}

function AddJobCard({currJobs, setCurrJobs}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? <JobForm 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    currJobs={currJobs}
                    setCurrJobs={setCurrJobs}
                  /> 
                : <AddNewJob 
                    showForm={showForm} 
                    setShowForm={setShowForm} 
                  />
      }
    </>
  );
  
}