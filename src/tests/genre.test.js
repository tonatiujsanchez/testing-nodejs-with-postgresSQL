const request = require('supertest')
const app = require('../app')

const genre = {
    name: 'Rock',
}

const genreUpdate = {
    name: 'Pop'
}

let genreId;

const BASE_URL = '/api/v1/genres'


test('POST => / should return status code 201 and res.body.name === genre.name', async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id
    
    expect( res.status ).toBe(201)
    expect( res.body ).toBeDefined()
    expect( res.body.name ).toBe(genre.name)
    
})

test('GET => / should return status code 200 and res.body[0].name === genre.name', async()=> {
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(genre.name)
    expect(res.body).toHaveLength(1)
})

test('GET => /:id should return status 200 and res.body.name === genre.name', async()=>{
    const res = await request(app)
        .get(`${ BASE_URL }/${ genreId }`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test('PUT => /id should return status 200 and return res.body.name === genre.update', async()=>{
    const res = await request(app)
        .put(`${BASE_URL}/${ genreId }`)
        .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genreUpdate.name)
})


test('DELETE => /:id should return status 204', async()=> {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)
    
    expect(res.statusCode).toBe(204)
})