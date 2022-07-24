import connection from "../dbStrategy/postgres.js";
import { customerSchema } from "../schemas/schemas.js";

export async function getCustomers(req, res) {
    const customerCPF = req.query.cpf;    

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

export async function getCustomer(req, res) {
    const customerID = req.params.id;
   
    const { rows: customerList } = await connection.query(`
    SELECT * FROM customers
    WHERE id='${customerID}'`)

    if (customerList.length > 0) {    
        return res.status(200).send(customerList[0])
    }

    else {return res.sendStatus(404)}
}

export async function updateCustomer(req, res) {
    const upCustomer = req.body;
    const id = req.params.id;

    const validation = customerSchema.validate(upCustomer);

    if (validation.error) {
        console.log(validation.error.details)        
      return res.status(400).send(`${validation.error}`)  
    }

    const { rows: verifyExistingCustomer } = await connection.query(`SELECT * FROM customers WHERE cpf='${upCustomer.cpf}'`)

    if (verifyExistingCustomer.length > 0) {
        if (verifyExistingCustomer[0].id != id)
        return res.status(409).send(`O CPF informado já está cadastrado`)  
    }

    await connection.query(`UPDATE customers 
    SET name='${upCustomer.name}', phone='${upCustomer.phone}', cpf='${upCustomer.cpf}', birthday='${upCustomer.birthday}' 
    WHERE id=${id}`);
    return res.sendStatus(200)
}