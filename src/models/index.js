const Album = require('./Album')
const Artist = require('./Artist')
const Genre = require('./Genre')
const Song = require('./Song')


//genreArtist
Genre.belongsToMany(Artist, { through: "genreArtist" })
Artist.belongsToMany(Genre, { through: "genreArtist" })


//album => artistId
Album.belongsTo(Artist) 
Artist.hasMany(Album)

//song => albumId
Song.belongsTo(Album) 
Album.hasMany(Song)

//songArtist
Song.belongsToMany(Artist, { through: 'songArtist' })
Artist.belongsToMany(Song, { through: 'songArtist' })

//songGenres
Song.belongsToMany(Genre, { through: 'songGenre' })
Genre.belongsToMany(Song, { through: 'songGenre' })