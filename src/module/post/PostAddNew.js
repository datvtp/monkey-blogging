import slugify from "slugify";
import styled from "styled-components";
import React from "react";
import { useForm } from "react-hook-form";
// import { db } from "firebase-app/firebase-config";
// import { addDoc, collection } from "firebase/firestore";

import { Radio } from "components/radio";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { Button } from "components/button";
import { postStatus } from "utils/constants";
import { Dropdown } from "components/dropdown";
import { ImageUpload } from "components/image";
import useFirebaseImage from "hook/useFirebaseImage";

const StyledPostAddNew = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, getValues, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
    },
  });

  const watchStatus = watch("status");
  //const watchCategory = watch("category");

  const onDoSubmit = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);

    // const colRef = collection(db, "posts");
    // await addDoc(colRef, {});
  };

  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  return (
    <StyledPostAddNew>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(onDoSubmit)}>
        <div className="grid grid-cols-2 gap-x-20">
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
              required
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-20 mb-5">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              progress={progress}
              image={image}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>

          <div className="flex flex-col">
            <Field>
              <Label>Category</Label>
              <Dropdown>
                <Dropdown.Option>Knowledge</Dropdown.Option>
                <Dropdown.Option>Blockchain</Dropdown.Option>
                <Dropdown.Option>Setup</Dropdown.Option>
                <Dropdown.Option>Nature</Dropdown.Option>
                <Dropdown.Option>Developer</Dropdown.Option>
              </Dropdown>
            </Field>
            <Field>
              <Label>Status</Label>
              <div className="flex items-center gap-x-5">
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
              </div>
            </Field>
          </div>
        </div>
        <Button type="submit" className="mx-auto max-w-[200px]">
          Add new post
        </Button>
      </form>
    </StyledPostAddNew>
  );
};

export default PostAddNew;
