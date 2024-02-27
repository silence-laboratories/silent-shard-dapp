// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { KeyringSnapRpcClient } from '@metamask/keyring-api';

import { MISSING_PROVIDER_ERR_MSG, SnapError } from './error';

const SNAP_ID = process.env.REACT_APP_SNAP_ID!;
const getKeyringClient = (provider: any) => {
  if (!provider) {
    throw Error(MISSING_PROVIDER_ERR_MSG);
  }
  return new KeyringSnapRpcClient(SNAP_ID, provider);
};

const connectSnap = async (latestSnapVersion: string | null, provider: any) => {
  if (!provider) {
    throw Error(MISSING_PROVIDER_ERR_MSG);
  }
  await provider.request({
    method: 'wallet_requestSnaps',
    params: {
      [SNAP_ID]: latestSnapVersion
        ? {
            version: latestSnapVersion,
          }
        : {},
    },
  });
};

const isConnected = async (provider: any) => {
  if (!provider) {
    throw Error(MISSING_PROVIDER_ERR_MSG);
  }
  try {
    const result = await provider.request({
      method: 'wallet_getSnaps',
    });
    return !!(SNAP_ID in result && result[SNAP_ID].enabled);
  } catch (err) {
    return false;
  }
};

const isPaired = async (provider: any) => {
  const data = await callSnap<IsPairedResponse>(provider, 'tss_isPaired', null);
  return data;
};

const runPairing = async (provider: any) => {
  return await callSnap<RunPairingResponse>(provider, 'tss_runPairing', null);
};

const runKeygen = async (provider: any) => {
  return await callSnap<RunKeygenResponse>(provider, 'tss_runKeygen', null);
};

const unPair = async (provider: any) => {
  return await callSnap<object>(provider, 'tss_unpair', null);
};

const initPairing = async (provider: any) => {
  return await callSnap<InitPairingResponse>(provider, 'tss_initPairing', null);
};

const snapVersion = async (provider: any) => {
  return await callSnap<SnapVersionResponse>(provider, 'tss_snapVersion', null);
};

const callSnap = async <T>(
  provider: any,
  method: string,
  params: unknown | null
): Promise<{
  response: T | null;
  snapErr: SnapError | null;
}> => {
  if (!provider) {
    throw Error(MISSING_PROVIDER_ERR_MSG);
  }
  const request = { method: method, params: params ?? [] };
  try {
    const response = await provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ID,
        request,
      },
    });
    return {
      response: response as T,
      snapErr: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        response: null,
        snapErr: new SnapError(error.message, -1),
      };
    } else {
      const rpcError = error as ProviderRpcError;
      try {
        const snapErr = JSON.parse(rpcError.message);
        return {
          response: null,
          snapErr,
        };
      } catch (error: unknown) {
        return {
          response: null,
          snapErr: new SnapError(rpcError.message, rpcError.code),
        };
      }
    }
  }
};

export {
  connectSnap,
  getKeyringClient,
  initPairing,
  isConnected,
  isPaired,
  runKeygen,
  runPairing,
  snapVersion,
  unPair,
};
