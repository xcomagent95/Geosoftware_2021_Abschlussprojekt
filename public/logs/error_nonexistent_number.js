"use strict"
// These are to possible appenders to log statements
var consoleAppender_error_nonexistent_number = JL.createConsoleAppender('consoleAppender_error_nonexistent_number');
var ajaxAppender_error_nonexistent_number = JL.createAjaxAppender('ajaxAppender_error_nonexistent_number');

JL().setOptions({"appenders": [ajaxAppender_error_nonexistent_number, consoleAppender_error_nonexistent_number]});

JL("ClientToServerLogs").fatal("\n\nRemove object error: Nonexistent ID");