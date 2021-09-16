import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";
import Topic from './components/Topic';
import { useState } from 'react'; 
import './App.css';

// creating Apollo Client with our personal token for github graphql api
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
});

function App() {
  const [searchValue, setSearchValue] = useState("react");
  return (
    <ApolloProvider client={client}> {/* passing the apollo graphql client to child components*/}
      <div className="App">
        <Topic searchValue={searchValue} onSearchInputChange={setSearchValue} ></Topic>
      </div>
    </ApolloProvider>
  );
}

export default App;