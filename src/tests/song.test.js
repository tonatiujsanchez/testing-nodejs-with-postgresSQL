require('../models')
const request = require('supertest')
const app = require('../app')
const Album = require('../models/Album')


const songUpdate = {
    name: 'Way Down We Go'
}

let song
let album

beforeAll( async()=>{
    
    album = await Album.create({
        name: 'You Remain',
        image: 'https://akamai.sscdn.co/uploadfile/letras/albuns/9/b/d/f/582951497881435.jpg',
        releaseYear: 2012
    })

    song = {
        name: 'Beautiful Things',
        albumId: album.id
    }
})

afterAll(async () => {
    await album.destroy()
})

const BASE_URL = '/api/v1/song'

test('POST => / should return status code 201 and res.body.name === song.name', async() => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(song)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)
})

test('GET => / should return status code 200 and res.body[0].name === song.name', async()=> {
    
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(song.name)
    
})