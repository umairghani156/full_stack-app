import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks";
import { updateNote } from "@/redux/thunks/note.thunk";

const EditNoteModel = ({
  showEditModal,
  setShowEditModal,
  editNoteData,
}: {
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  editNoteData: {
    id: string;
    title: string;
    description: string;
    password?: string;
  };
}) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(editNoteData.title);
  const [description, setDescription] = useState(editNoteData.description);
  const [password, setPassword] = useState(editNoteData.password || "");

  useEffect(() => {
    // Reset values when modal opens with new note data
    setTitle(editNoteData.title);
    setDescription(editNoteData.description);
    setPassword(editNoteData.password || "");
  }, [editNoteData]);

  const handleUpdate = () => {
    const updatedData = {
      id: editNoteData.id,
      title,
      description,
      password,
    };
    dispatch(updateNote(updatedData));
    setShowEditModal(false);
  };

  return (
    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Make changes to your note here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-right">Password</Label>
            <Input
              type="password"
              id="password"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}
          className="bg-blue-600 cursor-pointer">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteModel;
