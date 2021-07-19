require("../config/db.config.js");

const User = require('../models/User.model');
const Offer = require('../models/Offer.model');

const faker = require('faker');
const mongoose = require('mongoose');
const toonavatar = require('cartoon-avatar');


mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase()
        .then(() => {
            console.log('Database cleared');
        })
        .then(() => {
            const usersToCreate = [{
                fullName: 'Leona',
                email: 'testing1@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Ahri',
                email: 'testing2@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Shen',
                email: 'testing3@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Akali',
                email: 'testing4@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Taliyah',
                email: 'testing5@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Taric',
                email: 'testing6@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Vayne',
                email: 'testing7@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Zoe',
                email: 'testing8@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Pyke',
                email: 'testing9@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Jinx',
                email: 'testing10@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Bard',
                email: 'testing11@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Maokai',
                email: 'testing12@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Lucian',
                email: 'testing13@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"male"}),
            }, {
                fullName: 'Lux',
                email: 'testing14@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }, {
                fullName: 'Kayle',
                email: 'testing15@gmail.com',
                password: '12345678',
                image: toonavatar.generate_avatar({"gender":"female"}),
            }]
            return User.create(usersToCreate)
        })
        .then((data) => {
            const offersToCreate = [];
            data.forEach((user) => {
             for (let i = 0; i < 4; i++) {
                const offer = {
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraphs(),
                    author: user._id,
                    images: [faker.image.image(), faker.image.image()],
                }
                offersToCreate.push(offer)
                }
            });
            return Offer.insertMany(offersToCreate)
        })
        .then(() => {
        })
        .catch(e => console.error(e))
        .finally(() => {
            mongoose.connection.close()
                .then(() => console.log('Finish seeds.js'))
                .catch(e => console.error(e))
                .finally(() => {
                    process.exit(0)
                })
        })
})