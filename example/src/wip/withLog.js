import React from "react";

// Console logs component name if component is rendered by reconciliation starting in its parent
const withLog = Component => props => {
  console.log(`${Component.name}`);
  return <Component {...props} />;
}

export default withLog;