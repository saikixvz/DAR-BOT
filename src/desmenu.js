const desmenu = (prefix, pushname) => {
    return `
▋▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄    
▋┋*🔊COMANDOS DE DESCARGAS🔊*
▋┋ 
▋┋*🎶AUDIO🎶*
▋┋
▋┋${prefix}play
▋┋Coloca el nombre de la cancion o el link del video YT
▋┋
▋┋${prefix}play2
▋┋Una alternativa por si *play llego a su limite de canciones
▋┋
▋┋Ejemplo:
▋┋${prefix}play A lo mexicano - Geramx
▋┋
▋┋Ejemplo:
▋┋${prefix}play www.youtube.com/xxxxxxxx
▋┋
▋▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄ 
▋┋*🎞VIDEO🎞*
▋┋
▋┋${prefix}ytmp4
▋┋Descarga videos de YouTube
▋┋
▋┋Ejemplo:
▋┋${prefix}ytmp4 www.youtube.com/xxxxxxxx
▋┋    
▋┋Nota:!play y !play2 tiene un limite de 2000 canciones en el server
▋┋si llega a su limite se restablecera dentro de 24 horas
▋┋
▋┋*☂︎𝓓𝓪𝓻𝓵𝔂𝓷☂︎*
▋▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄ 
`

}

exports.desmenu = desmenu
