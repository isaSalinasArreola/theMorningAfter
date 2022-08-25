import "./accessibilityLegend.css";
const AccessibilityLegend = () => {
    return (
        <div className="legend">
            <div style={{ "--color": '#7a0177' }}>Excellent</div>
            <div style={{ "--color": '#ae017e' }}>Very Good</div>
            <div style={{ "--color": '#dd3497' }}>Good</div>
            <div style={{ "--color": '#f768a1' }}>Okay</div>
            <div style={{ "--color": '#fa9fb5'}}>Standard</div>
            <div style={{ "--color": '#fcc5c0' }}>Below Standard</div>
            <div style={{ "--color": '#feebe2' }}>None</div>
        </div>
    );
}

export default AccessibilityLegend;