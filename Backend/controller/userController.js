import User from "../models/userModel.js";

export async function handelusersignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const checkExistUser = await User.findOne({ email });

        if (checkExistUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
}


// login controller


export async function handeluserlogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      message: "Login successful"
      
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}



// User get 


export async function handelgetuser(req, res){
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
     res.status(500).json({ message: err.message });
  }
}




