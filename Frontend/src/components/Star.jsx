import React from "react";
import { FaStar } from "react-icons/fa";
import { Outlet } from "react-router-dom";

class Star extends React.Component {
  render() {
    return (
      <>
        {this.props.rating == null ? (
          <small className="text-muted">No rating yet</small>
        ) : (
          <>
            {[...Array(this.props.rating)].map((star, index) => {
              return <FaStar className="text-warning" key={"star" + star + index}/>;
            })}
            {[...Array(5 - this.props.rating)].map((star, index) => {
              return <FaStar className="text-muted" key={"star" + star + (5-index)}/>;
            })}
          </>
        )}
        <Outlet />
      </>
    );
  }
}

export default Star;
