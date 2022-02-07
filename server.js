const express = require("express");
const morgan = require('morgan');
const path = require('path');
const app = express();

const cp_albums = [
    { id: 1, albumName: "Cancion de Alerta", year: 1998, info: "Canción de Alerta is the first album by the Puerto Rican reggae band, Cultura Profética. It was recorded in Jamaica at Marley Music Studios and released in 1998 under the Tuff Gong label. The group was the first Spanish-language act to record in Marley's studios. The record discusses a number of social issues in Puerto Rico, including the importance of acknowledging the island's African influence. " },
    { id: 2, albumName: "Ideas Nuevas", year: 1999, info: "The group returned to Tuff Gong studios in 1999 to record its second album, Ideas Nuevas, which was released in May 2000. On this record, the band began experimenting with a variety of rhythms such as bossa nova, salsa, ska, and jazz. The album was dedicated to a music instructor at the University of Puerto Rico. The band performed in Tito Puente's amphitheater on May 12, 2000, later releasing a recording of the performance in the form of the live album Cultura en Vivo."},
    { id: 3, albumName: "Diario", year: 2002, info: "In 2002, the band released its third studio album, Diario. On this album, the band aimed to produce a record that represents Puerto Rican daily life, occasionally introducing songs with interludes of casual conversations and background noise, exemplified by songs such as De Antes and Pa'l Tanama."},
    { id: 4, albumName: "M.O.T.A", year: 2005, info: "In 2004, Cultura Profetica began to focus on the international stage, eventually moving temporarily to Mexico. Their fourth studio album, M.O.T.A., was released in October 2005 after a tour through Mexico. M.O.T.A peaked at number 12 on the Billboard Hot Latin Albums chart, remaining at the position for two weeks. Also in 2005, the group collaborated with Puerto Rican rapper Vico C on his song 'Te Me Puedo Escapar' from his album Desahogo. In January 2006, the song 'Ritmo Que Pesa' from M.O.T.A peaked at number 35 on the Billboard Latin Pop Songs chart. In 2007, the group released Tribute to the Legend: Bob Marley, a live recording of the group performing Bob Marley songs. After the release of the tribute album, Cultura Profética toured extensively through Latin America and expanded its fan base, particularly in Argentina. A DVD covering their performance at Jose Miguel Agrelot Coliseum was released in late summer of 2008" },
    { id: 5, albumName: "La Dulzura", year: 2010, info: "In 2010, Cultura Profética released La Dulzura, the group's first album on its own record label, La Mafafa. While discussing the decision to create an independent record label, Rodríguez explained 'I can't deny we spoke with different labels, but we didn't find anything favorable. Labels are going through tough times and we decided to brave it on our own.' Many of the songs on the album were written and performed during the band's extensive touring beginning in 2007, and the songs went through numerous transformations during this time. Before the album's official release, the band posted songs on the internet, including 'La Complicidad', which became a radio hit in Puerto Rico. La Dulzura debuted at number five on Billboard's Top Latin Albums Chart. La Dulzura represented a stylistic departure for the group, both musically and lyrically. The song 'Del Tope al Fondo' is influenced by Argentine music, especially the genre of tango. Lyrically, the band discusses more romantic themes as opposed to the political emphasis of the group's previous records. Guitarist Eliut Gonzalez remarked that the band aimed to shift discussion to 'the good things in the world', explaining that 'We know that people need help, and that behind every revolution or movement, there is love. We wanted to document that in our music, but without doing it in a cheesy or typical way.' The singles 'Baja la Tensión', 'La Complicidad', 'Para Estar' and 'Ilegal' all charted on the Billboard Latin Pop Songs chart" },
    { id: 6, albumName: "Sobrevolando", year: 2019, info: "On November 1, 2019, the band released the album Sobrevolando, which debuted at number two on the Billboard Reggae Albums Chart. Rodríguez also collaborated with reggaeton artist Ozuna on the song 'Temporal' from his album Nibiru, released November 29, 2019. In March 2020, Cultura Profética collaborated with American singer John Legend and Mexican-American mariachi group Flor De Toloache on the single 'Quisiera'. The song, written by Dominican bachata artist Juan Luis Guerra, contains influences of reggae, soul, and mariachi." }
];

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    res.send(`
        <html>
        <head>
            <title>Cultura Profetica</title>
            <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
            <h2 id="heading"> Cultura Profetica </h2>
            <h5> 
                <p>Cultura Profética (translation: Prophetic Culture) is a Puerto Rican reggae band, formed in 1996. The group has often made use of the moog synthesizer, an instrument commonly used in traditional reggae but is generally rare in contemporary reggae. Despite primarily performing reggae music, the group incorporates various other rhythms into its compositions, including those of Caribbean genres such as salsa. The song "Reggae Rústico" from Ideas Nuevas includes an extended soneo, an improvised call-and-response section common in the salsa genre, at its closing, calling for unity in reggae music. Additionally, the band's music features a strong emphasis on improvisation and polyrhythmic patterns. Rodríguez notes that "We've developed what I think is our own genre. We don't consider ourselves a pop act but we do make popular music in the sense that we are supported by many people. People have finally understood what we do." Leila Cobo of Billboard observed elements of jazz in the single "La Complicidad," additionally describing it as "more mellow rock than reggae."</p>
                <p>Lyrically, the group addresses social issues including corruption, environmentalism, personal liberty, and Latin American identity. Canción de Alerta contains the song "Por qué cantamos," an adaptation of Uruguayan writer Mario Benedetti's poem of the same name. Author Eunice Rojas cites this as an example of the group using "the power of music to advance social causes." The song "Suelta Los Amarres" from Ideas Nuevas discourages listeners from using violence to advance a political cause. However, the lyrics on La Dulzura place more emphasis on interpersonal relationships and love. Silva notes that the group refrains from writing "romantic" lyrics, noting that "romanticism has a connotation of suffering for love. We are talking about the love that elevates and purifies your soul. We are talking in the sense of the love that sets you free. </p>
            </h5>
            <ul class='albumList'>
            ${cp_albums.map(({ id, albumName, year}) => `<div><a href='/${id}'> ${albumName} (${year}) </a></div>`).join('')}
            </ul>
        </body>
        </html>
    `)
});

app.get("/:id", (req, res, next) => {
    const { id } = req.params;
    const album = cp_albums.find(album => album.id === +id);
    res.send(`
        <html>
        <head>
            <title>Cultura Profetica</title>
            <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
            <h1>${album.albumName}</h1> 
            <h2> Year Released: ${album.year}<h2>
            <h4>${album.info}</h4>
            <h5><a href="/">Return to Main Page</a></h5>
        </body>
        </html>
    `)
});

app.listen(3000);