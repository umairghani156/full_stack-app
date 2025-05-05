import prisma from "../DB/db.config.js";

export const getNoteVersions = async (req, res) => {
    const { id } = req.params;
    try {
        const versions = await prisma.noteVersion.findMany({
            where: { noteId: id },
            orderBy: { createdAt: 'desc' }, 
        });

        if (!versions.length) {
            return res.status(404).json({ success: false, message: 'No versions found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Version history fetched successfully',
            versions,
        });
    } catch (error) {
        console.error('Error fetching version history:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const revertVersion = async (req, res) =>{
    const { id, versionId } = req.params;
    try {
        const version = await prisma.noteVersion.findUnique({
            where: { id: versionId },
        });

        if (!version) {
            return res.status(404).json({ success: false, message: 'Version not found' });
        }

       
        const revertedNote = await prisma.note.update({
            where: { id },
            data: { 
                title: version.title,
                description: version.description
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Note reverted to previous version successfully',
            note: revertedNote,
        });
    } catch (error) {
        console.error('Error reverting note:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
