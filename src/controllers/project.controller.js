const Project = require("../models/project");

projectController = {};

//TODOS LOS PROYECTOS PARA RENDERIZAR DESDE BACKEND--------
projectController.renderProjects = async (req, res) => {
  const projects = await Project.find();
  console.log(projects[0].links);
  res.render("pages/project", {
    title: "Admin Panel - Proyectos",
    projects,
  });
};
//TODOS LOS PROYECTOS PARA PETICION DE API--------------
projectController.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  console.log(projects[0].links);
  res.send({ projects });
};
//FORMULARIO PARA NUEVO PROYECTO---------------------
projectController.newProject = (req, res) => {
  res.render("pages/project", {
    title: "Añadir projecto",
    newproject: true,
  });
};
//AÑADIR --------------------------------
projectController.addProject = async (req, res) => {
  console.log(req.body);
  const {
    title,
    description,
    languages,
    website,
    frontend,
    backend,
  } = req.body;
  const links = [website, frontend];
  if (backend !== "") links.push(backend);
  const newProject = new Project({ title, description, languages, links });
  try {
    await newProject.save();
    req.flash("success_msg", "Proyecto añadido correctamente");
    res.redirect("/project");
  } catch (err) {
    console.log(err);
  }
};
//BORRAR------------------------------------------
projectController.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) req.flash("error_msg", "No se ha podido eliminar el proyecto");
    else req.flash("success_msg", "Proyecto eliminado correctamente");

    res.redirect("/project");
  });
};
//RECUPERAR DATOS PARA ACTUALIZAR ----------------------
projectController.editProject = async (req, res) => {
  const formdata = await Project.findById(req.params.id);
  res.render("pages/project", { formdata });
};
//ACTUALIZAR--------------------------------------
projectController.updateProject = async (req, res) => {
  const {
    title,
    description,
    languages,
    website,
    frontend,
    backend,
  } = req.body;
  const links = [website, frontend];
  if (backend !== "") links.push(backend);
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      languages,
      links,
    });
    req.flash("success_msg", "Proyecto actualizado correctamente");
  } catch (err) {
    req.flash("error_msg", "Error al actualizar proyecto");
  }
  res.redirect("/project");
};
//BUSCAR------------------------------------------------
projectController.searchProject = async (req, res) => {
  const { search } = req.body;
  const regex = new RegExp(search, "i");
  try {
    const projects = await Project.find({
      $or: [{ title: regex }, { description: regex }, { languages: regex }],
    });
    if (projects.length <= 0) {
      req.flash(
        "error_msg",
        'No se han encontrado proyectos que contengan "' + search + '"'
      );
      res.redirect("/project");
    } else {
      res.render("pages/project", {
        projects,
        success_msg: 'Proyectos encontrados que contienen "' + search + '"',
      });
    }
  } catch (err) {
    req.flash("error_msg", "Algo ha fallado al hacer la búsqueda");
    res.redirect("/project");
  }
};

module.exports = projectController;
