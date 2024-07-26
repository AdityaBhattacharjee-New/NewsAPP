import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, readMore, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              right: 0,
            }}
          >
            <span className=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://www.numerama.com/wp-content/uploads/2024/06/mini-cooper-e-02-203.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="badge text-bg-warning">New</span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={readMore} className="btn btn-sm btn-warning">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
