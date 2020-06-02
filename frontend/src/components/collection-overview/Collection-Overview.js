import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Collection-Overview.scss";

import CollectionPreview from "../collection-preview/Collection-Preview";
import { selectCollectionForOverview } from "../../redux/shop/shop.selector";

const CollectionOverview = ({ collections, match, history }) => (
  <div className="collection-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview
        key={id}
        match={match}
        history={history}
        {...otherCollectionProps}
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForOverview
});

export default connect(mapStateToProps)(CollectionOverview);
