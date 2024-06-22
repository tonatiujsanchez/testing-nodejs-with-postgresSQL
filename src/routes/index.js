const express = require('express')
const router = express.Router()

const routerAlbum = require('./album.router')
const routerArtist = require('./artist.router')
const routerGenre = require('./genre.router')
const routerSong = require('./song.router')

// colocar las rutas aquí
router.use('/albums', routerAlbum)
router.use('/artists', routerArtist)
router.use('/genres', routerGenre)
router.use('/song', routerSong)

module.exports = router