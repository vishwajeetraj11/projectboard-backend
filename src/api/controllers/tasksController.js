export const getAllTasks = (req, res) => {
  return res.status(200).json({ status: 'Success get All Tasks' });
};

export const getTaskById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createTask = (req, res) => {
  console.log(req.params);
  return res.status(200).json({
    status: 'success',
  });
};
