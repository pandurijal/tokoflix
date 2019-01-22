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
    return (
      <div className="pagination">
        <Link to={{ pathname: `/page/${page - 1}` }}>
          <button onClick={this.props.onPrev} {...prevBtn}>
            Prev
          </button>
        </Link>
        <Link to={{ pathname: `/page/${page + 1}` }}>
          <button onClick={this.props.onNext} {...nextBtn}>
            Next
          </button>
        </Link>
      </div>
    );
  }
}

export default Pagination;
