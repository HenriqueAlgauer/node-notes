const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    // Use transações para garantir que todas as inserções sejam feitas corretamente
    const trx = await knex.transaction();

    try {
      // Insere a nota e obtém o ID gerado
      const [insertedNote] = await trx("notes").insert({
        title,
        description,
        user_id,
      }).returning('id'); // Garante que o id seja retornado

      const note_id = insertedNote.id; // Extrai o ID do objeto retornado

      // Prepara a inserção dos links
      const linksInsert = links.map(link => ({
        note_id,
        url: link,
      }));


      // Insere os links
      await trx("links").insert(linksInsert);

      // Prepara a inserção das tags
      const tagsInsert = tags.map(name => ({
        note_id,
        name,
        user_id,
      }));

      // Insere as tags
      await trx("tags").insert(tagsInsert);

      // Confirma a transação
      await trx.commit();

      // Retorna a resposta com sucesso
      response.status(201).json({message:"Deu certo :)"});
    } catch (error) {
      // Em caso de erro, desfaz a transação
      await trx.rollback();
      console.error("Error creating note:", error); // Log do erro
      response.status(500).json({ error: 'Error creating note' });
    }
  }
}

module.exports = NotesController;
