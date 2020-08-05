import React, { Component } from "react";
import MultiSelect from "react-multi-select-component";
import Spinner from "./components/with-spinner/spinner.component";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box";
import Footer from "./components/footer/footer.component";
import { CustomButton } from "./components/custom-button/custom-button.component";

import { getServerUrl } from "./utils/server.utils";

import { FeedMessage } from "./types/message";

import "./App.scss";

type State = {
  news: FeedMessage[];
  filtered: FeedMessage[];
  searchField: string;
  isLoading: boolean;
  allSources: { label: string; value: string }[];
  selectedSources: { label: string; value: string }[];
};

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      news: [],
      filtered: [],
      searchField: "",
      allSources: [],
      selectedSources: [],
    };
  }

  loadData = () => {
    console.info("click");
    this.setState({
      isLoading: true,
    });
    fetch(`${getServerUrl()}/api/feeds`)
      .then((response) => response.json())
      .then((news) =>
        this.setState({
          isLoading: false,
          news: news["entries"],
          allSources: news["sources"].map((source: string) => {
            return {
              label: source,
              value: source.toLowerCase(),
            };
          }),
        })
      )
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        console.error(err);
      });
  };

  componentDidMount() {
    this.loadData();
  }

  handleSearch = (e: any) => {
    this.setState({
      searchField: e.target.value,
    });
  };

  handleSelect = (selected: any[]) => {
    this.setState({
      selectedSources: selected,
    });
  };

  // FIXME(TO): This should be refactored soon.
  getFilteredResults = () => {
    const { news, searchField, selectedSources } = this.state;
    if (!searchField && selectedSources.length === 0) {
      return news;
    }

    const selectedFeeds = selectedSources.map((source) => source.value);

    if (!searchField) {
      return news.filter((message: FeedMessage) =>
        selectedFeeds.includes(message.feed_name.toLowerCase())
      );
    }

    if (selectedSources.length === 0) {
      return news.filter((message: FeedMessage) => {
        return (
          message.title.toLowerCase().includes(searchField.toLowerCase()) ||
          message.feed_name.toLowerCase().includes(searchField.toLowerCase())
        );
      });
    }

    return news.filter((message: FeedMessage) => {
      return (
        (message.title.toLowerCase().includes(searchField.toLowerCase()) ||
          message.feed_name
            .toLowerCase()
            .includes(searchField.toLowerCase())) &&
        selectedFeeds.includes(message.feed_name.toLowerCase())
      );
    });
  };

  render() {
    const filtered = this.getFilteredResults();
    return (
      <div className="App">
        <h1>News Me</h1>
        <div className="filters">
          <SearchBox
            placeholder="Search news.."
            handleSearch={this.handleSearch}
          />
          <MultiSelect
            options={this.state.allSources}
            value={this.state.selectedSources}
            onChange={this.handleSelect}
            labelledBy={"Select"}
            overrideStrings={{
              selectSomeItems: "Select feeds ...",
              allItemsAreSelected: "All feeds are selected.",
              selectAll: "Select All",
              search: "Search",
            }}
          />
        </div>
        <CustomButton onClick={() => this.loadData()}>
          <div className="icon-reload"></div>
        </CustomButton>
        {this.state.isLoading ? <Spinner /> : <CardList news={filtered} />}
        <Footer />
      </div>
    );
  }
}

export default App;
