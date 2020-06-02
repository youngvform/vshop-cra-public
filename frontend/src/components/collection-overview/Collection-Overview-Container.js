import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/WithSpinner";
import CollectionOverview from "./Collection-Overview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionFetching
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;
