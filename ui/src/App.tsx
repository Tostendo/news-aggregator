import React, { Component } from "react";
import Footer from "./components/footer/footer.component";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import { Navbar } from "./components/navbar/navbar.component";
import Feed from "./components/feed/feed.component";
import UpsertFeed from "./components/upsert-feed/upsert-feed.component";
import FeedList from "./components/feed-list/feed-list.component";

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/create" element={<UpsertFeed />}></Route>
          <Route path="/feed/:feedId/edit" element={<UpsertFeed />}></Route>
          <Route path="/feed/:feedId" element={<Feed />} />
          <Route path="/feeds" element={<FeedList />} />
          <Route path="/" element={<Feed />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
