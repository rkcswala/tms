
import task from "../models/taskModel.js";

export async function createTask(req, res) {
  try {

    const { title, description, status } = req.body;

    const newTask = new task({
      title: title,
      description: description,
      status: status || "Pending",
    });


    const savedTask = await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });

  } catch (error) {
    console.error("DATABASE ERROR =", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
  


// task get

export async function handelgettask(req, res){
  try{
  const tasks = await task.find();
  res.json(tasks);
  }catch(error){
    res.status(500).json({
      message: "server error",
      success: false
    })
  }
}

// update 

export async function handelupdate(req, res){
  try {
    const {id} = req.params;
    const {title, description, status} = req.body;

    if(!title || !description){
      return res.status(400).json({
        message: "Title and description are required",
        success: false
      })
    }


    const updatetask = await task.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        status: status || "pending"
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    )

    if(!updatetask){
      return res.status(404).json({
        message: "Task not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}


// delete 

export async function handeldelete(req, res){
  try {
    const {id} = req.params;
    const deletetask = await task.findByIdAndDelete(id);
    if(!deletetask){
      return res.status(404).json({
        message: "Task not found",
        success: false
      })
    }

    res.status(200).json({
      message: "Task delete successfully",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}