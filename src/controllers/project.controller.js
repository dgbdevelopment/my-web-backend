const Project = require("../models/project");
const path = require("path");
const fs = require("fs-extra");

projectController = {};

//TODOS LOS PROYECTOS PARA RENDERIZAR DESDE BACKEND--------
projectController.renderProjects = async (req, res) => {
  const projects = await Project.find().sort({ priority: 'ascending' });
  res.render("pages/project", {
    title: "Admin Panel - Proyectos",
    projects,
  });
};
//TODOS LOS PROYECTOS PARA PETICION DE API--------------
projectController.getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ priority: 'ascending' });
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
  const {
    title,
    description,
    languages,
    website,
    frontend,
    backend,
    priority
  } = req.body;
  const links = [website, frontend];
  if (backend !== "") links.push(backend);
  const image = req.file.filename;
  const newProject = new Project({
    title,
    description,
    languages,
    links,
    image,
    priority
  });
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
  await Project.findByIdAndDelete(req.params.id, async (err, result) => {
    if (err) req.flash("error_msg", "No se ha podido eliminar el proyecto");
    else {
      await fs.unlink(
        path.resolve("src/public/assets/img/imguploads", result.image)
      );
      req.flash("success_msg", "Proyecto eliminado correctamente");
      res.redirect("/project");
    }
  });
};
//RECUPERAR DATOS PARA ACTUALIZAR ----------------------
projectController.editProject = async (req, res) => {
  const formdata = await Project.findById(req.params.id);
  res.render("pages/project", { formdata });
};
//ACTUALIZAR--------------------------------------
projectController.updateProject = async (req, res) => {
  console.log(req.body)
  const {
    title,
    description,
    languages,
    website,
    frontend,
    backend,
    priority = parseInt(req.body.priority),
  } = req.body;
  let image = undefined;
  if (req.file) {
    image = req.file.filename;
  }
  const links = [website, frontend];
  if (backend !== "") links.push(backend);
  try {
    if (image) {
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          languages,
          links,
          image,
          priority
        },
        async (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            await fs.unlink(
              path.resolve("src/public/assets/img/imguploads", result.image)
            );
          }
        }
      );
      req.flash("success_msg", "Proyecto actualizado correctamente");
      res.redirect("/project");
    } else {
      await Project.findByIdAndUpdate(req.params.id, {
        title,
        description,
        languages,
        links,
        priority
      });
      req.flash("success_msg", "Proyecto actualizado correctamente");
      res.redirect("/project");
    }
  } catch (err) {
    req.flash("error_msg", "Error al actualizar proyecto");
    res.redirect("/project");
  }
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
