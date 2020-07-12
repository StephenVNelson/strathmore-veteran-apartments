import React, { useEffect } from 'react'
import './Alerts.css'
import { connect } from 'react-redux';
import { createAlert, deleteAlert } from '../../../redux/actions/alertActions';
import { PropTypes } from 'prop-types';
import Alert from './Alert';

const Alerts = ({ alerts, createAlert, deleteAlert }) => {
  useEffect(() => {
    setTimeout(() => alerts.map(alert => deleteAlert(alert)), 10000)
  }, [])
  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  )
}

Alerts.propTypes = {
  createAlert: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  createAlert,
  deleteAlert
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
