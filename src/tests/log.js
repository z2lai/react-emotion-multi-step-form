import React from "react";

const log = Component => props => {
    console.log(`${Component.name}`);
    return <Component {...props} />;
}

export default log;