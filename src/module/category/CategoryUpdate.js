import slugify from "slugify";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";

import DashboardHeading from "module/dashboard/DashboardHeading";
import { Field, FieldCheckboxes } from "components/field";
import { Label } from "components/label";
import { Radio } from "components/radio";
import { Button } from "components/button";
import { Input } from "components/input";
import { categoryStatus } from "utils/constants";

const CategoryUpdate = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const watchStatus = watch("status");

  const [params] = useSearchParams();
  const categoryId = params.get("id");

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const categoryDoc = await getDoc(colRef);
      reset(categoryDoc.data());
    }

    fetchData();
  }, [categoryId, reset]);

  const handleUpdateCategory = async (values) => {
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });

      toast.success("Update category successfully!");
      navigate("/manage/category");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!categoryId) return null;

  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update category with id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
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
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
