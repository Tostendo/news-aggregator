This small project gives you a simple UI with inline search for title and source of the news you like. 
The backend is written in Python and the frontend is TS React.
You can clone the repository and deploy it wherever you like. The UI is served via github pages and the backend via Heroku (free plan)

Check out: https://tostendo.github.io/news-aggregator/

There is an ENV variable called `SOURCES` that takes a list of rss feeds so you can configure your news page how you like it.

Note:
The Backend is actually capable of doing more (check out the server.py), i.e. it takes also a newsapi_key to get other information, event information and much more. If you like you can build the frontend for it. I will add this step by step.


# How to start the services locally

## UI
Start the UI with `yarn start`

## Server

Start the server with `./server.py`

