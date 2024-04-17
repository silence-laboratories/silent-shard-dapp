// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { SnapError, SnapErrorCode } from "./error";
import _sodium from "libsodium-wrappers-sumo";

export const requestEntropy = async (salt?: Uint8Array) => {
    const usedSalt = salt ? salt : _sodium.randombytes_buf(32);
    return _sodium.to_hex(_sodium.randombytes_buf_deterministic(32, usedSalt));
};

export const aeadEncrypt = async (message: string, pwd: string) => {
    const nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES);
    const salt = _sodium.randombytes_buf(_sodium.crypto_pwhash_SALTBYTES);
    let encKey = _sodium.crypto_pwhash(
        _sodium.crypto_secretbox_KEYBYTES,
      pwd,
      salt,
      _sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      _sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
      _sodium.crypto_pwhash_ALG_DEFAULT
    );

    return `${_sodium.to_hex(salt)}.${_sodium.to_hex(
      nonce
    )}.${_sodium.crypto_secretbox_easy(message, nonce, encKey, "base64")}`;
};

export const aeadDecrypt = async (cipherText: string, pwd: string): Promise<Uint8Array> => {
    const array = cipherText.split(".");
    if (array.length !== 3) {
      throw new SnapError(
        "Invalid backup data",
        SnapErrorCode.InvalidBackupData
      );
    }
    const salt = _sodium.from_hex(array[0]);

    let encKey = _sodium.crypto_pwhash(
        _sodium.crypto_secretbox_KEYBYTES,
      pwd,
      salt,
      _sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      _sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
      _sodium.crypto_pwhash_ALG_DEFAULT
    );

    const nonce = _sodium.from_hex(array[1]);
    const cipherMessage = _sodium.from_base64(array[2]);
    return _sodium.crypto_secretbox_open_easy(cipherMessage, nonce, encKey);
};
