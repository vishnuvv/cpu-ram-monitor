import React, { PropTypes } from 'react';
import cx from 'classnames';
import classes from './notification.css';

const Notification = (props) => {
  const { isAlert } = props;
  return (
    <div className={classes.notification} >
      <div className={cx(classes.notificationBody, { [classes.alert]: isAlert, [classes.recover]: !isAlert })} >
        <img className={classes.serviceImg} src="/img/monitor.png" alt="" />
        <span className={cx(classes.title, { [classes.alert]: isAlert, [classes.recover]: !isAlert })} >
          <span>{isAlert ? ' High load generated an alert ' : 'Alert recovered'}</span>
        </span>
        <span className={classes.info} >{`Load average (past 2 minutes): ${props.loadAvg}`}</span>
        <span className={classes.info} >{`Triggered at: ${new Date(props.timestamp).toLocaleTimeString()}`}</span>
      </div>
      <div className={classes.notificationFooter} />
    </div>
  );
};

Notification.propTypes = {
  loadAvg: PropTypes.number.isRequired,
  isAlert: PropTypes.bool.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Notification;
