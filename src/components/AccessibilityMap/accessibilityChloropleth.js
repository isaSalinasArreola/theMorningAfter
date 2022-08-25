import React from 'react';
import Legend from "./accessibilityLegend";
import AccessibilityMap from "./accessibilityMap";
import './accessibilityChloropleth.css'

const AccessibilityChloropleth = () => {
    return(
        <div className = 'container'>
            <div className = "header">
                <h2 className ='heading'>Accessibility of Low Cost and Free Emergency Contraceptives in Texas by County</h2>
                <p className = "text-muted">A chloropleth map displaying accessibility of emergency contraception through free organizations and Title X clinics.</p>
            </div>
            <div className = 'container'>
                <AccessibilityMap/>
                <Legend />
            </div>
        <div className = "footer">
            <p>Scores for each county were calculated taking into consideration the following: barriers by location, cost, wait times, delivery times, and ease of request. Our standard is defined by a minimum of 1 clinic and 1 free access option per county.</p>
        </div>
        </div>
    );
}

export default AccessibilityChloropleth;