"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video"
}

export default function FileUpload({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null> (null)

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message)
        setUploading(false)
    };

    const handleSucces = (response : IKUploadResponse) => {
        console.log("Success", response);
        
        setError(null)
        setUploading(false)
        onSuccess(response )
    };
    const handleProgress = (evt: ProgressEvent) => {

        if( evt.lengthComputable && onProgress){
            const progress = (evt.loaded / evt.total) * 100
            onProgress(progress)
        }
    };

    const handleStartupload = ( ) => {
        setUploading(true)
        setError(null)
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {

            if(!file.type.startsWith("video/")){
                setError("Upload a video file only")
                return false
            }

            if(file.size > 100 * 1024 * 1024){  //100 mb
                setError("Video size must less than 100mb")
                return false
            }
        }
        else{
            const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
            if(!validTypes.includes(file.type)){
                setError("Upload a valid file(jpeg, png, gif, webp)")
                return false
            }

            if(file.size > 10 * 1024 * 1024){  //100 mb
                setError("Image size must less than 10mb")
                return false
            }
        }

        return false
    }

    return (
        <div className="App">
            <h1>ImageKit Next.js quick start</h1>
            <p>Upload an image with advanced options</p>
            <IKUpload
                accept={fileType == "video" ? "video/*" : "image/*"}
                fileName={fileType === "image" ? "image" : "video"}
                onError={onError}
                onSuccess={handleSucces}
                onUploadProgress={handleProgress}
                onUploadStart={handleStartupload}
                useUniqueFileName={true}
                validateFile={validateFile}
                folder={fileType === "image" ? "/images" : "/videos"}
                className="file-input file-input-bordered w-full"
            />

            {
                uploading && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>Uploading...</span> 
                    </div>
                )
            }
            {
                error && (
                    <div className="text-error text-sm ">
                        {error}
                    </div>
                )
            }
        </div>
    );
}