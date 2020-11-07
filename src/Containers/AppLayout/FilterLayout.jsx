import React, { memo } from "react";
// import { StyledLayout, StyledContent } from './styles';
import FilterHeader from "./FilterHeader";
import Footer from "./Footer";

export const FilterLayout = ({ parentCallback, children }) => {

    return (
    <div className="commonLayout">
        <FilterHeader parentCallback2={parentCallback}/>
            {children}
        <Footer />
    </div>
    );
};

export default FilterLayout;
