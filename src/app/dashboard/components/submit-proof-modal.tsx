"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/helpers/firebase";
import { toast } from "sonner";
import { Game } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Loader2, Upload } from "lucide-react";

export const SubmitProofModal = ({ game }: { game: Game }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleFileUploadToFirebase = async (file: File) => {
        if (loading) {
            toast.error("Please wait for the previous upload to complete");
            return;
        }
        setLoading(true);
        console.log(game.id);
        const storageRef = ref(storage, `game-results/${game.id}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                setLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadURL(downloadURL);
                    setLoading(false);
                    toast.success("File uploaded successfully");
                    setOpen(false);
                });
            }
        );
    };

    return (
        <ResponsiveModal open={open} onOpenChange={setOpen}>
            <ResponsiveModalTrigger asChild>
                <Button size={"lg"} className="bg-gradient-to-r from-green-600 to-green-400 hover:from-blue-700 hover:to-blue-700 text-white font-semibold">
                    Submit Result
                </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent className="bg-gradient-to-br from-gray-900 to-black text-white">
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle className="text-2xl font-bold">Submit Result</ResponsiveModalTitle>
                    <ResponsiveModalDescription className="text-gray-300">
                        Please upload the result of the game.
                    </ResponsiveModalDescription>
                </ResponsiveModalHeader>
                <Separator className="my-5 bg-gray-700" />
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">
                            Accepted file types:
                        </p>
                        <p className="text-sm font-semibold text-blue-400">.png, .jpg, .jpeg</p>
                    </div>
                    <div className="relative">
                        <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setUploadFile(e.target.files?.[0]);
                                }
                            }}
                            accept=".png,.jpg,.jpeg"
                            className="h-14 pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 file:border-0 file:bg-transparent file:text-white file:h-full file:cursor-pointer"
                        />
                    </div>
                    {downloadURL && (
                        <div className="flex justify-center items-center">
                            <p className="text-sm text-green-400">File uploaded: {downloadURL}</p>
                        </div>
                    )}
                    {loading && uploadProgress > 0 && (
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    )}
                </div>
                <Separator className="my-5 bg-gray-700" />
                <ResponsiveModalFooter className="flex flex-col gap-3">
                    <Button
                        onClick={() => uploadFile && handleFileUploadToFirebase(uploadFile)}
                        disabled={loading || !uploadFile}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        {loading ? "Uploading..." : "Submit"}
                    </Button>
                    <ResponsiveModalClose asChild>
                        <Button variant={"outline"} className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                            Cancel
                        </Button>
                    </ResponsiveModalClose>
                </ResponsiveModalFooter>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};