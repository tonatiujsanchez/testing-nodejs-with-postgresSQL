require('../models')
const request = require('supertest')
const app = require('../app')


const artist = {
    name: 'Kaleo',
    country: 'Islandia',
    formationYear: 2012,
    image: 'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO4keqyc-default.jpg'
}

const artistUpdate = {
    name: 'Kaleo UPDATED',
    country: 'Islandia',
    formationYear: 2012,
    image: 'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO4keqyc-default.jpg'
}

let artistId

const BASE_URL = '/api/v1/artists'

test('POST => / should return status code 201', async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(artist)
    
    artistId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(artist.name)
})

test('GET => / should return status code 200 and res.body[0].name === artist.name', async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(artist.name)
    expect(res.body).toHaveLength(1)
})

test('GET => /:id should return status code 200 and res.body.name === artist.name', async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${artistId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(artist.name)
})

test('PUT => /:id should return status code 200 and res.body.name === artistUpdate.name', async() => {
    const res = await request(app)
        .put(`${BASE_URL}/${artistId}`)
        .send(artistUpdate)
    
    expect(res.status).toBe(200)
})

test('DELETE => /:id should return status code 204', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${artistId}`)

    expect(res.status).toBe(204)
})
