import * as React from 'react';
import LocalDatabase from './database/LocalDatabase'

const DbContext = React.createContext(new LocalDatabase())

export default DbContext;
