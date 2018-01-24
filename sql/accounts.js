'use strict';

var Accounts = {

  checkAccountStatus : 'SELECT "status" FROM mem_accounts where "address"=${senderId}',

  disableAccount : 'UPDATE mem_accounts SET "status" = 0 WHERE "address" = ${senderId}',

  enableAccount : 'UPDATE mem_accounts SET "status" = 1 WHERE "address" = ${senderId}',

  getTotalAccount : 'SELECT count("address") FROM mem_accounts WHERE "balance" > 0',

  getCurrentUnmined : 'SELECT "balance" FROM mem_accounts where "address"=${address}'

};

module.exports = Accounts;