"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.category = void 0;
var category;
(function (category) {
    category["DRINKS"] = "DRINKS";
    category["SNACKS"] = "SNACKS";
    category["CANDY"] = "CANDY";
    category["CHIPS"] = "CHIPS";
})(category || (exports.category = category = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESS"] = "SUCCESS";
    TransactionStatus["FAILED"] = "FAILED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
