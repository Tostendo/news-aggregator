import React, { Component } from "react";
import Footer from "./components/footer/footer.component";
import { Switch, Route } from "react-router-dom";

import { FeedMessage } from "./types/message";

import "./App.scss";
import { Navbar } from "./components/navbar/navbar.component";
import Feed from "./components/feed/feed.component";
import UpsertFeed from "./components/upsert-feed/upsert-feed.component";

type State = {
  news: FeedMessage[];
  filtered: FeedMessage[];
  searchField: string;
  isLoading: boolean;
  allSources: { label: string; value: string }[];
  selectedSources: { label: string; value: string }[];
};

class App extends Component<{}, State> {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create">
            <UpsertFeed />
          </Route>
          <Route
            path="/feed/:feedId/edit"
            render={({ match }) => <UpsertFeed {...match} />}
          ></Route>
          <Route
            path="/feed/:feedId"
            render={({ match }) => <Feed match={match} />}
          />
          <Route path="/" render={() => <Feed match={null} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
