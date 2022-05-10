import * as Yup from 'yup';
//schema for user creation
const createUserSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),           
    groupId: Yup.string().min(32)
});
//schema for user update
const updateUserSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),           
    groupId: Yup.string().min(32)
});

export {
    createUserSchema,    
    updateUserSchema
};