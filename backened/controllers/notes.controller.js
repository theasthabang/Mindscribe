import Notes from "../models/notes.model.js"


export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select("topic classLevel examType revisionMode createdAt")
      .sort({ createdAt: -1 })  // newest first

    // Don't 404 on empty — just return []
    return res.status(200).json(notes)

  } catch (error) {
    return res.status(500).json({ message: `getMyNotes error ${error}` })
  }
}

export const getSingleNotes = async (req, res) => {
    try {
        const notes = await Notes.findOne({
            _id: req.params.id,
            user: req.userId
        })
        if (!notes) {
            return res.status(404).json({
                error: "Notes not found"
            });
        }
        return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt
    });
    } catch (error) {
 return res.status(500).json({ message: `getSingle notes error  ${error}` })
    }
}