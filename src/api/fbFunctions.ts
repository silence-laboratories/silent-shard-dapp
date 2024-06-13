// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp({
  projectId: 'mobile-wallet-mm-snap-staging',
  apiKey: process.env.REACT_APP_API_KEY!,
  authDomain: 'mobile-wallet-mm-snap-staging.firebaseapp.com',
});
const functions = getFunctions(app);

type TimeStampResp = {
  timeStamp: string;
};

export const checkTimeConsistency = async () => {
  const result = await Promise.resolve(
    httpsCallable<unknown, TimeStampResp>(functions, 'getServerTimestamp')()
  );
  if (result.data) {
    const deviceTimestamp = Date.now();
    const serverTimestamp = Number(result.data['timeStamp']);

    const difference = deviceTimestamp - serverTimestamp;
    if (Math.abs(difference) > 5000) {
      return false;
    }
    return true;
  }
};
