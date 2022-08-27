import slugify from "slugify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import DashboardHeading from "module/dashboard/DashboardHeading";
import { Radio } from "components/radio";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field, FieldCheckboxes } from "components/field";
import { db } from "firebase-app/firebase-config";
import { categoryStatus } from "utils/constants";
import { Button } from "components/button";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    //formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewCategory = async (values) => {
    setIsLoading(true);

    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.name || cloneValues.slug, {
      lower: true,
    });
    cloneValues.status = Number(cloneValues.status);

    const colRef = collection(db, "categories");

    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });

      toast.success("Create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
      setIsLoading(false);
    }
  };

  const watchStatus = watch("status");

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="mx-auto max-w-[200px]"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
