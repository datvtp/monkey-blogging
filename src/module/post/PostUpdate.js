import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import { Radio } from "components/radio";
import { Toggle } from "components/toggle";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hook/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { postStatus } from "utils/constants";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const postId = params.get("id");

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [content, setContent] = useState("");

  const imageURL = getValues("image");
  const imageName = getValues("image_name");

  async function deleteImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteImage);

  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  useEffect(() => {
    document.title = "Update post";
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setValue("user", { id: doc.id, ...doc.data() });
      });
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);

  const onDoClickToggle = () => {
    setValue("hot", !watchHot);
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickOption = async (category) => {
    const colRef = doc(db, "categories", category.id);
    const docData = await getDoc(colRef);

    setValue("category", { id: docData.id, ...docData.data() });
    setSelectedCategory(category);
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      let results = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategories(results);
    }

    getData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectedCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data().content);
      }
    }

    fetchData();
  }, [postId, reset]);

  const onDoSubmit = async (values) => {
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);

      const colRef = doc(db, "posts", postId);
      await updateDoc(colRef, {
        ...cloneValues,
        content: content,
      });

      toast.success("Update post successfully!");
    } catch (error) {
      toast.error("Update post successfully!");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);

          const res = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=07fec499b5f9276351aaf7d19a88dbf8",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          return res.data.data.url;
        },
      },
    }),
    []
  );

  if (!postId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form
        onSubmit={handleSubmit(onDoSubmit)}
        autoComplete="off"
        spellCheck="false"
      >
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              progress={progress}
              image={image}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>

          <div className="flex flex-col gap-y-5">
            <Field>
              <Label>Category</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={selectedCategory?.name || "Select category"}
                ></Dropdown.Select>
                <Dropdown.List>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <Dropdown.Option
                        key={category.id}
                        onClick={() => handleClickOption(category)}
                      >
                        {category.name}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </Field>
            <div className="grid grid-cols-3 mb-5 lg:grid-cols-4 lg:gap-x-10">
              <Field>
                <Label>Featured</Label>
                <Toggle
                  on={watchHot === true}
                  onClick={onDoClickToggle}
                ></Toggle>
              </Field>
              <Field className="col-span-3">
                <Label>Status</Label>
                <FieldCheckboxes>
                  <Radio
                    name="status"
                    control={control}
                    checked={Number(watchStatus) === postStatus.APPROVED}
                    onClick={() => setValue("status", "approved")}
                    value={postStatus.APPROVED}
                  >
                    Approved
                  </Radio>
                  <Radio
                    name="status"
                    control={control}
                    checked={Number(watchStatus) === postStatus.PENDING}
                    onClick={() => setValue("status", "pending")}
                    value={postStatus.PENDING}
                  >
                    Pending
                  </Radio>
                  <Radio
                    name="status"
                    control={control}
                    checked={Number(watchStatus) === postStatus.REJECTED}
                    onClick={() => setValue("status", "reject")}
                    value={postStatus.REJECTED}
                  >
                    Reject
                  </Radio>
                </FieldCheckboxes>
              </Field>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>

        <Button
          type="submit"
          className="mx-auto max-w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
