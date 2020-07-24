import React, { Component } from "react";
import Spinner from "./components/with-spinner/spinner.component";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box";
import Footer from "./components/footer/footer.component";

import { getServerUrl } from "./utils/server.utils";

import { FeedMessage } from "./types/message";

import "./App.scss";

type State = {
  news: FeedMessage[];
  searchField: string;
  isLoading: boolean;
};

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      news: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch(`${getServerUrl()}/api/feeds`)
      .then((response) => response.json())
      .then((news) =>
        this.setState({
          isLoading: false,
          news: news["entries"],
        })
      )
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        console.error(err);
      });
  }

  handleSearch = (e: any) => {
    this.setState({
      searchField: e.target.value,
    });
  };

  render() {
    const { news, searchField } = this.state;
    const filtered = news.filter((message: any) =>
      message.title.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>News Me</h1>
        <SearchBox
          placeholder="Search news.."
          handleSearch={this.handleSearch}
        />
        {this.state.isLoading ? <Spinner /> : <CardList news={filtered} />}
        <Footer />
      </div>
    );
  }
}

export default App;
