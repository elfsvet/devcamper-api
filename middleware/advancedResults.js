const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // Fields to Exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt , $gte , $lt , $lte , $in)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  ); // return $lte or $in

  // Building query
  // finding resource
  query = model.find(JSON.parse(queryStr))

  // select fiends
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // by default will give us resent (descending order, decreasing) created first to get it other way around use sort=createdAt (ascending order, increasing)
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  // limit per page
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if(populate){
    query = query.populate(populate)
  }

  // executing query
  const results = await query;

  // Pagination result
  const pagination = {};
  // if we not at the end display next page number
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  // if we not at the beginning display prev page number
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
