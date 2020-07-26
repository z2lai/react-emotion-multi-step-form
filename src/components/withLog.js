import React from "react";

// Logs if component is rendered by reconciliation starting in its parent
const withLog = Component => props => {
  console.log(`${Component.name}`);
  return <Component {...props} />;
}

export default withLog;