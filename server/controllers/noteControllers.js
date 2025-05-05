import prisma from "../DB/db.config.js";

export const createNote = async (req, res) => {
    const { title, description, password } = req.body;
    try {

        const note = await prisma.note.create({
            data: {
                title,
                description,
                password: password || null,
                ownerId: req.user.result.id
            }
        });
        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note could not be created"
            });
        };
        return res.status(200).json({
            success: true,
            message: "Note created successfully",
            note
        });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};
export const getAllNotes = async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            where: {
                ownerId: req.user.result.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!notes) {
            return res.status(400).json({
                success: false,
                message: "Notes not found"
            });
        };
        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            notes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description, password } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Note id is required"
            });
        };

        const note = await prisma.note.findUnique({
            where: {
                id
            }
        });
        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note not found"
            });
        };

        if (note.ownerId !== req.user.result.id) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to update this note"
            });
        };

        const noteVersion = await prisma.noteVersion.create({
            data: {
                title: note.title,
                description: note.description,
                noteId: note.id
            }
        });

        if (!noteVersion) {
            return res.status(400).json({
                success: false,
                message: "Note version could not be created"
            });
        };

        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title,
                description,
                password,
            }
        });
        if (!updatedNote) {
            return res.status(400).json({
                success: false,
                message: "Note could not be updated"
            });
        };
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};


export const deleteNote = async (req, res) => {
    const { id } = req.params;
    console.log("Id",typeof id);
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: id
            }
        });



        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note not found"
            });
        };

       
        if (note.ownerId !== req.user.result.id) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to delete this note"
            });
        };



        await prisma.note.delete({
            where: {
                id,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            id: id
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};