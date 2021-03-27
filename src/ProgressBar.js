import React from "react";
const ProgressBar = (props) => {
    const { bgcolor, value, completed, label, visible } = props;

    const containerStyles = {
        height: 20,
        width: "80%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50,
        display: visible,
    };

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: "inherit",
        textAlign: "right",
        transition: "1s ease",
        transitiondelay: "0.5s",
    };

    const labelStyles = {
        padding: 5,
        color: "white",
        fontWeight: "bold",
    };

    if (completed !== undefined || value !== undefined || label !== undefined) {
        return (
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{label}%</span>
                </div>
                <h4 style={{ marginBottom: 20 }}>Current value: {value}</h4>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ProgressBar;
