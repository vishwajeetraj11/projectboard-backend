export const getAllProjects = (req, res) => {
  return res.status(200).json({ status: 'Success get All Tasks' });
};

export const getProjectById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createProject = (req, res) => {
  console.log(req.params);
  return res.status(200).json({
    status: 'success',
  });
};
