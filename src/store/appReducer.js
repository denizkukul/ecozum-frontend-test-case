import { createReducer } from "@reduxjs/toolkit";
import { getTerms, getPackages, goToPayment, makePayment, signup, togglePackage } from "./actions";

const initialState = {
  status: 'idle',
  page: 'signup',
  user: null,
  terms: null,
  packageIds: [],
  selectedIds: [],
  packages: {},
  totalCost: 0,
  currency: ''
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
        const packageIds = [];
        const packages = {};
        action.payload.forEach(item => {
          const id = String(item.id);
          packageIds.push(id);
          packages[id] = { ...item, selected: false };
        })
        state.currency = action.payload[0].currency;
        state.packageIds = packageIds;
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
        const packageId = action.payload;
        const packageData = state.packages[packageId];
        const selected = packageData.selected;
        state.packages[packageId].selected = !selected;
        if (selected) {
          let index = state.selectedIds.indexOf(packageId);
          state.selectedIds.splice(index, 1);
          state.totalCost -= packageData.amount;
        }
        else {
          state.selectedIds.push(packageId);
          state.totalCost += packageData.amount;
        }
      })
      .addDefaultCase(state => state)
  }
)