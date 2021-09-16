import React, { useEffect, useState } from "react";
import Button from "../StyledComponents/Button";
import Input from "../StyledComponents/Input";
import Title from "../StyledComponents/Title";
import TopicResult from "./TopicResult";
//This is the main component for topics
const Topic = (props) => { 
  const [searchTerm, setSearchTerm] = useState(props.searchValue);  

  //using this hook to update the searchbar value if clicked from related topics
  useEffect(() => {
    setSearchTerm(props.searchValue);
  },[props.searchValue]); //update only if the related topic is clicked

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-brand "><Title>Test task GraphQL</Title></div>
        <div className="form-inline">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control" type="search" placeholder="Search" aria-label="Search" />
          <Button className="btn btn-outline-primary my-2 my-sm-0" type="submit"
            onClick={() => props.onSearchInputChange(searchTerm)}>Search</Button>
        </div>
      </nav>
       {/* The current Topic searched*/}
      <h1><span className="text-info text-uppercase">{props.searchValue}</span></h1>
      <TopicResult key={props.searchValue} value={props.searchValue} onChange={props.onSearchInputChange} ></TopicResult>
    </React.Fragment>
  )
}
export default Topic;