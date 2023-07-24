
import './App.css';
import monkey from "./pics/monkey.png";

function LogoLink() {
  return(
    <div>
      <a href="https://www.youtube.com/watch?v=UmqupMGGAcM">
        <img src={monkey} alt="monkey getting haircut"/>
      </a>
    </div>
  );
}

function Name() {
  return (
    <h2>Name</h2>
  );
}

function Title() {
  return (
    <h2>Title</h2>
  );
}


function Rating() {
  return (
    <div>
      Rating
    </div>
  );
}

function CompanyDetails() {
  return (
    <>
      <Name></Name>
      <Title></Title>
      <Rating></Rating>
    </>
  );
}

function AddedJob() {
  return (
    <div className="container">
      <LogoLink />
      <CompanyDetails />
      </div>
    ); 
}



export default function App() {
  return (
    <div>
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
      <AddedJob />
    </div>
  );
}

/********************************ADD NEW JOB COMPONENTS */
function AddJobButton() {
  return(
    <button>
      
    </button>
  );
}


function AddNewJob() {

}
