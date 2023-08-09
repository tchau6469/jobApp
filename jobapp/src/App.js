
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

function JobCard({currJobs, setCurrJobs, shouldFilter, setShouldFilter}) {
   

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
   
   if (shouldFilter) {
    existingJobs.sort((a,b)=> {
      
      return b.props.rating - a.props.rating;
    });
   }
  
   return (
    <>
      
      <AddJobCard currJobs={currJobs} setCurrJobs={setCurrJobs}/>
      {existingJobs}
    </>  
  );
}

function FilterBox({shouldFilter, setShouldFilter}) {
  return (
    <div>
      <label htmlFor="filter">Filter by rating?
        <input onChange={(e) => setShouldFilter(e.target.checked)} 
                checked={shouldFilter} 
                id="filter" 
                name="filter" 
                type="checkbox"
                style={{}}/>
      </label>
    </div> 
  );
}

export default function App() {
  const [currJobs, setCurrJobs] = useState(initialJobs);
  const [shouldFilter, setShouldFilter] = useState(false);

  
  return (
    <div>
      <div>
        <h2>{Object.keys(currJobs).length > 1 ? `${Object.keys(currJobs).length} jobs` : `${Object.keys(currJobs).length} job` }</h2>
        <FilterBox shouldFilter={shouldFilter} setShouldFilter={setShouldFilter}/>
        <button onClick={()=> {
          localStorage.clear(); 
          localStorage.setItem("jobs", JSON.stringify({})); 
          setCurrJobs({})
        }}
        >CLEAR JOBS
        </button>
      </div> 
      <JobCard currJobs={currJobs} setCurrJobs={setCurrJobs} shouldFilter={shouldFilter} setShouldFilter={setShouldFilter}/>
           
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
               autoFocus
               className="formInputs"/>
      </label>
      <label htmlFor="jobTitle">
        Job Title
        <input ref={jobTitleRef}
               type="text" 
               className="formInputs"/>
      </label>
      <label htmlFor="rating">
        Rating
        <input ref={ratingRef}
               type="text"
               className="formInputs"/>
      </label>
      <label htmlFor="url">
        URL
        <input ref={urlRef}
               type="text"
               className="formInputs"/>
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