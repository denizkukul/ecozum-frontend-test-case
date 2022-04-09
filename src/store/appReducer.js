import { createReducer } from "@reduxjs/toolkit";
import { getTerms, getPackages, goToPayment, makePayment, signup, togglePackage } from "./actions";

const initialState = {
  status: 'idle',
  page: 'signup',
  user: null,
  terms: null,
  packageIDs: [],
  selectedIDs: [],
  packages: {},
  total: 0
}

export const appReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.page = 'packages';
        state.user = action.payload;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        const packageIDs = [];
        const packages = {};
        action.payload.forEach(item => {
          packageIDs.push(item.id);
          packages[item.id] = { ...item, selected: false };
        })
        state.packageIDs = packageIDs;
        state.packages = packages;
        state.status = 'idle';
      })
      .addCase(getTerms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.terms = action.payload.content;
      })
      .addCase(makePayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makePayment.fulfilled, (state) => {
        state.status = 'idle';
        state.page = 'result';
      })
      .addCase(goToPayment, (state) => {
        state.status = 'loading';
        state.page = 'payment';
      })
      .addCase(togglePackage, (state, action) => {
        const packageID = action.payload;
        const packageData = state.packages[packageID];
        const selected = packageData.selected;
        state.packages[packageID].selected = !selected;
        if (selected) {
          let index = state.selectedIDs.indexOf(packageID);
          state.selectedIDs.splice(index, 1);
          state.total -= packageData.amount;
        }
        else {
          state.selectedIDs.push(packageID);
          state.total += packageData.amount;
        }
      })
      .addDefaultCase(state => state)
  }
)