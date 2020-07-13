import * as types from './actionTypes';
import { v4 as uuid } from 'uuid';


export function createAlert(alert) {
  return { type: types.CREATE_ALERT, alert: { id: uuid(), message: alert } }
}

export function deleteAlert(alert) {
  return { type: types.DELETE_ALERT, alert }
}