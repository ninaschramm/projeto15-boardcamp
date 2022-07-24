import dayjs from "dayjs";
import connection from "../dbStrategy/postgres.js";

export async function getRentals (req, res) {

    const customerID = parseInt(req.query.customerId);
    const gameID = parseInt(req.query.gameId);
    
    const { rows: rentalsList } = await connection.query(`SELECT rentals.*, games."categoryId", categories.name as "categoryName", games.id as "gameId",
    games.name as "gameName", customers.id as "customerId", customers.name as "customerName", rentals.id as "id"
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id
    JOIN categories ON games."categoryId" = categories.id`)
    
    let rentalsFormated = [];

    for (let rental of rentalsList) {

        let rent = {
            id: rental.id,
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: rental.rentDate,
            daysRented: rental.daysRented,
            returnDate: rental.returnDate,
            originalPrice: rental.originalPrice,
            delayFee: rental.delayFee,
            customer: {
             id: rental.customerId,
             name: rental.customerName
            },
            game: {
              id: rental.gameId,
              name: rental.gameName,
              categoryId: rental.categoryId,
              categoryName: rental.categoryName
            }
          }

          rentalsFormated.push(rent)
    }

    if (customerID) {
        rentalsFormated = rentalsFormated.filter(el => el.customerId === customerID )
    }

    if (gameID) {
        rentalsFormated = rentalsFormated.filter(el => el.gameId === gameID )
    }

    res.send(rentalsFormated)
}

export async function rentGame(req, res) {

    const { customerId, gameId, daysRented } = req.body;  

    const { rows: validateId } = await connection.query(`SELECT * FROM customers WHERE id=${customerId}`)
    const { rows: validateGame } = await connection.query(`SELECT * FROM games WHERE id=${gameId}`)
    const { rows: validateAvailability } = await connection.query(`SELECT * from rentals
    WHERE "returnDate" is null
    AND "gameId"=${gameId};`)


    if (!validateId.length > 0 || !validateGame.length > 0) {
        return res.sendStatus(400)
    }

    if (validateAvailability.length >= validateGame[0].stockTotal || daysRented <= 0) {
        return res.sendStatus(400)
    }

    console.log(validateAvailability.length)
    console.log(validateGame[0].stockTotal)
    const rentDate = dayjs().format('YYYY-MM-DD')
    const originalPrice = validateGame[0].pricePerDay * daysRented;
    
   await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
   VALUES ('${customerId}', '${gameId}', '${rentDate}', '${daysRented}', null, '${originalPrice}', null)`)

   res.sendStatus(201)
}

export async function returnGame(req, res) {
    const id = req.params.id;
    const returnDate = dayjs(); 
    const {rows: rent} = await connection.query(`SELECT rentals.*, games."pricePerDay" FROM rentals
    JOIN games
    ON rentals."gameId" = games.id
    WHERE rentals.id=${id}`)    

    if (!rent.length > 0) {
        return res.sendStatus(404)
    }

    const rentDate = dayjs(rent[0].rentDate);
    const daysRented = rent[0].daysRented
    const dif = returnDate.diff(rentDate, 'day');

    let delayFee = null;

    if ( dif > daysRented ) {
        delayFee = `${(dif-daysRented) * rent[0].pricePerDay}`
    }

    await connection.query(`UPDATE rentals SET "returnDate"='${returnDate}', "delayFee"=${delayFee} WHERE id=${id}`)
    res.sendStatus(200)
}