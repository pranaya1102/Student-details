const router = require("express").Router();
const Student = require("../../database/models/studentModel");


router.post("/student", async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  const query = createQuery(req);

  try {
    const students = await Student.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));
    const count = await Student.find(query).countDocuments();
    res.json({ data: students, metadata: count });
  } catch (error) {
    console.log("fetching students==>", error);
  }
});

function createQuery(req) {
  const filters = req.body;
 
  const query = {
    $and: [
      filters.classes ? { class: { $in: filters.classes } } : {},
      filters.gender ? { gender: { $in: filters.gender } } : {},
      filters.bloodGroup ? { bloodGroup: { $in: filters.bloodGroup } } : {},
      filters.age
        ? { age: { $gte: filters.age.startAge, $lte: filters.age.endAge } }
        : {},
    ],
  };
  switch (filters.search?.key) {
    case "name":
      query["name"] = filters.search.value;
      console.log(query);
      break;
    case "rollNo":
      query["rollNo"] = filters.search.value;
      console.log(query);
      break;
  }
  
  return query;
}
router.post("/addStudent", (req, res) => {
  const payload = req.body;
  const studentDetail = new Student({
    name: payload.name,
    age: payload.age,
    gender: payload.gender,
    rollNo: payload.rollNo,
    class: payload.class,
    bloodGroup: payload.bloodGroup,
    marks: payload.marks,
    mobile: payload.mobile,
    address: payload.address,
  });
  studentDetail
    .save()
    .then((studentDetail) => res.status(201).json(studentDetail))
    .catch((error) => console.log(error));
});

module.exports = router;
