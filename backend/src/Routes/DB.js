const MongoClient = require('mongodb')
const Evaluate = require('../Algorithms/EvaluateQuiz')
const ObjectId = require('mongodb').ObjectId

let db
const DBStart = async () => {
    console.log('DB server connecting...')
    const client = await MongoClient.connect(
        'mongodb://quizdom:quizdom-mongodb@cluster0-shard-00-00.lecax.mongodb.net:27017,cluster0-shard-00-01.lecax.mongodb.net:27017,cluster0-shard-00-02.lecax.mongodb.net:27017/quizdom-project?ssl=true&replicaSet=atlas-hmlbn7-shard-0&authSource=admin&retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    console.log('DB Connected Successfully.')
    db = client.db('quizdom-project')
}
DBStart()
const withDB = async (operations, res) => {
    try {
        await operations(db)
        // client.close()
    } catch (error) {
        console.log('Error connecting to DB : ', error)
        res.status(500).json({ message: 'Error Connecting to db ', error })
    }
}

const createUser = async (uid, name, email, res) => {
    await withDB(async (db) => {
        const user = await db.collection('users').findOne({ uid: uid })
        if (!user) {
            const result = await db.collection('users').insertOne({
                uid,
                name,
                email,
                createdQuiz: [],
                attemptedQuiz: []
            })
            res.status(200).json({ message: 'User Created successfully.' })
        } else {
            res.status(200).json({ message: 'User Record Exist' })
        }
    })
}

createQuiz = async (quiz, res) => {
    try {
        await withDB(async (db) => {
            quiz['responses'] = []
            const result = await db.collection('quizzes').insertOne(quiz)
            res.status(200).json({
                message: 'Quiz created successfully',
                quizId: result.insertedId
            })
            console.log('quiz ID', result.insertedId)
            const query = { uid: quiz.uid }
            const addQuiz = {
                $push: { createdQuiz: result.insertedId }
            }
            await db.collection('users').updateOne(query, addQuiz)
            console.log('Quiz Added to Creator Document: ', result.insertedId)
        })
    } catch (error) {
        res.status(200).json({ message: 'Error creating quiz', error })
        console.log('Error : ', error)
    }
}

submitQuiz = async (submittedQuiz, res) => {
    withDB(async (db) => {
        try {
            const cursor = db
                .collection('quizzes')
                .find({ _id: new ObjectId(submittedQuiz.quizId) })
                .project({ questions: 1 })

            const quiz = await cursor.toArray()

            console.log('in quiz store')
            const score = Evaluate(quiz[0].questions, submittedQuiz.questions)
            console.log('score : ', score)
            res.status(200).json({ score })

            // Update in quizzes responses
            await db.collection('quizzes').updateOne(
                { _id: new ObjectId(submittedQuiz.quizId) },
                {
                    $push: {
                        responses: { uid: submittedQuiz.uid, score: score }
                    }
                }
            )
            // Update user's attempted quizzes
            await db.collection('users').updateOne(
                { uid: submittedQuiz.uid },
                {
                    $push: {
                        attemptedQuiz: ObjectId(submittedQuiz.quizId)
                    }
                }
            )
        } catch (error) {
            console.log('Error:', error)
            res.status(500).json({ error })
        }
    })
}

const getResponses = (obj, res) => {
    withDB(async (db) => {
        const response = []
        const cursor = db
            .collection('quizzes')
            .find({ _id: new ObjectId(obj.quizCode) })
            .project({ uid: 1, responses: 1 })
        const arr = await cursor.toArray()
        const response2 = []
        const result3 = await arr[0].responses.map(async (element) => {
            const cursor2 = await db
                .collection('users')
                .findOne({ uid: element.uid })
            return { name: cursor2.name, score: element.score }
        })
        // arr[0].responses.forEach(async (element) => {
        //     const cursor2 = await db
        //         .collection('users')
        //         .findOne({ uid: element.uid })
        //     response2.push({ name: cursor2.name, score: element.score })
        //     console.log('res : ', response2)
        // })
        // const res2 = await Promise.all(result3)
        // console.log(' response : ', res2)
    }, res)
}

module.exports.withDB = withDB
module.exports.createUser = createUser
module.exports.createQuiz = createQuiz
module.exports.submitQuiz = submitQuiz
module.exports.getResponses = getResponses
