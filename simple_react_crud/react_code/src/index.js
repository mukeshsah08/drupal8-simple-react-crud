import React from 'react';
import ReactDOM from 'react-dom';

//for global configuration
import config from 'react-global-configuration';
import configuration from './config';

import App from './components/App';

config.set(configuration);

ReactDOM.render(<App />, document.getElementById('app'));
