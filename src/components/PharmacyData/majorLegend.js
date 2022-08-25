import "./majorLegend.css";
const MajorLegend = () => {
    return (
        <div className="legend">

            <div style={{ "--color": '#e31a1c' }}>Walgreens</div>
            <div style={{ "--color": '#b2df8a' }}>CVS</div>
            <div style={{ "--color": '#ff7f00' }}>Kroger</div>
            <div style={{ "--color": '#33a02c' }}>Tom Thumb</div>
            <div style={{ "--color": '#fb9a99'}}>H.E.B</div>
            <div style={{ "--color": '#fdbf6f' }}>Costco</div>
            <div style={{ "--color": '#1f78b4' }}>Randalls</div>
            <div style={{ "--color": '#cab2d6' }}>Sam's Club</div>
            <div style={{ "--color": '#a6cee3' }}>Walmart</div>
        </div>
    );
}

export default MajorLegend;