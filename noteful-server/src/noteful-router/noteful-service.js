
const NotefulService = {
  getAllNotes(knex) {
    return knex.select("*").from("noteful_notes");
  },
  insertNotes(knex, newNotes) {
    return knex
      .insert(newNotes)
      .into("noteful_notes")
      .returning("*")
      .then(rows => rows[0]);
  },
  getById(knex, id) {
    return knex
      .from("noteful")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteNotes(knex, id) {
    return knex
      .from("noteful")
      .where({ id })
      .delete();
  },
  updateNotes(knex, id, newNoteField) {
    return knex
      .from("noteful")
      .where({ id })
      .update(newNoteField);
  }
};
module.exports = NotefulService;