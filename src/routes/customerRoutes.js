import express from 'express';
import { getCustomers, registerCustomer, getCustomer, updateCustomer } from '../controllers/customerControllers.js';

const customersRouter = express.Router();

customersRouter.get('/customers', getCustomers)
customersRouter.post('/customers', registerCustomer)
customersRouter.get('/customers/:id', getCustomer)
customersRouter.put('/customers/:id', updateCustomer)



export default customersRouter;