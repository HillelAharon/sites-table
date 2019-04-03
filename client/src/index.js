import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import SitesTable from "./components/SitesTable";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <SitesTable client={apolloClient} />
  </ApolloProvider>,
  document.getElementById("root")
);
