require("../config/db.config.js");

const User = require('../models/User.model');
const Offer = require('../models/Offer.model');

const faker = require("faker");
const mongoose = require('mongoose');


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
                image: faker.internet.avatar(),
            }, {
                fullName: 'Ahri',
                email: 'testing2@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Shen',
                email: 'testing3@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Akali',
                email: 'testing4@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Taliyah',
                email: 'testing5@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Taric',
                email: 'testing6@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Vayne',
                email: 'testing7@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Zoe',
                email: 'testing8@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Pyke',
                email: 'testing9@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Jinx',
                email: 'testing10@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Bard',
                email: 'testing11@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Maokai',
                email: 'testing12@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Lucian',
                email: 'testing13@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Lux',
                email: 'testing14@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }, {
                fullName: 'Kayle',
                email: 'testing15@gmail.com',
                password: '12345678',
                image: faker.internet.avatar(),
            }]
            return User.create(usersToCreate)
        })
        .then((data) => {
            console.log('entra');
            const offersToCreate = [];
            data.forEach((user) => {
                const offer = {
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraphs(),
                    author: user._id,
                    images: [faker.image.image(), faker.image.image()],
                }
                offersToCreate.push(offer)

            });
            return Offer.create(offersToCreate)
        })
        .then(() => {
            console.log('creado')
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