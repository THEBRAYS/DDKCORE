import * as bignum from 'src/helpers/bignum.js';
import * as crypto from 'crypto';
import {Account} from "src/helpers/types";
import * as AccountsSql from 'src/sql/accounts.js';

export const generateAddressByPublicKey = (publicKey) => {
    console.log(`publicKey ${publicKey}`);
    const publicKeyHash = crypto.createHash('sha256').update(publicKey).digest();
    const temp = Buffer.alloc(8);

    for (let i = 0; i < 8; i++) {
        temp[i] = publicKeyHash[7 - i];
    }

    const address = `DDK${bignum.fromBuffer(temp).toString()}`;

    if (!address) {
        throw `Invalid public key: ${publicKey}`;
    }

    return address;
};


export const getOrCreateAccount = async (db, publicKey): Promise<Account> => {
    let sender = await db.oneOrNone(AccountsSql.getAccountByPublicKey, {
        publicKey
    });

    if (!sender) {
        sender = await db.one(AccountsSql.createNewAccount, {
            publicKey,
            address: generateAddressByPublicKey(publicKey)
        })

    }
    return new Account(sender);
};

export default exports = {
    generateAddressByPublicKey,
    getOrCreateAccount
}
