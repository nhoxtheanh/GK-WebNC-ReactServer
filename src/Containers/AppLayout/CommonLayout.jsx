import React, { memo } from "react";
// import { StyledLayout, StyledContent } from './styles';
import Header from "./Header";
import Footer from "./Footer";

const CommonLayout = ({ children }) => (
    <div className="commonLayout">
        <Header />
            {children}
        <Footer />
    </div>
);

export default memo(CommonLayout);
