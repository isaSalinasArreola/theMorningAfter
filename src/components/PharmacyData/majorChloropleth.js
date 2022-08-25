import React from 'react';
import MajorLegend from "./majorLegend";
import MajorMap from "./majorMap";
import './majorChloropleth.css'

const MajorChloropleth = () => {
    return(
        <div className = 'container'>
            <div className = "header">
                <h2 className ='heading'>Breakdown of Major Pharmacies in Texas at the County Level</h2>
                <p className = "text-muted">A chloropleth map displaying the dominant pharmacy in each county. Specifically mapping the largest pharmacy chains in Texas.</p>
            </div>
            <div className = 'container'>
                <MajorMap/>
                <MajorLegend />
            </div>
        <div className = "footer">
            <p></p>
        </div>
        </div>
    );
}

export default MajorChloropleth;