// AdsBoard.d.ts
declare module '*.tsx' {  // Tell TS to treat .jsx files as modules
    import React from 'react';
    const content: React.ComponentType<any>; // AdsBoard can accept any props
    export default content;
  }