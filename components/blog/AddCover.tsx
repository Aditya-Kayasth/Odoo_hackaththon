"use client";
import { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { ImageIcon } from "lucide-react";

interface AddCoverImage {
  setUploadedCover: (cover: string) => void;
  replaceURL?: string;
}

const AddCover = ({ setUploadedCover, replaceURL }: AddCoverImage) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [isUploading, setUploading] = useState(false);

  const handelButtonClick = () => imageInputRef.current?.click();

  useEffect(() => {
    let isMounted = true;
    setUploading(true);
    const uploadImage = async() => {
      if (!file) return;

      try {
        const res = await edgestore.publicFiles.upload({file,
          options: replaceURL? {replaceTargetUrl:replaceURL} : undefined
        })

      if (isMounted && res.url){
        setUploadedCover(res.url);
      }
      } catch (error) {
        console.log("Upload Failed: ",error);

        
      }finally{
        if(isMounted){
          setUploading(false);
        }
      }
    }

    uploadImage();

    return () => {
      isMounted = false;
    }

  }, [file])



  console.log("file >>>>>>>>>>>", file);
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imageInputRef}
        className="hidden"
      />
      <button
        type="button"
        onClick={handelButtonClick}
        className="flex items-center gap-2 cursor-pointer"
      >
        <ImageIcon size = {20}/>
        <span>
        {!!replaceURL? "Change cover": "Add cover"}
      </span>
      </button>

    </div>
  );
};

export default AddCover;
