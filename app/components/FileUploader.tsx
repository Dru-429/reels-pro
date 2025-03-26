"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { on } from "events";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video"
}
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function FileUpload({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) {

    const ikUploadRefTest = useRef(null);
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
    const handleProgress = () => {
        setUploading(true)
        setError(null)
    };

    const handleStartupload = (evt: ProgressEvent ) => {
        console.log("Start", evt);
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
                fileName="test-upload.jpg"
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                validateFile={(file) => file.size < 2000000}
                folder={"/sample-folder"}
                {/* extensions={[
            {
              name: "remove-bg",
              options: {
                add_shadow: true,
              },
            },
          ]} */}
                webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
                overwriteFile={true}
                overwriteAITags={true}
                overwriteTags={true}
                overwriteCustomMetadata={true}
                {/* customMetadata={{
            "brand": "Nike",
            "color": "red",
          }} */}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                transformation={{
                    pre: "l-text,i-Imagekit,fs-50,l-end",
                    post: [
                        {
                            type: "transformation",
                            value: "w-100",
                        },
                    ],
                }}
                style={{ display: 'none' }} // hide the default input and use the custom upload button
                ref={ikUploadRefTest}
            />
            <p>Custom Upload Button</p>
            {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
            <p>Abort upload request</p>
            {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
            {/* ...other SDK components added previously */}
        </div>
    );
}