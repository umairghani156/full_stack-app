import prisma from "../DB/db.config.js";
import { GenerateToken } from "../utils/Token.js";
import bcrypt from "bcryptjs";

export const register =async (req, res) => {
   const {name, email, password} = req.body;
   try {
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    if(!user) {
        return res.status(400).json({
            success: false,
            message: "User could not be created"
        });
    };

    const token = GenerateToken({ data: user , expiresIn: "1d"});

    res.status(200).json({
        success: true,
        message: "User created successfully",
        token,
        user
    });

   } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
   }
}

export const login =async (req, res) => {
   const {email, password} = req.body;
   try {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        });
    };

    console.log(user);

    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if(!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Password is incorrect"
        });
    };

    const token = GenerateToken({ data: user , expiresIn: "1d"});
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
   }
};


export const updateProfile = async (req, res) => {
    console.log(req.user);
    const userId = req.user.result.id;
    const { name, email, oldPassword, newPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Incorrect password' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email},
        });

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

};