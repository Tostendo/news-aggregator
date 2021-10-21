import { Component } from "react";
import { MultiSelect } from "react-multi-select-component";
import Spinner from "../with-spinner/spinner.component";
import { CardList } from "../card-list/card-list.component";
import { SearchBox } from "../search-box/search-box";
import { CustomButton } from "../custom-button/custom-button.component";

import { getServerUrl } from "../../utils/server.utils";

import { FeedMessage } from "../../types/message";

import "./feed.style.scss";

type Props = {
  match?: any;
};

type State = {
  news: FeedMessage[];
  filtered: FeedMessage[];
  searchField: string;
  isLoading: boolean;
  allSources: { label: string; value: string }[];
  selectedSources: { label: string; value: string }[];
};

class Feed extends Component<Props, State> {
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
    this.setState({
      isLoading: true,
    });
    let fetchUrl = null;
    if (
      !this.props.match ||
      !this.props.match.params ||
      !this.props.match.params.feedId ||
      this.props.match.params.feedId === "" ||
      this.props.match.params.feedId === "example"
    ) {
      fetchUrl = `${getServerUrl()}/api/feeds`;
      console.error("No feedId, use default");
    } else {
      fetchUrl = `${getServerUrl()}/api/feeds/${
        this.props.match.params.feedId
      }`;
    }
    fetch(fetchUrl)
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
      <div>
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
      </div>
    );
  }
}

export default Feed;
