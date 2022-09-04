import { Button } from "components/button";
import { Field, FieldCheckboxes } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import { Radio } from "components/radio";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hook/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const imageURL = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageURL);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;

    try {
      const colRef = doc(db, "users", userId);

      await updateDoc(colRef, {
        ...values,
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
      });

      navigate("/manage/user");
      toast.success("Update user info successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);

      reset(docData && docData.data());
    }

    fetchData();
  }, [reset, userId]);

  if (!userId) {
    return null;
  }

  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)} autoComplete="off">
        <ImageUpload
          className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto mb-10"
          progress={progress}
          image={image}
          onChange={handleSelectImage}
          handleDeleteImage={handleDeleteImage}
        ></ImageUpload>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mx-auto max-w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
