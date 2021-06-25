const router = require("express").Router();

const TodoModel = require('../models/Todo.model')

/* GET home page */
router.get("/todos", (req, res, next) => {

    TodoModel.find()
      .then((todos) => {
          res.render( 'todos/todo-list.hbs', { todos } ) // ----> render() accepts a path to your views file
      })
      .catch(() => {
            next('Todo fetch failed')
      })
});



/* GET home page */
router.get("/todos/create", (req, res, next) => {
    res.render('todos/todo-create.hbs')
});

//Router post

router.post('/todos/create', (req, res, next) => {
    const {title, description} = req.body

    // Add this to our DB 
    TodoModel.create({title, description})
        .then(() => {
            // send the user to a specific url
            res.redirect('/todos')
        })
        .catch(() => {
            next('Create failed')
        })

})

// Handling GET requests to /todo/SOME_DYNAMIC_ID
router.get('/todo/:id', (req, res, next) => {
  let id = req.params.id
  
  TodoModel.findById(id)
  .then((todo) => {
    res.render('todos/todo-detail.hbs', { todo })
  })
  .catch(() => {
    next('Finding specific todo failed')
  })
})

// Handling POST requests to /todo/SOME_DYNAMIC_ID/delete
router.post('/todo/:id/delete', (req, res, next) => {
    let dynamicTodoId = req.params.id

    //grab the specific todo with that id from the DB
    // then REMOVE the todo with that id from the DB
    // redirect the user to the /todos url when it's done
    TodoModel.findByIdAndDelete( dynamicTodoId )
      .then(() => {
          res.redirect('/todos') // START with a / because we are redirecting the user to a url
      })
      .catch(() => {
          next('Deleting specific todo failed')
      })
})

// --------------------------------------------------------
//            EDIT ROUTES
// --------------------------------------------------------

// Handling GET requests to /todo/SOME_DYNAMIC_ID/edit
router.get('/todo/:id/edit', (req, res, next) => {
    let dynamicTodoId = req.params.id

    // grab all the todo details
    // show it in a new edit form
    TodoModel.findById(dynamicTodoId)
    .then((todo) => {
        // pass the todo values in the edit fo
        res.render('todos/edit-form.hbs', {todo})
    })
    .catch(() => {
        next('Cannot find todo details')
    })
})

// Handling POST requests to /todo/SOME_DYNAMIC_ID/edit
router.post('/todo/:id/edit', (req, res, next) => {
    let dynamicTodoId = req.params.id
    const {title, description} = req.body
  
    TodoModel.findByIdAndUpdate(dynamicTodoId, {title, description})
      .then(() => {
          res.redirect('/todos')
      })
      .catch(() => {
          next('Edit failed')
      })
    
  
  })

module.exports = router;
