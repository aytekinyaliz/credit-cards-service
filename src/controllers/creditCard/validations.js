const { isValidAmount } = require("../../libs/utilities");
const isValidLuhnNumber = require('../../libs/luhn');


const validations = {
   name: {
      isLength: {
         options: { min: 1 },
         errorMessage: "Name is required!"
      }
   },
   cardNumber: {
      in: ["body"],
      isLength: {
         options: { min: 1, max: 19 },
         errorMessage: "Wrong format!"
      },
      custom: {
         options: (_, { req }) => isValidLuhnNumber(req.body.cardNumber),
         errorMessage: "Invalid card number!"
      }
   },
   limit: {
      in: ["body"],
      isLength: {
         options: { min: 1, max: 19 },
         errorMessage: "Wrong format!"
      },
      custom: {
         options: (_, { req }) => isValidAmount(req.body.limit),
         errorMessage: "Invalid limit!"
      }
   },
   amount: {
      in: ["body"],
      isLength: {
         options: { min: 1 },
         errorMessage: "Amount is required!"
      },
      custom: {
         options: (_, { req }) => isValidAmount(req.body.amount),
         errorMessage: "Invalid amount!"
      }
   }
};

module.exports = {
   // POST /api/creditCards
   create: {
      name: {
         in: ["body"],
         ...validations.name
      },
      cardNumber: validations.cardNumber,
      limit: validations.limit
   },

   // PUT /api/creditCards/:name/charge
   charge: {
      name: {
         in: ["params"],
         ...validations.name
      },
      amount: validations.amount
   },

   // PUT /api/creditCards/:name/credit
   credit: {
      name: {
         in: ["params"],
         ...validations.name
      },
      amount: validations.amount
   }
};
