import * as React from "react";
import { IoIosAdd } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getNotes, deleteNote, createNote } from "@/redux/thunks/note.thunk";
import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditNoteModel from "@/components/EditNote";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);
  const [open, setOpen] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editNoteData, setEditNoteData] = React.useState({
    id: "",
    title: "",
    description: "",
  });

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleAddNote = async () => {
    if (!title || !description) return;

    const newNote = {
      title,
      description,
    };
    console.log(newNote);
    dispatch(createNote(newNote));

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const deleteNoteHandler = async (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
          >
            <IoIosAdd size={20} /> Add Note
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.notes?.map((note) => (
            <div key={note.id + note.title} className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{note.title}</CardTitle>
                  <CardDescription>{note.description}</CardDescription>
                </CardHeader>
                <CardContent />
                <div className="flex justify-end gap-2 px-6 pb-4">
                  <Button
                    className="bg-transparent shadow-none hover:bg-red-200 cursor-pointer text-white"
                    onClick={() => deleteNoteHandler(note.id)}
                  >
                    <MdDeleteOutline className="w-6 h-6 text-red-600" />
                  </Button>
                  <Button onClick={() => {
                    setShowEditModal(true);
                    setEditNoteData(note);
                  }} className="bg-transparent hover:bg-blue-200 cursor-pointer shadow-none text-white">
                    <CiEdit size={30} className="text-blue-600" />
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog to Add Note */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Fill in the fields to add a new note</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="p-2 border rounded-md"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Note */}
      {
        showEditModal &&
        <EditNoteModel
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editNoteData={editNoteData}
        />
      }

    </>
  );
};

export default Dashboard;
