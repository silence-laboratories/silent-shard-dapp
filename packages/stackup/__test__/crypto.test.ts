import _sodium from "libsodium-wrappers-sumo";
import {aeadEncrypt, aeadDecrypt} from "@/mpc/crypto"
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
import { uint8ArrayToUtf8String } from "@/mpc/utils";

describe("Test aeadEncrypt", () => {
    it("should encrypt and decrypt the message", async () => {
        await _sodium.ready;
        const password = "password";
        const message = "This is a secret message";
        const encrypted = await aeadEncrypt(message, password);
        const decrypted = await aeadDecrypt(encrypted, password);
        const plain = uint8ArrayToUtf8String(decrypted);
        expect(plain).toEqual(message);
    });
});