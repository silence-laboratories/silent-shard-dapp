// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

export class SnapError extends Error {
  code: number;
  constructor(message: string, code: SnapErrorCode | number) {
    super(JSON.stringify({ message, code }));
    this.name = 'SnapError';
    this.code = code;
  }
}

export enum SnapErrorCode {
  UnexpectedError = -1,
  FirebaseError = 1,
  RejectedPairingRequest = 2,
  PairingNotInitialized = 3,
  InvalidBackupData = 4,
  InvalidStorageData = 5,
  StorageError = 6,
  NotPaired = 7,
  KeygenResourceBusy = 8,
  InternalLibError = 9,
  UserPhoneDenied = 10,
  KeygenFailed = 11,
  InvalidMessageHashLength = 12,
  WalletNotCreated = 13,
  AccountNotCreated = 14,
  SignResourceBusy = 15,
  SignFailed = 16,
  CannotFindWallet = 17,
  UnknownMethod = 18,
  UnknownError = 19,
  BackupFailed = 20,
}

export const APPROVAL_TIMEOUT_ERR_MSG = 'timeout';
export const WRONG_SECRET_KEY_ERR_MSG = 'wrong secret key for the given ciphertext';
export const MISSING_PROVIDER_ERR_MSG = 'missing metamask provider';

export const WRONG_SECRET_KEY_TOAST_MSG =
  "Oops! Your backup doesn't match this MetaMask wallet. Please switch wallets and retry.";
export const LOST_INTERNET_TOAST_MSG = 'Oops! Looks like your connection dropped.';
export const UNKNOWN_ERR_TOAST_MSG = 'Uh oh! Something went wrong. Please try again';
export const CONNECTION_REJECTED_TOAST_MSG =
  'Connection Request rejected. Please allow the connection request on your MetaMask extension to continue creating your Silent Account';
export const CONNECTION_REJECTED_UPDATE_SNAP_TOAST_MSG =
  'Connection Request rejected. Please allow the connection request on your MetaMask extension to continue updating your Silent Shard Snap';
export const ACCOUNT_CREATION_REJECTED_TOAST_MSG = 'Account creation is rejected.';
