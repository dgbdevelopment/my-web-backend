const { Router } = require("express");
const router = Router();
const {
  renderProjects,
  getAllProjects,
  newProject,
  addProject,
  deleteProject,
  editProject,
  updateProject,
  searchProject,
} = require("../controllers/project.controller");

router.get("/project", renderProjects);
router.get("/project/getall", getAllProjects);
router.get("/project/newproject", newProject);
router.post("/project/addproject", addProject);
router.delete("/project/delete/:id", deleteProject);
router.post("/project/edit/:id", editProject);
router.put("/project/update/:id", updateProject);
router.post("/project/search", searchProject);

module.exports = router;
