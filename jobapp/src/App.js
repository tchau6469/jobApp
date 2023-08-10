
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {  useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'

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
    <div className="logoLink">
      <a href={url} target="_blank" rel="noreferrer" >
        Click Here For Company Portal
      </a>
    </div>
  );
}


function AddedJob({companyName, jobTitle, rating, url, date, currJobs, setCurrJobs}) {

  const deleteJobHandler = () => {
    const key = companyName + jobTitle;
    const jobs = JSON.parse(localStorage.getItem("jobs"));

    delete jobs[key];

    localStorage.setItem("jobs", JSON.stringify(jobs));

    setCurrJobs(jobs);
    
  }

  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete this job? ',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteJobHandler()
        },
        {
          label: 'No',
        }
      ]
    });
  }

  
  console.log("CURR DATE: " + typeof(date) + date);
  
  
  return (
    <div className="container">
      
        <LogoLink url={url} />
        <h2>Name: <br />{companyName}</h2>
        <h2>Title: <br />{jobTitle}</h2>
        <h2>Rating: <br />{rating}</h2>
        <h2>Date Applied: <br />{date.slice(4,15)}<br /></h2>
        

        <button style={{position: "absolute", bottom: "10px", marginLeft: "-2rem" }}onClick={confirmDelete}>
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
                         date={value.date}
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
      <p>Filter by rating? 
        <input onChange={(e) => setShouldFilter(e.target.checked)} 
                checked={shouldFilter} 
                id="filter" 
                name="filter" 
                type="checkbox"
                />
      </p>
  );
}

export default function App() {
  const [currJobs, setCurrJobs] = useState(initialJobs);
  const [shouldFilter, setShouldFilter] = useState(false);

  const wipeLocalStorage = () => {
    localStorage.clear(); 
    localStorage.setItem("jobs", JSON.stringify({})); 
    setCurrJobs({});
  }

  const confirmClearStorage = () => {
    confirmAlert({
      title: 'Delete ALL jobs? ',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => wipeLocalStorage()
        },
        {
          label: 'No',
        }
      ]
    });
  }
  
  return (
    <div>
      <div>
        <h2 style={{textAlign: "center", color: 'orange'}}>{Object.keys(currJobs).length > 1 ? `${Object.keys(currJobs).length} jobs` : `${Object.keys(currJobs).length} job` }</h2>
        <div className="optionsMenu">
          <FilterBox shouldFilter={shouldFilter} setShouldFilter={setShouldFilter}/>
          <button onClick={confirmClearStorage}>CLEAR JOBS</button>
        </div> 
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
                  url: urlRef.current.value,
                  date: Date()
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
      <button style={{display: "block", marginTop: "2.5rem", marginLeft: "1.5rem" }}onClick={() => setShowForm(!showForm)} >Go Back</button>
      
      
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
      <button onClick={handleAddButton} style={{marginTop: "1.5rem"}}>Submit</button>

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