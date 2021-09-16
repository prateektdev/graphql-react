import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import Button from "../StyledComponents/Button";
import ListElement from "../StyledComponents/ListElement";
import Title from "../StyledComponents/Title";

// for querying the topic from grahpql github api with search as a string parameter
const GET_TOPICS = gql`
query SearchTopics($search: String!) {
  search(query: $search, type: REPOSITORY, first: 15) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          stargazers {
            totalCount
          }
          resourcePath
          repositoryTopics(first: 15) {
            totalCount
            nodes {
              topic {
                name
                stargazerCount
                relatedTopics {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
function TopicResult(props) {
  //This is the related topics list component
  let searchTerm = props.value;
  const [newTopic, setTopic] = useState(searchTerm);

  let search;

  if (searchTerm === newTopic) {   //checking if current searchTerm and the clicked topic is same or not
    search = searchTerm
  } else {
    search = newTopic             //else calling the query for topics
    searchTerm = newTopic;
    props.onChange(search);
  }

  //using the hook to query the topics
  const { loading, error, data } = useQuery(GET_TOPICS,
    {
      variables: { search } //passing dynamic variable for searching
    });

  // show a loading spinner until the request is completed
  if (loading) {
    return (
      <div>
        <i className="fa fa-spinner fa-spin mr-4" />
        <span>...Searching for {search}</span>
      </div>
    );
  }
  // if error is returned show this message
  if (error) return <div>
    <span>Error! {error.message}</span>
  </div>;

  // if no results are returned show this message
  if (data.search.edges && data.search.edges.length === 0) return <div>
    <span>No Topics found for this</span>
  </div>;

  return (
    <React.Fragment>
      {/* iterating over the returned topics*/}
      {data && data.search.edges && data.search.edges.map((edge, index) => (
        <ul className="list-group" key={index}>
          <ListElement className="list-group-item">
            <div className="d-flex justify-content-start">
              <span className="text-primary mr-2">{edge.node.resourcePath}</span>
              <span> <i className="fa fa-star mr-2" aria-hidden="true" />{edge.node.stargazers.totalCount}</span>
            </div>
            <div className=" row">
              <Title >Related Topics:</Title>
              {/* iterating over the sub related topics of each topic*/}
              <div >
                {edge.node.repositoryTopics.nodes.length === 0 ? <span>No topics</span> : edge.node.repositoryTopics.nodes.map((node, j) => (
                  <Button key={j}
                    onClick={() => setTopic(node.topic.name)}
                    type="button" className="btn btn-outline-primary btn mx-2 my-2">{node.topic.name}
                    <span className="text-dark"><i className="fa fa-star m1-2" aria-hidden="true" />{node.topic.stargazerCount}</span></Button>
                ))}

              </div>
            </div>
          </ListElement>
        </ul>
      ))}
    </React.Fragment>
  );
}

export default TopicResult;