import slugify from "slugify";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import React, { useEffect, useState } from "react";
import useFirebaseImage from "hook/useFirebaseImage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { Radio } from "components/radio";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { Button } from "components/button";
import { Toggle } from "components/toggle";
import { postStatus } from "utils/constants";
import { Dropdown } from "components/dropdown";
import { ImageUpload } from "components/image";
import DashboardHeading from "module/dashboard/DashboardHeading";

const StyledPostAddNew = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useAuth();

  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });

  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const [isLoading, setIsLoading] = useState(false);

  const onDoSubmit = async (values) => {
    try {
      setIsLoading(true);

      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });

      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        hot: false,
        image: "",
      });

      setSelectedCategory({});
      handleResetUpload();

      toast.success("Create new post successfully!");
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Add new post";
  }, []);

  const onDoClickToggle = () => {
    setValue("hot", !watchHot);
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickOption = (category) => {
    setValue("categoryId", category.id);
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

  return (
    <StyledPostAddNew>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
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

        <Button
          type="submit"
          className="mx-auto max-w-[200px]"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Add new post
        </Button>
      </form>
    </StyledPostAddNew>
  );
};

export default PostAddNew;
