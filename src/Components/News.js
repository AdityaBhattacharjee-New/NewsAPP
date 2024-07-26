import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [
    {
      source: {
        id: null,
        name: "Hollywood Reporter",
      },
      author: "Pamela McClintock",
      title:
        "Box Office: ‘Inside Out 2’ Heading for Historic $140M-$150M U.S. Opening, a Near-Record for Pixar - Hollywood Reporter",
      description:
        "The tentpole is jolting the beleaguered box office back to life and will be the second- or third-biggest animated opening of all time.",
      url: "http://www.hollywoodreporter.com/movies/movie-news/inside-out-2-box-office-historic-pixar-opening-1235923598/",
      urlToImage:
        "https://www.hollywoodreporter.com/wp-content/uploads/2024/05/INSIDE-OUT-2-ONLINE-USE-pubstill.pub16-copy.jpg?w=1024",
      publishedAt: "2024-06-15T16:18:45Z",
      content:
        "Where to begin in describing the emotions Hollywood and theater owners  — not to mention Pixar and its parent company Disney — are likely feeling over the stunning start of Inside Out 2 at the box of… [+3854 chars]",
    },
    {
      source: {
        id: "cnn",
        name: "CNN",
      },
      author: "Jacopo Prisco",
      title:
        "How primordial black holes could explain the enduring mystery of dark matter - CNN",
      description:
        "Scientists studying the earliest black holes may have found an answer to dark matter, putting Stephen Hawking’s theory on the subject back into the spotlight.",
      url: "https://www.cnn.com/2024/06/17/science/black-holes-dark-matter-scn/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/chandra-bullett-preview.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2024-06-17T10:06:00Z",
      content:
        "Sign up for CNNs Wonder Theory science newsletter. Explore the universe with news on fascinating discoveries, scientific advancements and more.\r\nFor about 50 years, the scientific community has been … [+8971 chars]",
    },
    {
      source: {
        id: null,
        name: "MacRumors",
      },
      author: "Tim Hardwick",
      title:
        "Kuo: Apple Watch Series 10 to Get Larger Screen and Thinner Design - MacRumors",
      description:
        "This year's Apple Watch Series 10 will be thinner and come in larger screen sizes than previous models, according to Apple analyst Ming-Chi Kuo. ...",
      url: "https://www.macrumors.com/2024/06/17/kuo-apple-watch-series-10-larger-screen-thinner/",
      urlToImage:
        "https://images.macrumors.com/t/pVBvl-VPaeZH8xg2tqA-k2Lsl-w=/1960x/article-new/2023/08/apple-watch-series-9-display.jpeg",
      publishedAt: "2024-06-17T08:20:07Z",
      content:
        "This year's Apple Watch Series 10 will be thinner and come in larger screen sizes than previous models, according to Apple analyst Ming-Chi Kuo.\r\nIn his latest industry note shared on Medium, Kuo sai… [+1081 chars]",
    },
    // {
    //   "source": {
    //     "id": null,
    //     "name": "Yahoo Entertainment"
    //   },
    //   "author": null,
    //   "title": "Nvidia's shares flashes key warning sign - Yahoo Finance",
    //   "description": null,
    //   "url": "https://finance.yahoo.com/news/nvidias-shares-flashes-key-warning-080008414.html",
    //   "urlToImage": null,
    //   "publishedAt": "2024-06-17T08:00:08Z",
    //   "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    // },
  ];
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      Loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=abdf11f8f5cc41749c8367ce67c4c2f2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ Loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      Loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsAdda`;
    this.updateNews();
    
  }

  // handleNextClick = async () => {
  // console.log("Next");
  // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=abdf11f8f5cc41749c8367ce67c4c2f2&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ Loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // this.setState({  })
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     Loading: false,
  //   });
  // }

  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  // handlePrevClick = async () => {
  //   // console.log("Previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=abdf11f8f5cc41749c8367ce67c4c2f2&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ Loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // // this.setState({  })
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   Loading: false,
  //   // });
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=abdf11f8f5cc41749c8367ce67c4c2f2&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    // this.setState({ Loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // Loading: false,
    });
  };
  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 20px", marginTop: "90px" }}
        >
          NewsAdda - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.Loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      readMore={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div
          disabled={this.state.page <= 1}
          className="container d-flex justify-content-between"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; previous
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
