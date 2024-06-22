require('../models')
const request = require('supertest')
const app = require('../app')

const album = {
    name: 'You Remain',
    image: 'https://akamai.sscdn.co/uploadfile/letras/albuns/9/b/d/f/582951497881435.jpg',
    releaseYear: 2012
}

let albumId

const BASE_URL = '/api/v1/albums'

test('POST => / should return status code 201 and res.body.name === album.name', async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(album)
    
    albumId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
})

test('GET => / should return status code 200 and res.body[0].name === album.name', async()=>{
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(album.name)
    expect(res.body).toHaveLength(1)
})

test('GET => /:id should return status code 200 and res.body.name === album.name', async()=> {
    const res = await request(app)
        .get(`${BASE_URL}/${albumId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
})