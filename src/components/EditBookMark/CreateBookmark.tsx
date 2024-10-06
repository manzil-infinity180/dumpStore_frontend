import { useState, ChangeEvent } from "react";
import { createBookmark } from "../utils/http";
import { useMutation } from "@tanstack/react-query";

export default function UpdateBookmark() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag1, setTags1] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedTopics, setSelectedTopics] = useState("");
  const [customTopics, setCustomTopics] = useState("");
  const [topics, setTopics] = useState([
    "Volvo (Latin for 'I roll')",
    "Saab (Swedish Aeroplane AB)",
    "Mercedes (Mercedes-Benz)",
    "Audi (Auto Union Deutschland Ingolstadt)",
  ]);
  const { mutate } = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      // toast.success("Registration Successfully");
      // navigate("/verify");
      console.log("Created Yuppp!!!");
    },
  });
  function isValidHttpUrl(string: string) {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ title, link, description, image });
    const formdata = new FormData(e.currentTarget);
    formdata.append("tag", tags.join(","));
    console.log(tags);
    console.log(formdata);
    const data = Object.fromEntries(formdata);

    console.log(JSON.stringify(data));
    mutate(data);
    console.log(import.meta.env.VITE_LOGO_FAVICON_URL);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleTopicsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopics(e.target.value);
  };

  const handleCustomTopicsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomTopics(e.target.value);
  };

  const handleAddCustomTopics = () => {
    if (customTopics && !topics.includes(customTopics)) {
      setTopics([...topics, customTopics]);
      setSelectedTopics(customTopics);
      setCustomTopics("");
    }
  };
  const handleCustomTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      !tags.includes(e.currentTarget.value)
    ) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
      setTags1("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create New Bookmark
        </h2>
        {link && isValidHttpUrl(link) && (
          <div className=" flex items-center justify-center">
            <img
              className="inline-block h-20 w-20 rounded-full ring-2 ring-white "
              src={
                image === null
                  ? import.meta.env.VITE_LOGO_FAVICON_URL.replace(
                      "<DOMAIN>",
                      new URL(link).hostname
                    )
                  : URL.createObjectURL(image)
              }
            />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          onKeyPress={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              required
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Title for your bookmark"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <input
              id="link"
              type="url"
              required
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter the Link"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-800 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              required={tags.length === 0}
              value={tag1}
              onChange={(e) => setTags1(e.target.value)}
              onKeyPress={handleCustomTagChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 mt-2"
              placeholder="Type a custom tag and press Enter"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Topics
            </label>
            <select
              id="tags"
              name="topics"
              value={selectedTopics}
              onChange={handleTopicsChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select a Topic</option>
              {topics.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customTopics}
              onChange={handleCustomTopicsChange}
              className="flex-grow px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Add a New Topics"
            />
            <button
              type="button"
              onClick={handleAddCustomTopics}
              className="px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Add a description"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Bookmark
          </button>
        </form>
      </div>
    </div>
  );
}
