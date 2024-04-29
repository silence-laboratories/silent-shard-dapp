// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { KeyringSnapRpcClient } from '@metamask/keyring-api';
import { GetSnapsResult, Snap, SnapId } from '@metamask/snaps-sdk';

import {
  InitPairingResponse,
  IsPairedResponse,
  ProviderRpcError,
  RunKeygenResponse,
  RunPairingResponse,
  RunRePairingResponse,
  SnapVersionResponse,
} from '@/types';

import { MISSING_PROVIDER_ERR_MSG, SnapError } from './error';

const SNAP_ID = process.env.REACT_APP_SNAP_ID!;
let keyringClient: KeyringSnapRpcClient | null = null;
const getKeyringClient = (provider: EIP1193Provider) => {
  if (keyringClient) {
    return keyringClient;
  } else {
    if (!provider) {
      throw Error(MISSING_PROVIDER_ERR_MSG);
    }
    keyringClient = new KeyringSnapRpcClient(SNAP_ID, provider as any);
    return keyringClient;
  }
};

const connectSnap = async (snapVersion: string | null, provider: EIP1193Provider) => {
  if (!provider) {
    throw new SnapError(MISSING_PROVIDER_ERR_MSG, -1);
  }
  try {
    return await provider.request({
      method: 'wallet_requestSnaps',
      params: {
        [SNAP_ID]: snapVersion
          ? {
              version: snapVersion,
            }
          : {},
      } as any,
    });
  } catch (error) {
    const rpcError = error as ProviderRpcError;
    if (rpcError.code && rpcError.code === 4001) {
      throw new SnapError(rpcError.message, 4001);
    } else {
      throw new SnapError(rpcError.message, -1);
    }
  }
};

const isConnected = async (provider: EIP1193Provider) => {
  if (!provider) {
    throw new SnapError(MISSING_PROVIDER_ERR_MSG, -1);
  }
  try {
    const result = (await provider.request({
      method: 'wallet_getSnaps',
    })) as GetSnapsResult;
    return !!(SNAP_ID in result && (result[SNAP_ID as SnapId] as Snap).enabled);
  } catch (err) {
    return false;
  }
};

const isPaired = async (provider: EIP1193Provider) => {
  const data = await callSnap<IsPairedResponse>(provider, 'tss_isPaired', null);
  return data;
};

const runPairing = async (provider: EIP1193Provider) => {
  return await callSnap<RunPairingResponse>(provider, 'tss_runPairing', null);
};

const runKeygen = async (provider: EIP1193Provider) => {
  return await callSnap<RunKeygenResponse>(provider, 'tss_runKeygen', null);
};

const unPair = async (provider: EIP1193Provider) => {
  return await callSnap<object>(provider, 'tss_unpair', null);
};

const initPairing = async (provider: EIP1193Provider, isRePair: boolean) => {
  return await callSnap<InitPairingResponse>(provider, 'tss_initPairing', [{ isRePair }]);
};

const runRePairing = async (provider: EIP1193Provider) => {
  return await callSnap<RunRePairingResponse>(provider, 'tss_runRePairing', null);
};

const snapVersion = async (provider: EIP1193Provider) => {
  return await callSnap<SnapVersionResponse>(provider, 'tss_snapVersion', null);
};

const postSnapUpdate = async (provider: EIP1193Provider) => {
  return await callSnap<SnapVersionResponse>(provider, 'tss_updateSnap', null);
};

const callSnap = async <T>(
  provider: EIP1193Provider,
  method: string,
  params: unknown | null
): Promise<{
  response: T;
  snapErr: SnapError | null;
}> => {
  if (!provider) {
    throw new SnapError(MISSING_PROVIDER_ERR_MSG, -1);
  }
  const request = { method: method, params: params ?? [] };
  try {
    const response = await provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ID,
        request,
      } as any,
    });
    return {
      response: response as T,
      snapErr: null,
    };
  } catch (error: unknown) {
    if ((error as ProviderRpcError).code) {
      const rpcError = error as ProviderRpcError;
      throw parseRpcError(rpcError);
    }
    throw new SnapError((error as Error).message, -1);
  }
};

const parseRpcError = (rpcError: ProviderRpcError) => {
  try {
    const snapErr = JSON.parse(rpcError.message) as SnapError;
    // https://github.com/MetaMask/rpc-errors/blob/main/src/error-constants.ts
    return new SnapError(snapErr.message, snapErr.code);
  } catch (error: unknown) {
    return new SnapError((rpcError as Error).message, rpcError.code);
  }
};

export {
  connectSnap,
  getKeyringClient,
  initPairing,
  isConnected,
  isPaired,
  parseRpcError,
  postSnapUpdate,
  runKeygen,
  runPairing,
  runRePairing,
  snapVersion,
  unPair,
};
