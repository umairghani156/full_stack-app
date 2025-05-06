import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { useAppDispatch, useAppSelector } from "@/hooks";
  import type { RootState } from "@/redux";
  import { convertHistory, getNoteHistory } from "@/redux/thunks/note.thunk";
  import { useEffect } from "react";
  import { formatDistanceToNow } from "date-fns";
  import { Button } from "@/components/ui/button";
  import { ScrollArea } from "@/components/ui/scroll-area";
  
  const NoteHistoryModal = ({
    showHistoryModal,
    setShowHistoryModal,
    selectedNoteId,
    setSelectedNoteId
  }: {
    showHistoryModal: boolean;
    setShowHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNoteId: string;
    setSelectedNoteId: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const dispatch = useAppDispatch();
  
    const { selectedNoteHistory } = useAppSelector(
      (state: RootState) => state.notes
    );
  
    useEffect(() => {
      if (selectedNoteId) {
        dispatch(getNoteHistory(selectedNoteId));
      }
    }, [selectedNoteId, showHistoryModal]);
  
    const handleConvert = (data) => {
        console.log(data);
        const newData = {
            id: selectedNoteId,
            versionId: data.id
        };
        dispatch(convertHistory(newData));
    //  dispatch(convertNoteContent({ title, description }));
    };
  
    return (
      <AlertDialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Note Version History</AlertDialogTitle>
            <AlertDialogDescription>
              You can view previous versions of this note and optionally convert their content.
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <ScrollArea className="h-[300px] pr-2">
            <div className="space-y-4 mt-2">
              {selectedNoteHistory.length === 0 ? (
                <p className="text-muted-foreground">No history available.</p>
              ) : (
                selectedNoteHistory.map((version) => (
                  <div
                    key={version.id}
                    className="border p-4 rounded-md shadow-sm hover:shadow transition bg-muted"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{version.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{version.description}</p>
                        <p className="text-xs text-gray-500">
                          Saved {formatDistanceToNow(new Date(version.createdAt))} ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleConvert(version)}
                      >
                        Convert
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
  
          {/* {convertedText && (
            <div className="mt-4 bg-secondary p-4 rounded shadow-inner">
              <h4 className="font-semibold text-base mb-2">Converted Text:</h4>
              <p className="text-sm whitespace-pre-wrap">{convertedText}</p>
            </div>
          )} */}
  
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="cursor-pointer" onClick={() => setSelectedNoteId("")}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default NoteHistoryModal;
  