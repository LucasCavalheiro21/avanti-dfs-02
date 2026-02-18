import prisma from "../PrismaClient.js";

// GET conhecimentos

export const listarConhecimentos = async (request, response) => {

try{

const conhecimentos = await prisma.conhecimentos.findMany({

    include: {pessoa: true}

});

return response.status(200).json(conhecimentos);

}catch(error){

return response.status(500).send();

}

};

// POST conhecimentos

export const criarConhecimento = async (request, response) => {

const {titulo, descricao, categoria, nivel, pessoa_id} = request.body;

try{

const conhecimentos = await prisma.conhecimentos.create({

    data: {titulo, descricao, categoria, nivel, pessoa_id}

});

return response.status(201).json(conhecimentos);

}catch(error){

return response.status(500).send();

}

};

// PUT conhecimentos

export const atualizarConhecimento = async (request, response) => {

const {titulo, descricao, categoria, nivel, pessoa_id} = request.body;
const {id} = request.params;

try{

const conhecimentos = await prisma.conhecimentos.findUnique({where: {id}});

if(!conhecimentos){

    return response.status(404).json("Conhecimento não encontrado :(");

}

const conhecimentosUpdated = await prisma.conhecimentos.update({

    data: {titulo, descricao, categoria, nivel, pessoa_id},
    where: {id}

});

return response.status(200).json(conhecimentosUpdated);

}catch(error){

return response.status(500).send();

}

};

// DELETE conhecimentos

export const deletarConhecimento = async (request, response) => {

const {id} = request.params;

try{

const conhecimentos = await prisma.conhecimentos.findUnique({where: {id}});

if(!conhecimentos){

    return response.status(404).json("Conhecimento não encontrado :(");

}

await prisma.conhecimentos.delete({

    where: {id}

});

return response.status(204).send();

}catch(error){

return response.status(500).send();

}

};