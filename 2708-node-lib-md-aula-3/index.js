import fs from 'fs';
import chalk from 'chalk';

/*
function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  //O método matchAll é uma função muito útil em JavaScript para trabalhar com expressões regulares. 
  // Ele permite que você encontre todas as correspondências de um padrão em uma string, 
  // retornando um iterador que contém todas as ocorrências.
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados;
}
  */
function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
  
  return {
    total_links: resultados.length,
    links: resultados.length !== 0 ? resultados : 'não há links no arquivo'
   
  };
}

function trataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// async/await 

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    console.log(extraiLinks(texto));
  } catch (erro) {
    trataErro(erro)
  }
}

pegaArquivo('./arquivos/texto.md');
