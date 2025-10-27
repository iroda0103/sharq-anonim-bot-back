const model = require("./mongo/models/feedbackModel");

const feedbackDb = Object.freeze({
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

// async function findAll({ filters, q, page, sort }) {
//   const filter = { ...filters };

//   if (q) {
//     filter.$or = [
//     ];
//   }

//   let dbQuery = model.find(filter);

//   const total = await dbQuery.clone().count().exec();

//   if (page) {
//     dbQuery.limit(page.limit).skip(page.offset);
//   }

//   if (sort) {
//     dbQuery.sort({ [sort.by]: sort.order == "asc" ? 1 : -1 });
//   }

//   const result = await dbQuery.lean();

//   const res = result.map((user) => {
//     const { _id: id, ...info } = user;
//     return { id, ...info };
//   });

//   return { data: res, total };
// }

async function findAll({ filters, q, page, sort }) {
  const filter = { ...filters };

  if (q) {
    filter.$or = [
      // Qidiruv shartlari
    ];
  }

  let dbQuery = model.find(filter)
    .populate('user') // User ma'lumotlarini join qilish
    .lean();

  const total = await model.countDocuments(filter);

  if (page) {
    dbQuery = dbQuery.limit(page.limit).skip(page.offset);
  }

  if (sort) {
    const sortOrder = sort.order === "asc" ? 1 : -1;
    dbQuery = dbQuery.sort({ [sort.by]: sortOrder });
  }

  const result = await dbQuery;

  const res = result.map((feedback) => {
    const { _id: id, user_id, user, ...info } = feedback;
    
    // User ma'lumotlarini formatlash
    const userInfo = user ? {
      user: {
        id: user._id,
        telegram_id: user.telegram_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
      }
    } : { user: null };

    return { 
      id, 
      ...info, 
      ...userInfo 
    };
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

module.exports = feedbackDb;