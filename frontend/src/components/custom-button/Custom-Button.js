import React from "react";

import { CustomButtonContainer } from "./Custom-Button.styles";

const CustomButton = ({ children, ...others }) => (
  <CustomButtonContainer {...others}>{children}</CustomButtonContainer>
);
export default CustomButton;
