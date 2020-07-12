#!/bin/bash

if [ -f "logger.log" ]
then
	rm logger.log
fi

node logger-tests.js
