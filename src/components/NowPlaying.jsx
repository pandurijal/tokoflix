import React from "react";
import { Link } from "react-router-dom";

const NowPlaying = props => {
  return (
    <div>
      <h2>Now Playing</h2>
      <div>
        <ul>
          {props.movLists.map(m => {
            let id = m.id;
            let title = m.title;
            title = title.toLowerCase();
            title = title.replace(/\s/g, "-");
            let slug = "".concat(id, "-", title);
            return (
              <li key={m.id}>
                <h3>
                  <Link
                    to={{
                      pathname: `/movie/${slug}`,
                      state: { id: id }
                    }}
                  >
                    {m.title}
                  </Link>
                </h3>
                <h4>{m.overview}</h4>
              </li>
            );
          })}
        </ul>
        {/* <button onClick={props.loadMore}>Laaaaaaoad More</button> */}
      </div>
    </div>
  );
};

export default NowPlaying;
