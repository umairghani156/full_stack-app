import { useAppDispatch } from "@/hooks";
import { getNotes } from "@/redux/thunks/note.thunk";
import socket from "@/services/socket";
import { useEffect } from "react";
import toast from "react-hot-toast";

const NoteSocketListener = () => {
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO");
      });
  
      socket.on("note_created", (data) => {
        console.log("Note Created Event Received:", data);
        toast.success(`A new note was added`);
        dispatch(getNotes());
      });
  
      socket.on("note_updated", (data) => {
        console.log("Note Updated Event Received:", data);
        toast.success("A note was updated");
        dispatch(getNotes());
      });
  
      socket.on("note_deleted", (data) => {
        console.log("Note Deleted Event Received:", data); 
        toast.success("A note was deleted");
        dispatch(getNotes());
      });
  
      return () => {
        socket.off("note_created");
        socket.off("note_updated");
        socket.off("note_deleted");
        socket.off("connect");
      };
    }, [dispatch]);
  
    return null; 
  };
  
  export default NoteSocketListener;  