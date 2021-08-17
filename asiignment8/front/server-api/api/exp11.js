//import express from "express";
var express = require("express");
var router = express.Router();
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432
});
//SENDS ALL MEMBERS OF JSON DATA
router.get("/", function (req, res) {
    var query = "SELECT U.id, U.\"first__name\", U.\"middle__name\", U.\"last__name\", U.email, U.\"phone_number\", \n    U.address,U.datetime, U.name as \"customer_Name\", role.name as role FROM (\n    SELECT users.*, customer.name  FROM users INNER JOIN customer ON users.\"customer_id\"=customer.id)\n     as U INNER JOIN role on U.role=role.name ORDER BY U.id;";
    pool.query(query, function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result.rows);
        res.status(200).json(result.rows);
    });
});
//SEND A SPECIFIC MEMEBER FROM JSON DATA
router.get("/:id", function (req, res) {
    var id = req.params.id;
    var query = "SELECT U.id, U.\"first__name\", U.\"middle__name\", U.\"last__name\", U.email, U.\"phone_number\", \n    U.address,U.datetime, U.name as \"customer_Name\", role.name as role FROM (\n    SELECT users.*, customer.name  FROM users INNER JOIN customer ON users.\"id\"=customer." + id + ")\n     as U INNER JOIN role on U.role=role.name where U.id=${id};";
    pool.query(query, function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result.rows);
        res.status(200).json(result.rows);
    });
});
//ADD MEMBER TO THE EXISTING JSON
router.post("/", function (req, res) {
    var newValue = {
        ID: req.body.id,
        First__Name: req.body.first__name,
        Middle__Name: req.body.middle__name,
        Last__Name: req.body.last__name,
        Email: req.body.email,
        Phone_Number: req.body.phone_number,
        Role: req.body.role,
        Address: req.body.address,
        DateTime: req.body.datetime,
        CustomerName: req.body.customer_id
    };
    console.log(newValue);
    if (!newValue.First__Name || !newValue.Last__Name || !newValue.Email || !newValue.Phone_Number || !newValue.Role || !newValue.Address || !newValue.CustomerName) {
        res.status(400).json({ message: "Give Correct Input" });
    }
    // else if (data.some(data => newValue.Phone_Number === data.Phone_Number)) {
    //     res.status(400).json({ message: `User Already Exists` })
    // }
    else {
        pool.query("SELECT id FROM users where \"phone_number\" ='" + newValue.Phone_Number + "'", function (error, result) {
            if (error) {
                throw error;
            }
            if (result.rows.length !== 0) {
                console.log(result);
                res.status(400).json({ message: "User Already Exists" });
            }
            else {
                var Sid = "select id from customer where name='" + newValue.CustomerName + "';";
                pool.query(Sid, function (error, results) {
                    if (error) {
                        throw error;
                    }
                    var query = "INSERT into users (\"first__name\", \"middle__name\", \"last__name\", \"email\", \"phone_number\", \"role\", \"address\",\"datetime\",\"customer_id\") VALUES ('" + newValue.First__Name + "','" + newValue.Middle__Name + "','" + newValue.Last__Name + "','" + newValue.Email + "','" + newValue.Phone_Number + "','" + newValue.Role + "','" + newValue.Address + "','" + newValue.DateTime + "','" + results.rows[0].id + "');";
                    pool.query(query, function (error, results) {
                        if (error) {
                            throw error;
                        }
                        res.status(200).json({ message: "Added User Successfully !", addedRecord: newValue });
                    });
                });
            }
        });
    }
});
//EDIT MEMBER
router.put('/:id', function (req, res) {
    var id = req.params.id;
    pool.query("SELECT * FROM users where id =" + id, function (error, result) {
        if (error) {
            throw error;
        }
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User Not Exists" });
        }
        else {
            var firstName_1 = req.body.first__name;
            var middleName_1 = req.body.middle__name;
            var lastName_1 = req.body.last__name;
            var email_1 = req.body.email;
            var phoneNumber_1 = req.body.phone_number;
            var address_1 = req.body.address;
            var dateTime_1 = req.body.datetime;
            var customerN = req.body.customer_Name;
            var role_1 = req.body.role;
            // if (phoneNumber.length !== 10) {
            //     res.status(400).json({ message: `Give Correct Input` })
            //     return
            // }
            var Sid = "select id from customer where name='" + customerN + "';";
            pool.query(Sid, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    var query = "UPDATE users SET \"first__name\"='" + firstName_1 + "', \"middle__name\"='" + middleName_1 + "', \"last__name\"='" + lastName_1 + "', \"email\"='" + email_1 + "', \"phone_number\"=" + phoneNumber_1 + ",\"role\"='" + role_1 + "', \"address\"='" + address_1 + "',\"customer_id\"='" + result.rows[0].id + "' where id=" + id + ";";
                    console.log(query);
                    pool.query(query, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        res.status(200).json({
                            message: "Updated Row with id = " + id + " Successfully",
                            updatedRecord: {
                                id: id,
                                first__name: firstName_1,
                                middle__name: middleName_1,
                                last__name: lastName_1,
                                email: email_1,
                                phone__number: phoneNumber_1,
                                role: role_1,
                                address: address_1,
                                datetime: dateTime_1
                            }
                        });
                    });
                }
            });
        }
    });
});
//DELETE MEMBER
router["delete"]('/:id', function (req, res) {
    var id = req.params.id;
    pool.query("SELECT * FROM users where id =" + id, function (error, result) {
        if (error) {
            throw error;
        }
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User Not Exists" });
        }
        else {
            var query = "DELETE from users where id=" + id + ";";
            console.log(query);
            pool.query(query, function (error, result) {
                if (error) {
                    throw error;
                }
                res.status(200).json({ message: "Deleted Row with id = " + id + " Successfully !" });
            });
        }
    });
});
module.exports = router;
