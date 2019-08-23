import React, { Component } from 'react';

import {connect,Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import reducer from '../reducers';

import axios from 'axios';


const loggerMiddleware = createLogger({ predicate: () => __DEV__  });

const enhancer = compose(
    applyMiddleware(
      thunk, // lets us dispatch() functions
      loggerMiddleware
    ),
  );

export default function configureStore(initialState) {
	return createStore(reducer, initialState, enhancer);
}