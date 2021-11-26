'use strict'; // eslint-disable-line

const checkBufferForNotification = (eventBuffer, lastNotification, LOAD_ALERT_THRESHOLD) => {
  let notification = null;
  const total = eventBuffer.reduce((sum, e) => sum + e.loadavg, 0);
  const avg = total / eventBuffer.length;
  const isAlert = avg > LOAD_ALERT_THRESHOLD;

  // Emit notification only if it's an alert or recovery
  if (isAlert || (!isAlert && !!lastNotification && lastNotification.isAlert)) {
    notification = { loadAvg: avg, isAlert, timestamp: eventBuffer[eventBuffer.length - 1].timestamp };
  }
  return notification;
};

module.exports = checkBufferForNotification;
