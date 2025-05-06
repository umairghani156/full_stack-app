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
import NoteSocketListener from "@/components/NoteSocketListener";
import NoteHistoryModal from "@/components/NoteHistoryModal";


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
const [ selectedNoteId, setSelectedNoteId] = React.useState("");
  const [ showHistoryModal, setShowHistoryModal] = React.useState(false);

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
      <NoteSocketListener />
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
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-gray-800 truncate">{note.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{note.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mt-4 flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedNoteId(note.id);
                        setShowHistoryModal(true);
                      }}
                      className="text-blue-600 cursor-pointer border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      🕓 View History
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNoteHandler(note.id)}
                        className="hover:bg-red-100 cursor-pointer"
                      >
                        <MdDeleteOutline className="w-5 h-5 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setShowEditModal(true);
                          setEditNoteData(note);
                        }}
                        className="hover:bg-blue-100 cursor-pointer"
                      >
                        <CiEdit size={22} className="text-blue-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
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

      {
        showHistoryModal &&
       <NoteHistoryModal
         showHistoryModal={showHistoryModal}
         setShowHistoryModal={setShowHistoryModal}
         selectedNoteId={selectedNoteId}
         setSelectedNoteId={setSelectedNoteId}
       />
      }

    </>
  );
};

export default Dashboard;
