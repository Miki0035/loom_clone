"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload video and thumbnail.");
        return;
      }

      if (!formData.title || !formData.description) {
        setError("Please file in all the details.");
        return;
      }
      // UPLOAD VIDEO TO BUNNY

      // UPLOAD THUMBNAIL TO DB

      // ATTACH THUBMNAIL to VIDEO

      // CREATE VIDEO DB SCHEMA METADATA
    } catch (e) {
      console.log(`Error submitting form: ${e}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
      >
        <FormField
          id="title"
          label="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and conscie video title"
        />
        <FormField
          id="description"
          label="description"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
          placeholder="Describe what this video is about"
        />
        <FileInput
          id="video"
          label="video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail "
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload video"}
        </button>
      </form>
    </div>
  );
};

export default Page;
