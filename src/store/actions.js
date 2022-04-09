import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import requests from '../services/server';

export const signup = createAsyncThunk(
  'signup',
  async (data) => {
    return requests.postUser(data).then(response => response.data);
  }
);

export const getPackages = createAsyncThunk(
  'getPackages',
  async () => {
    return requests.getPackages().then(response => response.data);
  }
);

export const makePayment = createAsyncThunk(
  'makePayment',
  async (data) => {
    return requests.postPayment(data).then(response => response.data);
  }
);

export const getTerms = createAsyncThunk(
  'getTerms',
  async () => {
    return requests.getTerms().then(response => response.data);
  }
);

export const goToPayment = createAction('goToPayment');
export const togglePackage = createAction('togglePackage');