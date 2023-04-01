const Todo = require('./../models/TodoModel')

const createTodo = async (req, res) => {
    try {
        const {task, description, status} = req.body
        const todo = await Todo.create({
            task,
            description,
            status
        })

        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: `Failed to create task.`})
        console.log(error)
    }
}

module.exports = {
    createTodo
}
