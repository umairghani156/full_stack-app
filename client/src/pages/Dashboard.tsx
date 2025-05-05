import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getNotes, deleteNote } from "@/redux/thunks/note.thunk"


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);

  React.useEffect(() => {
    const getAllNotes = async () => {
      try {
        dispatch(getNotes());
      } catch (error) {

      }
    };

    getAllNotes();
  }, []);

  const deleteNoteHandler = async (id: string) => {
    console.log("Id", id)
   
    try {
        dispatch(deleteNote(id));
         
    } catch (error) {
     
  }
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {
    notes.notes?.map((note) => (
      <div key={note.id} className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{note.title}</CardTitle>
            <CardDescription>{note.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* You can add note content here */}
          </CardContent>
          <div className="flex justify-end gap-2 px-6 pb-4">
            <Button
              className="bg-transparent shadow-none text-white"
              onClick={() => deleteNoteHandler(note.id)}
            >
              <MdDeleteOutline className="w-6 h-6 text-red-600" />
            </Button>
            <Button className="bg-transparent cursor-pointer shadow-none text-white">
              <CiEdit size={30} className="text-blue-600" />
            </Button>
          </div>
        </Card>
      </div>
    ))
  }
</div>

  )
}

export default Dashboard