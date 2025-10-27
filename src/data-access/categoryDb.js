const model = require("./mongo/models/categoryModel");

const categoryDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update
});

async function insert({ id: _id, ...info }) {
  const result = await model.create({ _id, ...info });
  const { _id: id, res } = result;
  return { id, ...info };
}

async function findAll({ filters, q, page, sort }) {
  const filter = { ...filters };

  if (q) {
    filter.$or = [
      { first_name: { $regex: `.*${q}.*`, $options: "i" } },
      { last_name: { $regex: `.*${q}.*`, $options: "i" } },
      { username: { $regex: `.*${q}.*`, $options: "i" } }
    ];
  }

  let dbQuery = model.find(filter);

  const total = await dbQuery.clone().count().exec();

  if (page) {
    dbQuery.limit(page.limit).skip(page.offset);
  }

  if (sort) {
    dbQuery.sort({ [sort.by]: sort.order == "asc" ? 1 : -1 });
  }

  const result = await dbQuery.lean();

  const res = result.map((user) => {
    const { _id: id, ...info } = user;
    return { id, ...info };
  });

  return { data: res, total };
}

async function findById({ id: _id }) {
  const result = await model.findById(_id).lean();

  if (!result) {
    return null;
  }

  const { _id: id, ...info } = result;
  return { id, ...info };
}

async function findOne(filter) {
  const result = await model.findOne(filter).lean();

  if (!result) {
    return null;
  }

  const { _id: id, ...info } = result;
  return { id, ...info };
}

async function remove({ id: _id }) {
  return model.deleteOne({ _id }).lean();
}

async function update({ id: _id, ...data }) {
  const result = await model
    .findOneAndUpdate({ _id }, data, { new: true })
    .lean();
  const { _id: id, ...res } = result;

  return { id, ...res };
}

module.exports = categoryDb;