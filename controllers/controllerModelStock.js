// const db = require('../core/db/configSequielize/pool');
// const Stock = db.Stock;
// const Sequelize = db.Sequelize;
//
//
// exports.create = (req, res) => {
//     let stock = {};
//     try{
//         stock.printer = req.body.printer;
//         stock.part = req.body.part;
//         stock.current_amount = req.body.current_amount;
//         stock.type = req.body.type;
//         stock.amount = req.body.amount;
//         stock.date = req.body.date;
//         stock.create(stock).then(result => {
//             res.status(200).json({
//                 message: "Upload Successfully a stock with id = " + result.id,
//                 stock: result,
//             });
//         });
//     }catch(error){
//         res.status(500).json({
//             message: "Fail!",
//             error: error.message
//         });
//     }
// };
// exports.pagingfilteringsorting = async (req, res) => {
//     try{
//         let page = parseInt(req.query.page);
//         let limit = parseInt(req.query.size);
//         let agesorting = (req.query.amount === 'true');
//         let desc = (req.query.date === 'true');
//         let salary = req.query.current_amount ? parseInt(req.query.current_amount) : -1;
//
//         const offset = page ? page * limit : 0;
//
//         console.log("offset = " + offset);
//
//         let result = {};
//
//         // NOT Filtering with salary
//         if(salary < 0 ){
//             // not sorting with age
//             if(agesorting == false) {
//                 result = await Stock.findAndCountAll({
//                     attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                     limit: limit,
//                     offset:offset
//                 });
//             } else {
//                 if(desc == false) { // sorting with age and ascending
//                     result = await Stock.findAndCountAll({
//                         attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                         limit: limit,
//                         offset:offset,
//                         order: [
//                             ['amount', 'ASC']
//                         ]
//                     });
//                 } else { // sorting with age and descending
//                     result = await Stock.findAndCountAll({
//                         attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                         limit: limit,
//                         offset:offset,
//                         order: [
//                             ['amount', 'DESC']
//                         ]
//                     });
//                 }
//             }
//         } else { // Filtering with salary
//             // not sorting with age
//             if(agesorting == false) {
//                 result = await Stock.findAndCountAll({
//                     attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                     where: {current_amount: current_amount},
//                     limit: limit,
//                     offset:offset
//                 });
//             } else {
//                 if(desc == false) { // sorting with age and ascending
//                     result = await Stock.findAndCountAll({
//                         attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                         where: {salary: salary},
//                         limit: limit,
//                         offset:offset,
//                         order: [
//                             ['amount', 'ASC']
//                         ]
//                     });
//                 } else { // sorting with age and descending
//                     result = await Stock.findAndCountAll({
//                         attributes: ['id', 'printer', 'part', 'current_amount', 'type', 'amount', 'date'],
//                         where: {salary: salary},
//                         limit: limit,
//                         offset:offset,
//                         order: [
//                             ['amount', 'DESC']
//                         ]
//                     });
//                 }
//             }
//         }
//
//         const totalPages = Math.ceil(result.count / limit);
//         const response = {
//             "totalPages": totalPages,
//             "pageNumber": page,
//             "pageSize": result.rows.length,
//             "Stocks": result.rows
//         };
//         res.send(response);
//     }catch(error) {
//         res.status(500).send({
//             message: "Error -> Can NOT complete a paging request!",
//             error: error.message,
//         });
//     }
// }
//
// exports.getSalaries = (req, res) => {
//     Stock.findAll({
//         attributes: [
//             [Sequelize.fn('DISTINCT', Sequelize.col('amount')), 'amount'],
//         ],
//         order: [
//             ['amount', 'ASC']
//         ],
//     }).then(result => {
//         let salaries = result.map(x => x.salary);
//         res.send(salaries);
//     }).catch(error => {
//         res.status(500).send({
//             message: "Error -> Can NOT get all Stock's salaries",
//             error: error.message
//         });
//     });
// };
