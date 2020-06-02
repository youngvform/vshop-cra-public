import React from "react";

import CollectionItem from "../collection-item/Collection-Item";

import "./Collection-Preview.scss";

const CollectionPreview = ({ title, items, match, history }) => (
  <div className="collection-preview">
    <h1
      className="title"
      onClick={() => {
        history.push(`${match.path}/${title.toLowerCase()}`);
      }}
    >
      {title.toUpperCase()}
    </h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
