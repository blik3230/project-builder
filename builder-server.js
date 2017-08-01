const express = require('express');
const server = require('./builder/start-kit-js/server');
const router = require('./builder/start-kit-js/router');
const requestHandler = require('./builder/start-kit-js/requestHandlers');

server.start(express, router, requestHandler);