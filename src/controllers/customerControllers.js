import connection from "../dbStrategy/postgres.js";
import { customerSchema } from "../schemas/schemas.js";

export async function getCustomers(req, res) {
    const customerCPF = req.query.cpf;
    const customerID = req.query.id;

    if (customerID) {
        const { rows: customerList } = await connection.query(`
        SELECT * FROM customers
        WHERE id='${customerID}'`)
    
        return res.status(200).send(customerList)
    }

    if (customerCPF) {
        const { rows: customerList } = await connection.query(`
        SELECT * FROM customers
        WHERE cpf LIKE '${customerCPF}%'`)
    
        return res.status(200).send(customerList)
    }

    const { rows: customerList } = await connection.query(`
    SELECT * FROM customers`)

    return res.status(200).send(customerList)
}

export async function registerCustomer(req, res) {
    const newCustomer = req.body;

    const validation = customerSchema.validate(newCustomer);

    if (validation.error) {
        console.log(validation.error.details)        
      return res.status(400).send(`${validation.error}`)  
    }

    const { rows: verifyExistingCustomer } = await connection.query(`SELECT * FROM customers WHERE cpf='${newCustomer.cpf}'`)

    if (verifyExistingCustomer.length > 0) {
        console.log(verifyExistingCustomer)
        return res.status(409).send(`O CPF informado já está cadastrado`)  
    }

    await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${newCustomer.name}', '${newCustomer.phone}', '${newCustomer.cpf}', '${newCustomer.birthday}')`);
    return res.sendStatus(201)
}