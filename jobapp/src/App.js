
import './App.css';
import monkey from "./pics/monkey.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {  useRef, useState } from 'react';

library.add(fas);

let jobs = {};

if (typeof window !== 'undefined') {
  
  const data = JSON.parse(localStorage.getItem("jobs"));
  
  if (data === null) {
    localStorage.setItem("jobs", JSON.stringify({}));
  }
  else {
    jobs = data;
  }
  
}

function LogoLink({pic}) {
  return(
    <div >
      <a href="https://www.youtube.com/watch?v=UmqupMGGAcM">
        <img src={pic} alt="monkey getting haircut"/>
      </a>
    </div>
  );
}


function AddedJob({pic, companyName, jobTitle, rating, url}) {
  return (
    <div className="container">
      
        <LogoLink pic={pic}/>
        <h2>{companyName}</h2>
        <h2>{jobTitle}</h2>
        <h2>{rating}</h2>
        <h2>{url}</h2>
      
    </div>
  ); 
}

function JobCard() {
   
   const arr = [];
   for (let key in jobs) {
      let value = jobs[key];
      
      arr.push(<AddedJob pic={monkey} 
                         companyName={value.companyName}
                         jobTitle={value.jobTitle}
                         rating={value.rating}
                         url={value.url}
                         key={value.companyName + value.jobTitle}
              />)
   }
  
   return (
    <>
      
      <AddJobCard />
      {arr}
    </>  
  );
}

export default function App() {

  return (
    <div>
      <JobCard />      
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

function JobForm({showForm, setShowForm}) {
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
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    jobs[key] = info;
    
    localStorage.setItem("jobs", JSON.stringify(jobs));
    
    setShowForm(!showForm);

  }

  return (
    <div className="container">
      <button style={{display: "block"}}onClick={() => setShowForm(!showForm)} >Go Back</button>
      
      
        <label htmlFor="companyName">
          Company Name
          <input ref={companyNameRef} 
                 type="text" 
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

        <button onClick={handleAddButton}>Add</button>
        

      
    </div>
  );
}

function AddJobCard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? <JobForm 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                  /> 
                : <AddNewJob 
                    showForm={showForm} 
                    setShowForm={setShowForm} 
                  />
      }
    </>
  );
  
}