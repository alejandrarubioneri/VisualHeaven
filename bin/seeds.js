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
                fullName: 'Paloma Borro',
                email: 'palomaborro@gmail.com',
                password: '12345678',
                occupation: ['Producer', 'TV', 'Video Editor'],
                biography: 'Tuvo la mala suerte de estudiar audiovisuales y ahora está cursed',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Alejandra Rubio',
                email: 'alejandrarubio@gmail.com',
                password: '12345678',
                occupation: ['Photographer', 'Camera'],
                biography: 'Estudiante de programación, amante del diseño y la fotografía. Ahora también está cursed',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Ella Marija',
                email: 'lorde@gmail.com',
                password: '12345678',
                occupation: ['Music', 'Camera', 'Sound'],
                biography: 'Ella Marija Lani Yelich-OConnor (born 7 November 1996), known professionally as Lorde, is a New Zealand singer-songwriter.',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Hayley Nichole',
                email: 'heyleywilliams@gmail.com',
                password: '12345678',
                occupation: ['Music', 'Camera', 'Sound'],
                biography: 'Hayley Nichole Williams (born December 27, 1988) is an American singer, songwriter, musician, and businesswoman who is best known as the lead vocalist, primary songwriter, and keyboardist of the rock band Paramore.',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Michaela-Moses Ewuraba',
                email: 'michaelacoel@gmail.com',
                password: '12345678',
                occupation: ['Director', 'Producer', 'Screenwriting'],
                biography: 'Michaela Ewuraba Boakye-Collinson (born 1987), known professionally as Michaela Coel, is a British actress, screenwriter, director, producer and singer.',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Wesley Wales',
                email: 'wesanderson@gmail.com',
                password: '12345678',
                occupation: ['Director', 'Grip And Electric', 'Screenwriting', 'Post Production'],
                biography: 'Wesley Wales Anderson (born May 1, 1969) is an American filmmaker. His films are known for their symmetry, eccentricity and distinctive visual and narrative styles, and he is cited by some critics as a modern-day example of the auteur.',
                image: toonavatar.generate_avatar({
                    "gender": "male"
                }),
            }, {
                fullName: 'Zendaya Maree',
                email: 'zendaya@gmail.com',
                password: '12345678',
                occupation: ['Director', 'VFX', 'Screenwriting', 'Studio Engineers'],
                biography: 'Zendaya Maree Stoermer Coleman (born September 1, 1996) is an American actress and singer. She began her career as a child model and backup dancer before gaining prominence for her role as Rocky Blue on the Disney Channel sitcom Shake It Up (2010–2013).',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Thomas Stanley',
                email: 'tomholland@gmail.com',
                password: '12345678',
                occupation: ['Special FX', 'Other', 'Stunts'],
                biography: 'Thomas Stanley Holland (born 1 June 1996) is an English actor. A graduate of the BRIT School in London, he began his acting career on stage in the title role of Billy Elliot the Musical in the West End theatre from 2008 to 2010.',
                image: toonavatar.generate_avatar({
                    "gender": "male"
                }),
            }, {
                fullName: 'Hunter Schafer',
                email: 'hunterschafer@gmail.com',
                password: '12345678',
                occupation: ['Producer', 'Photographer'],
                biography: 'Hunter Schafer (born December 31, 1998) is an American fashion model, actress, and LGBTQ rights activist. In 2019, she made her acting debut portraying Jules in the HBO series Euphoria.',
                image: toonavatar.generate_avatar({
                    "gender": "female"
                }),
            }, {
                fullName: 'Alan E. Ball',
                email: 'alanball@gmail.com',
                password: '12345678',
                occupation: ['Producer', 'Director', 'Screenwriting'],
                biography: 'Alan Erwin Ball (born May 13, 1957) is an American writer, director, and producer for television, film, and theater.',
                image: toonavatar.generate_avatar({
                    "gender": "male"
                }),
            }]
            return User.create(usersToCreate)
        })
        .then((data) => {
            const offersToCreate = [{
                title: 'Video Editor',
                description: 'WarnerMedia seeks a Sports Assignment Coordinator for the Sports Newsgathering department. Sports Assignment Coordinators are responsible for working with the Sports Desk to ensure news of the day elements, game highlights, and affiliate requests are edited and posted on Bitcentral. In addition to the technical skills needed to bring in, edit and distribute content, this person should be adept at problem-solving and communicating with a variety of people both inside and outside the company.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Producer', 'TV', 'Video Editor', 'Cinema', 'Post Production', 'VFX'],
            }, {
                title: 'Executive Producer',
                description: 'What you will do: Drive execution of the game development team to build an amazing F2P mobile game that will delight and engage players, Manage the teams day-to-day activities while maintaining close communication with developers to ensure they meet deadlines, objectives and quality standards. What you will need: 8+ years of managing cross functional teams, Amazing team leadership experience, inspiring high performing teams, Strong organizational and analytical skills; attention to detail.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Producer', 'TV', 'Other'],
            }, {
                title: 'Digital Producer',
                description: 'Tactic is looking for a full-time Digital Producer who can work directly with our artists and engineers during the planning and development of our various, ongoing projects. The ideal candidate will be ready to manage client expectations, and internal budgets and timelines, to help deliver on the highest quality AR experiences. This position will report to our Executive Producer.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Studio Engineers', 'Other', 'Producer'],
            }, {
                title: 'Studio Camera Operator',
                description: 'The candidate must have demonstrated ability to frame, focus, and zoom while tracking focus. Ability to dolly, ped, and reposition/truck tripods. Must have an understanding of lighting concepts and equipment. A comprehensive understanding of the principles of video operations, including white balancing, shading and color correction is a must. Must have active participation in setting up and breaking down a show. Camera operators should have a positive can do attitude and be able to work all shifts in a dynamic, fast paced, environment. Evening and weekend work required.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Camera', 'TV', 'Grip And Electric'],
            }, {
                title: 'Hair And Makeup Artist',
                description: 'WZ Beauty Studio is looking for experienced and motivated Hairstylists and Makeup Artists to add to the Team. Must have 2+ years of experience in the beauty and bridal industry. Able to work flexible weekday hours to accommodate appointments and must be able to work Friday/Saturday/Sunday. Demonstrate professionalism, people skills, and have a fun personality. Have a complete professional kit and equipment to execute work effectively. Willing to travel within the DFW. Portfolio is required to show your work.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Cinema', 'TV', 'Hair And Makeup'],
            }, {
                title: 'Head of Sound',
                description: 'The Head of Sound is in charge of all sound in media projects and oversees all elements of audio in Post Production, including music and sound effects. The position is responsible for creating original music scores and/or selecting music from libraries for all of Gaias content. Must have 15+ years experience as a Sound Director / Supervisor for major television series and/or films.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Sound', 'TV', 'Other'],
            }, {
                title: 'Writer',
                description: 'The Emmy Award-winning agency, Studio City, is currently seeking a Creative Director to lead the marketing campaign for the fall season of a nationally syndicated talk show. This creative writer/producer must deliver inspired, innovative marketing and produce daily promotional materials including: image spots, topicals, and sizzle reels. It is essential that the candidate demonstrate contemporary and evolving techniques, copywriting and targeted positioning to connect with the intended viewer and a passion to routinely change up the norm.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Producer', 'TV', 'Screenwriting', 'Cinema'],
            }, {
                title: 'VFX Producer',
                description: 'FuseFX is seeking an experienced and talented VFX Producer with a background in television and/or feature film VFX to join our creative team. He/she will understand and anticipate client patterns regarding communication and potentially difficult situations over the course of a project. The VFX Producer is also expected to guide clients and employees when necessary; this is particularly relevant with the communication of pertinent information. This role partners with the VFX Supervisor in order to ensure that things move efficiently within the studio.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['VFX', 'TV', 'Video Editor', 'Special FX', 'Cinema'],
            }, {
                title: 'Freelance Photographer',
                description: 'National Speed is looking for a talented Freelance Photographer. Our ideal candidate is both a gearhead and digital media expert, who can merge passions for modified cars and visual storytelling to engage the car community with the insanely cool pictures and stories that take place at our shops daily.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Photographer', 'Other'],
            }, {
                title: 'Stunt Performer',
                description: 'Six Flags America is looking for skilled and experienced individuals to join our award-winning Entertainment Team as a Stunt Performer! Stunt Performers engage and entertain all park guests through high intensity stunts such as stage combat, sword work, gymnastics, acrobatics and more.',
                author: data[Math.floor(Math.random() * data.length)]._id,
                categories: ['Cinema', 'Stunts'],
            }]
            return Offer.create(offersToCreate)
        })
        .then(() => {})
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