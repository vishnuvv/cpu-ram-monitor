'use strict';
const test = require('tape');
const checkBufferForNotification = require('./alerting');

test('It notifies a recovery after an alert.', (t) => {
  t.plan(2);

  const eventBuffer = [
    { loadavg: 3.5, timestamp: 1490496066010 },
    { loadavg: 1.5, timestamp: 1490496067010 },
    { loadavg: 1.0, timestamp: 1490496068010 },
  ];
  let lastNotification = { loadAvg: 3.2, isAlert: true, timestamp: Date.now() };

  const actual = checkBufferForNotification(eventBuffer, lastNotification, 3);
  const expected = { loadAvg: 2.0, isAlert: false, timestamp: 1490496068010 };

  t.deepEqual(actual, expected);
  t.equal(actual.timestamp, eventBuffer[eventBuffer.length - 1].timestamp);

  t.end();
});

test('It notifies an alert after another alert.', (t) => {
  t.plan(2);

  const eventBuffer = [
    { loadavg: 3.5, timestamp: 1490496066010 },
    { loadavg: 3.5, timestamp: 1490496067010 },
    { loadavg: 3.5, timestamp: 1490496068010 },
  ];
  let lastNotification = { loadAvg: 3.2, isAlert: true, timestamp: Date.now() };

  const actual = checkBufferForNotification(eventBuffer, lastNotification, 3);
  const expected = { loadAvg: 3.5, isAlert: true, timestamp: 1490496068010 };

  t.deepEqual(actual, expected);
  t.equal(actual.timestamp, eventBuffer[eventBuffer.length - 1].timestamp);

  t.end();
});

test('It does not notify a recovery after a recovery.', (t) => {
  t.plan(1);

  const eventBuffer = [
    { loadavg: 3.5, timestamp: 1490496066010 },
    { loadavg: 1.5, timestamp: 1490496067010 },
    { loadavg: 1.0, timestamp: 1490496068010 },
  ];
  let lastNotification = { loadAvg: 1.6, isAlert: false, timestamp: Date.now() };

  const actual = checkBufferForNotification(eventBuffer, lastNotification, 3);
  const expected = null;

  t.equal(actual, expected);
  t.end();
});
