//import express from "express";
var express =require("express");
const router = express.Router();

//import { v4 as uuidv4 } from 'uuid';

//const data =require( './data.json');

type object1 = {

    ID: string;
    First__Name: string;
    Middle__Name: string;
    Last__Name: string;
    Email: string;
    Phone_Number: string;
    Role: string;
    Address: string;
    DateTime:string;
    CustomerName:string;
}
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})


//SENDS ALL MEMBERS OF JSON DATA
router.get("/", (req, res) => {
    const query = `SELECT U.id, U."first__name", U."middle__name", U."last__name", U.email, U."phone_number", 
    U.address,U.datetime, U.name as "customer_Name", role.name as role FROM (
    SELECT users.*, customer.name  FROM users INNER JOIN customer ON users."customer_id"=customer.id)
     as U INNER JOIN role on U.role=role.name ORDER BY U.id;`
    pool.query(query, (error: any, result: any) => {
        if (error) {
            throw error
        }
        console.log(result.rows)
        res.status(200).json(result.rows)
    })

})

//SEND A SPECIFIC MEMEBER FROM JSON DATA
router.get("/:id", (req, res) => {

    let id = req.params.id;
    const query = `SELECT U.id, U."first__name", U."middle__name", U."last__name", U.email, U."phone_number", 
    U.address,U.datetime, U.name as "customer_Name", role.name as role FROM (
    SELECT users.*, customer.name  FROM users INNER JOIN customer ON users."id"=customer.${id})
     as U INNER JOIN role on U.role=role.name where U.id=${id};`
    pool.query(query, (error: any, result: any) => {
        if (error) {
            throw error
        }
        console.log(result.rows)
        res.status(200).json(result.rows)
    })

})

//ADD MEMBER TO THE EXISTING JSON
router.post("/", (req, res) => {

    const newValue: object1 = {
        ID: req.body.id,
        First__Name: req.body.first__name,
        Middle__Name: req.body.middle__name,
        Last__Name: req.body.last__name,
        Email: req.body.email,
        Phone_Number: req.body.phone_number,
        Role: req.body.role,
        Address: req.body.address,
        DateTime:req.body.datetime,
        CustomerName:req.body.customer_id

    }
    console.log(newValue);
    if (!newValue.First__Name || !newValue.Last__Name || !newValue.Email || !newValue.Phone_Number || !newValue.Role || !newValue.Address || !newValue.CustomerName) {
        res.status(400).json({ message: `Give Correct Input` })
    }
    // else if (data.some(data => newValue.Phone_Number === data.Phone_Number)) {
    //     res.status(400).json({ message: `User Already Exists` })
    // }

    else {
        pool.query(`SELECT id FROM users where "phone_number" ='${newValue.Phone_Number}'`, (error: any, result: any) => {
            if (error) {
                throw error
            }
            if (result.rows.length !== 0) {
                console.log(result);
                res.status(400).json({ message: `User Already Exists` })
            }
            else {
                
                const Sid=`select id from customer where name='${newValue.CustomerName}';` ;
                pool.query(Sid,(error:any,results:any)=>
                {if(error)
                    {throw error;}
                const query = "INSERT into users (\"first__name\", \"middle__name\", \"last__name\", \"email\", \"phone_number\", \"role\", \"address\",\"datetime\",\"customer_id\") VALUES ('" + newValue.First__Name + "','" + newValue.Middle__Name + "','" + newValue.Last__Name + "','" + newValue.Email + "','" + newValue.Phone_Number + "','" + newValue.Role + "','" + newValue.Address + "','" + newValue.DateTime + "','" + results.rows[0].id + "');";
                pool.query(query, (error: any, results: any) => {
                    if (error) {
                        throw error
                    }

                    res.status(200).json({ message: `Added User Successfully !`, addedRecord: newValue })
                })
            });
            }
        })
    }



})

//EDIT MEMBER

router.put('/:id', (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM users where id =${id}`, (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result.rows.length === 0) {

            res.status(400).json({ message: `User Not Exists` });
        }
        else {
            let firstName = req.body.first__name;
            let middleName = req.body.middle__name;
            let lastName = req.body.last__name;
            let email = req.body.email;
            let phoneNumber = req.body.phone_number;
            let address = req.body.address;
            let dateTime=req.body.datetime;
            let customerN=req.body.customer_Name;
            let role = req.body.role;
            // if (phoneNumber.length !== 10) {
            //     res.status(400).json({ message: `Give Correct Input` })
            //     return
            // }
            const Sid=`select id from customer where name='${customerN}';` ;
            pool.query(Sid,(error:any,result:any)=>
            {
                if(error)
                {throw error;}
            else{    
            const query = `UPDATE users SET "first__name"='${firstName}', "middle__name"='${middleName}', "last__name"='${lastName}', "email"='${email}', "phone_number"=${phoneNumber},"role"='${role}', "address"='${address}',"customer_id"='${result.rows[0].id}' where id=${id};`;

            console.log(query);
            pool.query(query, (error: any, result: any) => {
                if (error) {
                    throw error
                }
                res.status(200).json({
                    message: `Updated Row with id = ${id} Successfully`, updatedRecord: {
                        id: id,
                        first__name: firstName,
                        middle__name: middleName,
                        last__name: lastName,
                        email: email,
                        phone__number: phoneNumber,
                        role: role,
                        address: address,
                        datetime:dateTime
                    }
                })
            })
        }})
    }
    })
})

//DELETE MEMBER
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    
    pool.query(`SELECT * FROM users where id =${id}`, (error: any, result: any) => {
        if (error) {
            throw error
        }
        if (result.rows.length === 0) {

            res.status(400).json({ message: `User Not Exists` })
        }
        else {

            const query = `DELETE from users where id=${id};`;
            console.log(query);
            pool.query(query, (error: any, result: any) => {
                if (error) {
                    throw error
                }

                res.status(200).json({ message: `Deleted Row with id = ${id} Successfully !` })
            })
        }
    })

})
module.exports = router;

