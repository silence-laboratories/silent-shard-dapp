// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { KeyringAccount } from '@metamask/keyring-api';

export type PairingStatusType =
  | 'Pairing'
  | 'Unpaired'
  | 'Paired'
  | 'KeygenDone'
  | 'AccountCreated'
  | 'AccountCreationInProgress'
  | 'AccountCreationDenied';

export interface InitPairingResponse {
  qrCode: string;
}

export interface IsPairedResponse {
  isPaired: boolean;
  deviceName: string;
  isAccountExist: boolean;
}

export interface RunPairingResponse {
  address: string | null;
  deviceName: string;
}

export interface RunRePairingResponse {
  currentAccountAddress: string[];
  newAccountAddress: string;
  deviceName: string;
}

export interface RunKeygenResponse {
  address: string;
}

export interface SnapVersionResponse {
  currentVersion: string;
  latestVersion: string;
}

// Ref: https://docs.metamask.io/wallet/reference/provider-api/#errors
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface SnapMetaData {
  currentSnapVersion: string;
  latestSnapVersion: string;
}

export enum AppStatus {
  Unpaired = 'Unpaired',
  InitPairing = 'InitPairing',
  AccountCreationInProgress = 'AccountCreationInProgress',
  AccountRestorationInProgress = 'AccountRestorationInProgress',
  AccountCreationDenied = 'AccountCreationDenied',
  AccountRestorationDenied = 'AccountRestorationDenied',
  BackupInstruction = 'BackupInstruction',
  Unpairing = 'Unpairing',
  Pairing = 'Pairing',
  Paired = 'Paired',
  AccountCreated = 'AccountCreated',
  RePairing = 'RePairing',
  RePaired = 'RePaired',
  MismatchRepairing = 'MismatchRepairing',
}

export type AppState =
  | {
      status:
        | AppStatus.Unpaired
        | AppStatus.AccountCreationInProgress
        | AppStatus.AccountRestorationInProgress
        | AppStatus.AccountCreationDenied
        | AppStatus.AccountRestorationDenied
        | AppStatus.Unpairing;
    }
  | {
      status: AppStatus.Pairing;
      qr: string;
      seconds: number;
    }
  | {
      status: AppStatus.Paired;
      qr: null;
      seconds: 0;
    }
  | {
      status: AppStatus.AccountCreated;
      account: KeyringAccount;
    }
  | {
      status: AppStatus.BackupInstruction;
    }
  | {
      status: AppStatus.RePairing;
      account: KeyringAccount;
      qr: string;
      seconds: number;
    }
  | {
      status: AppStatus.MismatchRepairing;
      account: KeyringAccount;
      snapAccountAddress: string;
      phoneAccountAddress: string;
    }
  | {
      status: AppStatus.RePaired;
      account: KeyringAccount;
    };

export enum DeviceOS {
  ios = 'ios',
  android = 'android',
}
