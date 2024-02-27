// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

type PairingStatusType =
  | 'Pairing'
  | 'Unpaired'
  | 'Paired'
  | 'KeygenDone'
  | 'AccountCreated'
  | 'AccountCreationInProgress'
  | 'AccountCreationDenied';

interface InitPairingResponse {
  qrCode: string;
}

interface IsPairedResponse {
  isPaired: boolean;
  deviceName: string;
  isAccountExist: boolean;
}

interface RunPairingResponse {
  address: string | null;
  deviceName: string;
}

interface RunKeygenResponse {
  address: string;
}

interface SnapVersionResponse {
  currentVersion: string;
  latestVersion: string;
}

// Ref: https://docs.metamask.io/wallet/reference/provider-api/#errors
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
