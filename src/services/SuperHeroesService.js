const md5 = require('md5');
const base_url = 'https://gateway.marvel.com:443/v1/public/characters';
const publicKey = '0595a91eaa2ad0dd82034acc951ad531';
const privateKey ='40fb43aeab91af3fad83f94b6f69a03d18444fdb';
const ts = new Date().getTime();
const strHash = ts+privateKey+publicKey;
const hash = md5(strHash); 

export const favsArray = [];

export const getUrl = (offset, orderBy, name) => {
    if(name){
        return `${base_url}?orderBy=${orderBy}&nameStartsWith=${name}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    }else{
        return `${base_url}?orderBy=${orderBy}&limit=10&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    } 
}

export const getComics = (comicUrl) => {
    return `${comicUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
}

export const getSuperHeroes = (offset, orderBy, name ) => {
    return getUrl(offset, orderBy, name);
}

export const getSuperHeroById = (id) => {
    return `${base_url}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}

export const deleteFavComic = (comic) => {
    const index = favsArray.indexOf(comic);
    if (index > -1) {
      favsArray.splice(index, 1);
    }
  }
