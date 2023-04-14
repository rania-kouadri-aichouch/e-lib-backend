const Penality = require('../models/penality.model');
const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');



async function checkPenality(req , res ,next){



    try{
        
        if (!req.user) {
            return res.status(400).send({
                message: 'You must signin before',
            });
        }

        const loans = await Loan.find({user : req.user})
        console.log(loans)
        let hasAPenality = 0;
        if (loans.length > 0){

           

            

            loans.forEach(loan => {

                if(loan.status == "overdue"){

                    
                    hasAPenality += 1;
                   


                }
                console.log(loan.returnDate )
                console.log(new Date())
                if(loan.status == "active" && (loan.returnDate - new Date())< 0 )  {
                   
                    // const penality = new Penality({
                    //     user : req.user,
                    //     loan : loan,
                    //     date : new Date()
                    // })

                    loan.status = 'overdue'
                    loan.save()
                    hasAPenality += 1;

                   

                }
                
                
            })

            if(hasAPenality > 0){
                console.log(hasAPenality)
                return res.send('you have a penality you can not take the book')
            }
            next();
        }else{
           
            next();
        }

    }catch(error){

        res.status(500).json({ message: error.message });

    }
}





async function checkRenew(req , res ,next){



    if (!req.user) {
		return res.status(400).send({
			message: 'You must signin before',
		});
	}
    try{


        const loans = await Loan.find({user : req.user, book : req.params.book })
        let renewed = 0;

        if (loans.length > 0){

            loans.forEach(loan => {

                if(loan.status == "renewed"){


                    renewed +=1;


                }


            })
            if (renewed >0 ){

                return res.send('you have already renew this book')

            }
            
            next();
        }else{

            next();
        }

    }catch(error){

        res.status(500).json({ message: error.message });

    }
}

module.exports = {
    checkPenality,
    checkRenew
}
