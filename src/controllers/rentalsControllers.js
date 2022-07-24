import connection from "../dbStrategy/postgres.js";
import { rentalsSchema } from "../schemas/schemas.js";

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
    const newRental = req.body;

   await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
   VALUES ('1', '6', '2021-07-20', '7', null, '12600', null)`)
}