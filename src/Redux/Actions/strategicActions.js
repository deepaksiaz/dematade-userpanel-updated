import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getStrategicsData = (filter = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_STRATEGICS_DATA_INIT,
    });
    const filter_string = Object.keys(filter).map(f => `${f}=${filter[f]}`).join('&');
    const token = getTokenFromLocalStorage();
    axios.get(`${API_URL}/strategic/performance/search?${filter_string}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_STRATEGICS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_STRATEGICS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_STRATEGICS_DATA_FAIL,
        });
      });
  };
};

export const downloadStrategicsData = (filter = {}) => {
  return async (dispatch) => {
    const filter_string = Object.keys(filter).map(f => `${f}=${filter[f]}`).join('&');
    const token = getTokenFromLocalStorage();
    axios.get(`${API_URL}/strategic/csv/export?${filter_string}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        download(res.data, 'strategic.csv', 'text/csv');
      })
      .catch((e) => {});
  };
};


export const downloadStrategicsSingle = (data) => {
  return async () => {
    const token = getTokenFromLocalStorage();
    const file_name = `${data.symbolname}_${data.exchange}_${data.typeoftrading}_${data.strategy}_${data.tradetype}.csv`.toLowerCase();
    axios.get(`${API_URL}/download?filename=${file_name}`)
      .then((res) => {
        download(res.data, file_name, 'text/csv');
      })
      .catch((e) => {});
  };
};


export const download = (content, filename, contentType) => {
  debugger
  if(!contentType) contentType = 'application/octet-stream';
  var a = document.createElement('a');
  var blob = new Blob([content], {'type':contentType});
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
