import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagination extends Component {
  state = {};

  render() {
    const page = this.props.page;
    const totalPages = this.props.totalPages;
    let prevBtn = {};
    let nextBtn = {};
    if (page === 1) {
      prevBtn["hidden"] = "hidden";
    }
    if (page === totalPages) {
      nextBtn["hidden"] = "hidden";
    }
    let prevPage = page - 1;
    let nextPage = page + 1;
    console.log("props page", this.props.page);
    return (
      <div className="pagination">
        <Link to={{ pathname: `/page/${prevPage}`, state: { pg: prevPage } }}>
          <button onClick={this.props.onPrev} {...prevBtn}>
            Prev
          </button>
        </Link>
        <Link to={{ pathname: `/page/${nextPage}`, state: { pg: nextPage } }}>
          <button onClick={this.props.onNext} {...nextBtn}>
            Next
          </button>
        </Link>
      </div>
    );
  }
}

export default Pagination;
