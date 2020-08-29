const { Router } = require("express");
const router = Router();
const multer = require("../config/multer");

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

const { isAuth } = require("../helpers/auth");

router.get("/project", isAuth, renderProjects);
router.get("/project/getall", getAllProjects);
router.get("/project/newproject", isAuth, newProject);
router.post("/project/addproject", isAuth, addProject);
router.delete("/project/delete/:id", isAuth, deleteProject);
router.post("/project/edit/:id", isAuth, editProject);
router.put("/project/update/:id", multer.single("image"), updateProject);
router.post("/project/search", isAuth, searchProject);

module.exports = router;
