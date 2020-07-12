#!/bin/bash

if [ -f "logger.log" ]
then
	rm logger.log
fi

phantomjs logger-tests.js
