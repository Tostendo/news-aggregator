import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Spinner from "../with-spinner/spinner.component";
import { CardList } from "../card-list/card-list.component";
import { SearchBox } from "../search-box/search-box";
import { CustomButton } from "../custom-button/custom-button.component";

import { getServerUrl } from "../../utils/server.utils";

import { FeedMessage } from "../../types/message";

import "./feed.style.scss";
import { useParams } from "react-router-dom";

const Feed = () => {
  const { feedId } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [allSources, setAllSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const loadData = (curerentFeedId: string | null | undefined) => {
    setisLoading(true);
    let fetchUrl = null;
    if (
      !curerentFeedId ||
      curerentFeedId === "" ||
      curerentFeedId === "example"
    ) {
      fetchUrl = `${getServerUrl()}/api/feeds`;
      console.error("No feedId, use default");
    } else {
      fetchUrl = `${getServerUrl()}/api/feeds/${curerentFeedId}`;
    }
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((loadedNews) => {
        setisLoading(false);
        setNews(loadedNews["entries"]);
        setFilteredNews(loadedNews["entries"]);
        setAllSources(
          loadedNews["sources"].map((source: string) => {
            return {
              label: source,
              value: source.toLowerCase(),
            };
          })
        );
        setTitle(loadedNews["title"]);
        setDescription(loadedNews["description"]);
      })
      .catch((err) => {
        setisLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    loadData(feedId);
  }, [feedId]);

  const handleSearch = (e: any) => {
    setSearchField(e.target.value);
    setFilteredNews(getFilteredResults(e.target.value, selectedSources));
  };

  const handleSelect = (selected: any) => {
    setSelectedSources(selected ?? []);
    setFilteredNews(getFilteredResults(searchField, selected));
  };

  const getFilteredResults = (
    searchInput: string,
    userSelectedSources: any
  ) => {
    if (
      (!searchInput || searchInput === "") &&
      userSelectedSources.length === 0
    ) {
      return news;
    }

    const selectedFeeds = userSelectedSources.map(
      (source: any) => source.value
    );

    if (!searchInput) {
      return news.filter((message: FeedMessage) =>
        selectedFeeds.includes(message.feed_name.toLowerCase())
      );
    }

    if (userSelectedSources.length === 0) {
      return news.filter((message: FeedMessage) => {
        return (
          message.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          message.feed_name.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
    }

    return news.filter((message: FeedMessage) => {
      return (
        (message.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          message.feed_name
            .toLowerCase()
            .includes(searchInput.toLowerCase())) &&
        selectedFeeds.includes(message.feed_name.toLowerCase())
      );
    });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="feed">
      <h1 className="feed-title">{title || "News Me"}</h1>
      {description && <p className="feed-description">{description}</p>}
      <div className="filters">
        <SearchBox placeholder="Search news.." handleSearch={handleSearch} />
        <MultiSelect
          options={allSources}
          value={selectedSources}
          onChange={handleSelect}
          labelledBy={"Select"}
          overrideStrings={{
            selectSomeItems: "Select feeds ...",
            allItemsAreSelected: "All feeds are selected.",
            selectAll: "Select All",
            search: "Search",
          }}
        />
      </div>
      <CustomButton onClick={() => loadData(feedId)}>
        <div className="icon-reload cursor"></div>
      </CustomButton>
      <CardList news={filteredNews} />
    </div>
  );
};

export default Feed;
