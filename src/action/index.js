import {
  REQUEST, START, FAILED, RECEIVE, UPDATE, PERIOD, MAP
} from '../constants'
import {LOADING, LOADING_RATE, LOADED} from "../reducer/loading";

export const loading = (payload) => ({type: LOADING, payload})
export const loaded = (payload) => ({type: LOADED, payload})

export const requestStart = () => ({ type: REQUEST + START })

export const  requestFailed = (error) =>  ({
  type: REQUEST + FAILED,
  payload : error
})

export const receiveQuery = (payload, type) =>  ({
  type,
  payload
})

export const updatePeriod = (payload) =>  ({
    type: UPDATE + PERIOD,
    payload
})

export const updateMap = (payload) =>  ({
    type: UPDATE + MAP,
    payload
})

export const fetchApi = (link, mode) => {
  return (dispatch) => {
    dispatch(loading(LOADING_RATE));
    dispatch(requestStart());
    return fetch(link)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(json => (
        dispatch(receiveQuery(json, RECEIVE + mode))
        ))
      .then(_ => dispatch(loaded(LOADING_RATE)))
      .catch(error => {
        dispatch(requestFailed(error.toString()))
      })
  }
}

