import {body} from 'express-validator'

export const loginValidation =[ 
    body('email', "Invalid Email Format").isEmail(),
    body('password', "Invalid Password required min 5 symbols").isLength({min:4}),
];

export const registerValidation =[ 
    body('email', "Invalid Email Format").isEmail(),
    body('password', "Invalid Password required min 5 symbols").isLength({min:4}),
    body('fullName', "Invalid, Fill name").isLength({min:3}),
    body('avatarUrl', "Invalid link on avatar").optional().isURL(),
];

export const itemCreateValidation =[ 
    body('title', "Enter a valid item title").isLength({min: 2}).isString(),
    body('description', "Invalid description, required min 4 symbols").isLength({min:4}).isString(),
    body('themes', "Invalid theme").isLength({min:3}).isString(),
    body('imageUrl', "Invalid link on img").optional().isURL(),
];